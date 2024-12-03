import { createAction, props } from '@ngrx/store';
import { OrderListResponse } from '../../../../interfaces/order.interface';
export const GETORDERDETAILLESSROR = '[Order detail lessor] init';
export const GETORDERDETAILLESSROR_SUCCESS = '[Order detail lessor] success';
export const GETORDERDETAILLESSROR_FAILURE = '[Order detail lessor] failure';
export const RESET_STATE = '[order detail lessor] restỷtyret state'
export const getOrderDetail = createAction(
  GETORDERDETAILLESSROR,
  props<{ pid: string }>()
);
export const getOrderDetail_success = createAction(
  GETORDERDETAILLESSROR_SUCCESS,
  props<{ data: OrderListResponse; message: string }>()
);
export const getOrderDetail_failure = createAction(
  GETORDERDETAILLESSROR_FAILURE,
  props<{ errMessage: string }>()
);
export const resetStateOrderDetail = createAction(RESET_STATE)
