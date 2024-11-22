import { createAction, props } from "@ngrx/store";

export const GETDATACHARTORDER = '[Dashboard overview] get data chart order';
export const GETDATACHARTORDER_SUCCESS = '[Dashboard overview] get data chart order success';
export const GETDATACHARTORDER_FAILURE = '[Dashboard overview] get data chart order failure';
export const GETDATACHARTORDER_RESETSTATE = '[Dashboard overview] get data chart order reset state'
export const getDATACHARTORDER = createAction(GETDATACHARTORDER, props<{bodyReq: any}>());
export const getDATACHARTORDER_success = createAction(GETDATACHARTORDER_SUCCESS, props<{dataRes: any, message: string}>());
export const getDATACHARTORDER_failure = createAction(GETDATACHARTORDER_FAILURE, props<{message: string}>());
export const getDATACHARTORDER_resetState = createAction(GETDATACHARTORDER_RESETSTATE);