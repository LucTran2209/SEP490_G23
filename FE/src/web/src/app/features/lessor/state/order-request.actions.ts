import { createAction, props } from "@ngrx/store";

export const requestOrderInit = createAction('[Lessor request order] init', props<{formData: FormData, pid: string}>());
export const requestOrder_sucess = createAction('[Lessor request order] success', props<{pid: string}>());
export const requestOrder_failure = createAction('[Lessor request order] failure');
export const requestOrder_resetState = createAction('[Lessor request order] resetrtyrty555 state');

