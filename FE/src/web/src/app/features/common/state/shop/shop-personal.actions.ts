import { createAction, props } from '@ngrx/store';
import { ProductOutputDto } from '../../../../interfaces/product.interface';

export const INIT_GET_LIST_PRODUCT_RENTAL = '[Shop rental product] get init';
export const GET_LIST_PRODUCT_RENTAL_SUCCESS =
  '[Shop rental product] get product rentalShop success';
export const GET_LIST_PRODUCT_RENTAL_FAILURE =
  '[Shop rental product] get product rentalShop failure';
export const UPDATE_FILTER_PARAM = '[Shop rental product] Update Filter';

export const getListProductRentalShop = createAction(
  INIT_GET_LIST_PRODUCT_RENTAL,
  props<{ shopId: string }>()
);
export const getListProductRentalShop_success = createAction(
  GET_LIST_PRODUCT_RENTAL_SUCCESS,
  props<{
    productData: ProductOutputDto[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
  }>()
);
export const getListProductRentalShop_failure = createAction(
  GET_LIST_PRODUCT_RENTAL_FAILURE,
  props<{ message: string; statusCode: number  }>()
);
