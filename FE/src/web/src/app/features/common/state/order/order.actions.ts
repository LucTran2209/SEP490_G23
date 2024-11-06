import { createAction, props } from '@ngrx/store';
import { ProductRentalOrderProcess } from '../../../../interfaces/product.interface';

export const CREATE_ORDER_PRODUCT_RENTAL_INIT =
  '[order process create] start create order';
export const CREATE_ORDER_PRODUCT_RENTAL_SUCCESS =
  '[order process create] create order success';
export const CREATE_ORDER_PRODUCT_RENTAL_FAILURE =
  '[order process create] create order failure';
export const RESET_ORDER_PRODUCT_RENTAL =
  '[Order process reset] Reset Order State';
export const resetOrderState = createAction(RESET_ORDER_PRODUCT_RENTAL);
export const createOrder = createAction(
  CREATE_ORDER_PRODUCT_RENTAL_INIT,
  props<{ formData: any }>()
);
export const createOrder_success = createAction(
  CREATE_ORDER_PRODUCT_RENTAL_SUCCESS,
  props<{ message: string }>()
);
export const createOrder_failure = createAction(
  CREATE_ORDER_PRODUCT_RENTAL_FAILURE,
  props<{ message: string }>()
);
