import { createReducer, on } from '@ngrx/store';
import * as RentalActions from './rental.actions';
import { VoucherDetailOutputDto } from '../../../../interfaces/voucher.interface';
import { DISCOUNT_TYPE } from '../../../../utils/constant';

export interface OrderState {
  productId: string | number;
  productName: string;
  rentalPrice: string | number;
  images: string[];
  rentalActualPrice: string | number;
  depositPrice: string | number;
  depositActualPrice: string | number;
  numberOfDays: number;
  quantityRequest: string | number;
  quantityAvailable: string | number;
  isBoundQuantity: boolean;
}
export interface RentalOrderState {
  orders: OrderState[];
  voucherApply: VoucherDetailOutputDto | null;
  discountPriceAfterVoucher: number
}

const initialState: RentalOrderState = {
  orders: [],
  voucherApply: null,
  discountPriceAfterVoucher: 0
};
const checkProductRentalExist = (
  orders: OrderState[],
  pid: string | number
) => {
  const existingOrderIndex = orders.findIndex(
    (order) => order.productId === pid
  );
  return existingOrderIndex;
};

export const rentalOrderReducer = createReducer(
  initialState,

  on(RentalActions.resetRentalProduct, () => initialState),
  //set init product rental order
  on(RentalActions.setInit, (state, action) => {
    const {
      depositPrice,
      pid,
      quantityAvailable,
      rentalPrice,
      productName,
      images,
    } = action;
    const existingOrderIndex = checkProductRentalExist(state.orders, pid);
    if (existingOrderIndex !== -1) {
      const updatedOrder = {
        ...state.orders[existingOrderIndex],
        rentalPrice,
        depositPrice,
        depositActualPrice: depositPrice,
        rentalActualPrice: rentalPrice,
        quantityAvailable,
      };
      const updatedOrders = [
        ...state.orders.slice(0, existingOrderIndex),
        updatedOrder,
        ...state.orders.slice(existingOrderIndex + 1),
      ];
      return { ...state, orders: updatedOrders };
    } else {
      const newOrder: OrderState = {
        productId: pid,
        rentalPrice,
        depositPrice,
        quantityAvailable,
        rentalActualPrice: rentalPrice,
        depositActualPrice: depositPrice,
        numberOfDays: 1,
        quantityRequest: 1,
        isBoundQuantity: true,
        productName: productName,
        images: images,
      };

      return { ...state, orders: [...state.orders, newOrder] };
    }
  }),

  on(RentalActions.setQuantityRequest, (state, action) => {
    const { pid, quantityRequest } = action;
    const existingOrderIndex = checkProductRentalExist(state.orders, pid);
    let order = state.orders[existingOrderIndex];

    if (quantityRequest > Number(order.quantityAvailable)) {
      console.warn(
        `Requested quantity (${quantityRequest}) exceeds available stock (${order.quantityAvailable}) for product ${order.productId}`
      );
      return state;
    }
    const updatedOrder = {
      ...order,
      quantityRequest: quantityRequest,
      depositActualPrice: quantityRequest * Number(order.depositPrice),
      rentalActualPrice: quantityRequest * Number(order.rentalPrice) * order.numberOfDays,
      isBoundQuantity: quantityRequest <= Number(order.quantityAvailable),
    };
    const updatedOrders = [
      ...state.orders.slice(0, existingOrderIndex),
      updatedOrder,
      ...state.orders.slice(existingOrderIndex + 1),
    ];
    return { ...state, orders: updatedOrders };
  }),

  on(RentalActions.setNumberOfDays, (state, action) => {
    const { days, pid } = action;
    const existingOrderIndex = checkProductRentalExist(state.orders, pid);
    let order = state.orders[existingOrderIndex];
    const updatedOrder = {
      ...order,
      numberOfDays: days,
      rentalActualPrice: Number(order.quantityRequest) * Number(order.rentalPrice) * days,
    };
    const updatedOrders = [
      ...state.orders.slice(0, existingOrderIndex),
      updatedOrder,
      ...state.orders.slice(existingOrderIndex + 1),
    ];
    return { ...state, orders: updatedOrders };
  }),

  on(RentalActions.removeOneOrder, (state, action) => {
    const updatedOrders = state.orders.filter(
      (order) => order.productId !== action.pid
    );
    return { ...state, orders: [...updatedOrders] };
  }),
  on(RentalActions.applyVoucher, (state, action) => {
    const { voucher } = action;
    let totalRentalActualPrice = state.orders.reduce((acc,init) => acc + Number(init.rentalActualPrice),0);
   let actualDiscountPrice;
    if(voucher.discountType === DISCOUNT_TYPE.PERCENTAGE){
      const tmpDiscount = (voucher.discountValue / 100) * totalRentalActualPrice;
      actualDiscountPrice = tmpDiscount <= voucher.maximumDiscount ? tmpDiscount : voucher.maximumDiscount;
    }else{
      actualDiscountPrice =  voucher.discountValue;
    }
     
    return { ...state, voucherApply: voucher, discountPriceAfterVoucher: actualDiscountPrice };
  }),
  on(RentalActions.removeVoucher, (state, action) => {
    return { ...state, voucherApply: null, discountPriceAfterVoucher: 0 };
  }),
);
