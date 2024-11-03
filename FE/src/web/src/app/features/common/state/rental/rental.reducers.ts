import { createReducer, on } from '@ngrx/store';
import * as RentalActions from './rental.actions';

export interface OrderState {
  productId: string | number;
  productName: string;
  rentalPrice: string | number;
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
}

const initialState: RentalOrderState = {
  orders: [],
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
    const { depositPrice, pid, quantityAvailable, rentalPrice, productName } =
      action;
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
        isBoundQuantity: false,
        productName: productName,
      };

      return { ...state, orders: [...state.orders, newOrder] };
    }
  }),

  on(RentalActions.setQuantityRequest, (state, action) => {
    const { pid, quantityRequest } = action;
    const existingOrderIndex = checkProductRentalExist(state.orders, pid);
    let order = state.orders[existingOrderIndex];
    const updatedOrder = {
      ...order,
      quantityRequest: quantityRequest,
      depositActualPrice: quantityRequest * Number(order.depositPrice),
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
      rentalActualPrice: days * Number(order.rentalPrice),
    };
    const updatedOrders = [
      ...state.orders.slice(0, existingOrderIndex),
      updatedOrder,
      ...state.orders.slice(existingOrderIndex + 1),
    ];
    return { ...state, orders: updatedOrders };
  }),

  on(RentalActions.checkIsQuantityExceed, (state, action) => {
    const { pid } = action;
    const existingOrderIndex = checkProductRentalExist(state.orders, pid);
    let order = state.orders[existingOrderIndex];
    const updatedOrder = {
      ...order,
      isBoundQuantity: order.quantityRequest <= order.quantityAvailable,
    };
    const updatedOrders = [
      ...state.orders.slice(0, existingOrderIndex),
      updatedOrder,
      ...state.orders.slice(existingOrderIndex + 1),
    ];
    return { ...state, orders: updatedOrders };
  })
);
