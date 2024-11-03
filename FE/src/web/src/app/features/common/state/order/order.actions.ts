import { createAction, props } from '@ngrx/store';
import { ProductRentalOrderProcess } from '../../../../interfaces/product.interface';

export const CREATE_ORDER_PRODUCT_RENTAL_INIT =
  '[order process create] start create order';
export const CREATE_ORDER_PRODUCT_RENTAL_SUCCESS =
  '[order process create] create order success';
export const CREATE_ORDER_PRODUCT_RENTAL_FAILURE =
  '[order process create] create order failure';

export const createOrder = createAction(CREATE_ORDER_PRODUCT_RENTAL_INIT);
export const createOrder_success = createAction(
  CREATE_ORDER_PRODUCT_RENTAL_SUCCESS
);
export const createOrder_failure = createAction(
  CREATE_ORDER_PRODUCT_RENTAL_FAILURE,
  props<{ message: string }>()
);
