import { createAction, props } from "@ngrx/store";

export const GETDATACHARTSUBCATEGORY = '[Dashboard overview] get data chart top sub-category';
export const GETDATACHARTSUBCATEGORY_SUCCESS = '[Dashboard overview] get data chart top sub-category success';
export const GETDATACHARTSUBCATEGORY_FAILURE = '[Dashboard overview] get data chart top sub-category failure';
export const GETDATACHARTSUBCATEGORY_RESETSTATE = '[Dashboard overview] get data chart top sub-category reset state'
export const getDATACHARTSUBCATEGORY = createAction(GETDATACHARTSUBCATEGORY, props<{bodyReq: any}>());
export const getDATACHARTSUBCATEGORY_success = createAction(GETDATACHARTSUBCATEGORY_SUCCESS, props<{dataRes: any, message: string}>());
export const getDATACHARTSUBCATEGORY_failure = createAction(GETDATACHARTSUBCATEGORY_FAILURE, props<{message: string}>());
export const getDATACHARTSUBCATEGORY_resetState = createAction(GETDATACHARTSUBCATEGORY_RESETSTATE);