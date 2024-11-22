import { createAction, props } from "@ngrx/store";

export const GETALLCARDOVERVIEW = '[Dashboard overview] get all card overview';
export const GETALLCARDOVERVIEW_SUCCESS = '[Dashboard overview] get all card overview success';
export const GETALLCARDOVERVIEW_FAILURE = '[Dashboard overview] get all card overview failure';
export const GETALLCARDOVERVIEW_RESETSTATE = '[Dashboard overview] get all card overview reset state'
export const getAllCardOverview = createAction(GETALLCARDOVERVIEW, props<{bodyReq: any}>());
export const getAllCardOverview_success = createAction(GETALLCARDOVERVIEW_SUCCESS, props<{dataRes: any, message: string}>());
export const getAllCardOverview_failure = createAction(GETALLCARDOVERVIEW_FAILURE, props<{message: string}>());
export const getAllCardOverview_resetState = createAction(GETALLCARDOVERVIEW_RESETSTATE);