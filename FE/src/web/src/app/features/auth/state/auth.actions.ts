import { createAction, props } from "@ngrx/store";
import { ILoginRequest } from "../../../interfaces/account.interface";

const LOGIN_INIT = "[Auth] login init";
const LOGIN_SUCCESS = "[Auth] login success";
const LOGIN_FAILURE = "[Auth] login failure";
const LOGIN_OTHER_INIT = "[Auth] login other init";
const LOGI_OTHER_SUCCESS = "[Auth] login other success"
const LOGIN_OTHER_FAILURE = "[Auth] login other failure";

const FORGOT_PASSWORD = "[Auth] forgot passwork init";
const FORGOT_PASSWORD_SUCCESS = "[Auth] forgot password success";
const FORGOT_PASSWORD_FAILURE = "[Auth] forgot passwork failure";




export const login = createAction(LOGIN_INIT, props<{ data: ILoginRequest }>())
export const login_success = createAction(LOGIN_SUCCESS, props<{ user: any }>());
export const login_failure = createAction(LOGIN_FAILURE, props<{ error: string }>());

export const forgotPasswrod = createAction(FORGOT_PASSWORD, props<{ email: string }>());
export const forgotPasswrod_success = createAction(FORGOT_PASSWORD_SUCCESS);
export const forgotPasswrod_failure = createAction(FORGOT_PASSWORD_FAILURE, props<{error: string}>())

