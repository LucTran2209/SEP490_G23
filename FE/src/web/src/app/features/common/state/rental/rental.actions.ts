import { createAction, props } from '@ngrx/store';

export const setInit = createAction(
  '[Rental] Set init Rental price product',
  props<{
    rentalPrice: string | number;
    depositPrice: string | number;
    quantityAvailable: string | number;
    pid: number | string;
    productName: string;
    images: string[];
  }>()
);

export const setQuantityRequest = createAction(
  '[Rental] Set quantity Rental Request',
  props<{ quantityRequest: number; pid: string | number }>()
);

export const setNumberOfDays = createAction(
  '[Rental] Set Number of Days',
  props<{ days: number; pid: string | number }>()
);

export const checkIsQuantityExceed = createAction(
  `[Rental] Set check quantity have exceed the limit?`,
  props<{ pid: string | number; quantityRequest: string | number }>()
);

export const removeOneOrder = createAction(
  '[Rental] Remove one order',
  props<{ pid: string | number }>()
);

export const resetRentalProduct = createAction('[Rental] reset rental product');
