import { createAction, props } from "@ngrx/store";
import { IExternalLoginRequest, IForgotPassword, IForgotPasswordResponse, ILoginRequest } from "../../../interfaces/account.interface";

export const LOGIN_INIT = "[Auth] login init";
export const LOGIN_SUCCESS = "[Auth] login success";
export const LOGIN_FAILURE = "[Auth] login failure";
export const LOGIN_EXTERNAL_INIT = "[Auth] login EXTERNAL init";
export const LOGI_EXTERNAL_SUCCESS = "[Auth] login EXTERNAL success"
export const LOGIN_EXTERNAL_FAILURE = "[Auth] login EXTERNAL failure";

export const FORGOT_PASSWORD = "[Auth] forgot passwork init";
export const FORGOT_PASSWORD_SUCCESS = "[Auth] forgot password success";
export const FORGOT_PASSWORD_FAILURE = "[Auth] forgot passwork failure";

export const CHECK_OTPCODE_SEND_TO_EMAIL = "[Auth] check optcode init";
export const CHECK_OTPCODE_SEND_TO_EMAIL_SUCCESS = "[Auth] check optcode success";
export const CHECK_OTPCODE_SEND_TO_EMAIL_FAILURE = "[Auth] check optcode failure";


export const login = createAction(LOGIN_INIT, props<{ data: ILoginRequest }>())
export const login_success = createAction(LOGIN_SUCCESS, props<{ user: any }>());
export const login_failure = createAction(LOGIN_FAILURE, props<{ error: string }>());

export const login_external = createAction(LOGIN_EXTERNAL_INIT, props<{data: IExternalLoginRequest}>());
export const login_external_success = createAction(LOGI_EXTERNAL_SUCCESS, props<{user: any}>());
export const login_external_failure = createAction(LOGIN_EXTERNAL_FAILURE, props<{error: string}>());

export const forgotPasswrod = createAction(FORGOT_PASSWORD, props<{ data: IForgotPassword}>());
export const forgotPasswrod_success = createAction(FORGOT_PASSWORD_SUCCESS, props<{forgotData: IForgotPasswordResponse}>());
export const forgotPasswrod_failure = createAction(FORGOT_PASSWORD_FAILURE, props<{error: string}>())

export const checkOtpCode = createAction(CHECK_OTPCODE_SEND_TO_EMAIL, props<{otpCode: string}>());
export const checkOtpCode_success = createAction(CHECK_OTPCODE_SEND_TO_EMAIL_SUCCESS);
export const checkOtpCode_failure = createAction(CHECK_OTPCODE_SEND_TO_EMAIL_FAILURE, props<{error: string}>());
