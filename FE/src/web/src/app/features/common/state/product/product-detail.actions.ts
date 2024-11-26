import { createAction, props } from '@ngrx/store';
import { ProductItemResponse } from '../../../../interfaces/product.interface';

export const INIT_GET_DETAIL_PRODUCT_RENTAL =
  '[rental product detail] get init';
export const GET_DETAIL_PRODUCT_RENTAL_SUCCESS =
  '[rental product detail] get detail product rentalShop success';
export const GET_DETAIL_PRODUCT_RENTAL_FAILURE =
  '[rental product detail] get detail product rentalShop failure';
export const RESET_PRODUCT_RENTAL =
  '[rental product detail reset state] nothing';
export const getDetailProductRental = createAction(
  INIT_GET_DETAIL_PRODUCT_RENTAL,
  props<{ productId: string }>()
);
export const getDetailProductRental_success = createAction(
  GET_DETAIL_PRODUCT_RENTAL_SUCCESS,
  props<{ data: ProductItemResponse }>()
);
export const getDetailProductRental_failure = createAction(
  GET_DETAIL_PRODUCT_RENTAL_FAILURE,
  props<{ message: string; statusCode: number }>()
);
export const resetProductRental = createAction(RESET_PRODUCT_RENTAL);
