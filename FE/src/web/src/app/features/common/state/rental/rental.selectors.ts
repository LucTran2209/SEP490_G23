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
    (order) => order?.quantityAvailable
  );

export const selectRentalPriceById = (id: string) =>
  createSelector(selectProductRentalById(id), (order) => order?.rentalPrice);
