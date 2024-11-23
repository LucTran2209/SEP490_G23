import { createAction, props } from "@ngrx/store";

export const GETDATACHARTREVENUE = '[Dashboard overview] get data chart revenue';
export const GETDATACHARTREVENUE_SUCCESS = '[Dashboard overview] get data chart revenue success';
export const GETDATACHARTREVENUE_FAILURE = '[Dashboard overview] get data chart revenue failure';
export const GETDATACHARTREVENUE_RESETSTATE = '[Dashboard overview] get data chart revenue reset state'
export const getDATACHARTREVENUE = createAction(GETDATACHARTREVENUE, props<{bodyReq: any, typeOption: 'w' | 'm'}>());
export const getDATACHARTREVENUE_success = createAction(GETDATACHARTREVENUE_SUCCESS, props<{dataRes: any, message: string}>());
export const getDATACHARTREVENUE_failure = createAction(GETDATACHARTREVENUE_FAILURE, props<{message: string}>());
export const getDATACHARTREVENUE_resetState = createAction(GETDATACHARTREVENUE_RESETSTATE);