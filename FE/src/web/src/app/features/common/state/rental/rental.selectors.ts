import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState, RentalOrderState } from './rental.reducers';
import { feature_key } from '../../../../configs/feature_key.config';

const selectRentalState = createFeatureSelector<RentalOrderState>(
  feature_key['rentalProductFeature']
);

export const selectAllProductRental = createSelector(
  selectRentalState,
  (state: RentalOrderState) => state.orders
);

export const selectProductRentalById = (id: string) =>
  createSelector(selectAllProductRental, (orders: OrderState[]) =>
    orders.find((order) => order.productId === id)
  );

export const selectTotalAllProductRentalPrice = createSelector(
  selectAllProductRental,
  (orders: OrderState[]) =>
    orders.reduce((acc, init) => Number(init.rentalActualPrice) + acc, 0)
);

export const selectTotalAllProductDepositPrice = createSelector(
  selectAllProductRental,
  (orders: OrderState[]) =>
    orders.reduce((acc, init) => Number(init.depositActualPrice) + acc, 0)
);

export const selectDepositPriceById = (id: string) =>
  createSelector(selectProductRentalById(id), (order) => order?.depositPrice);

export const selectRentalActualPriceById = (id: string) =>
  createSelector(
    selectProductRentalById(id),
    (order) => order?.rentalActualPrice
  );

export const selectDepositActualPriceById = (id: string) =>
  createSelector(
    selectProductRentalById(id),
    (order) => order?.depositActualPrice
  );
export const selectIsBoundQuantityById = (id: string) =>
  createSelector(
    selectProductRentalById(id),
    (order) => order?.isBoundQuantity
  );

export const selectNumberOfDaysById = (id: string) =>
  createSelector(selectProductRentalById(id), (order) => order?.numberOfDays);

export const selectQuantityRequestById = (id: string) =>
  createSelector(
    selectProductRentalById(id),
    (order) => order?.quantityRequest
  );

export const selectQuantityAvailableById = (id: string) =>
  createSelector(
    selectProductRentalById(id),
    (order) => order?.quantityAvailable || 0
  );

export const selectIsLimitRentalTime = (dayChoose: number) =>
  createSelector(selectAllProductRental, (al) => {
    let minAvaiableRentalTime = al
      .map((order) => Number(order.rentalLimitDays))
      .filter((days) => !isNaN(days) && days > 0)
      .reduce((min, current) => (current < min ? current : min), Infinity);

      return dayChoose <= minAvaiableRentalTime;
  });

export const selectRentalPriceById = (id: string) =>
  createSelector(selectProductRentalById(id), (order) => order?.rentalPrice);

export const selectVoucherAvaiable = createSelector(
  selectRentalState,
  (state: RentalOrderState) => state.voucherApply
);

export const selectIsFineApplyVoucherAvaiable = (minimumSpend: number) =>
  createSelector(selectAllProductRental, (al) => {
    let totalRentalActualPrice = al.reduce(
      (acc, init) => acc + +init.rentalActualPrice,
      0
    );
    if (totalRentalActualPrice >= minimumSpend) {
      return true;
    }
    return false;
  });

export const selectCalcActualDiscountVoucher = createSelector(
  selectRentalState,
  (state: RentalOrderState) => state.discountPriceAfterVoucher
);

export const selectCalcActualRentalPriceAfterSubtractVouncer = createSelector(
  selectTotalAllProductRentalPrice,
  selectCalcActualDiscountVoucher,
  (totalPrice, discount) => {
    if (!totalPrice || !discount) return totalPrice;
    return totalPrice - discount;
  }
);
