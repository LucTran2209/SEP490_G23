import { createAction, props } from '@ngrx/store';
import {
  IConfirmEmailRequest,
  IExternalLoginRequest,
  IForgotPassword,
  ILoginRequest,
  IRegisterRequest,
  IResetPassword,
} from '../../../interfaces/account.interface';
import { HttpStatusCode } from '../../../configs/status-code.config';

export const LOGIN_INIT = '[Auth] login init';
export const LOGIN_SUCCESS = '[Auth] login success';
export const LOGIN_FAILURE = '[Auth] login failure';
export const LOGIN_EXTERNAL_INIT = '[Auth] login EXTERNAL init';
export const LOGI_EXTERNAL_SUCCESS = '[Auth] login EXTERNAL success';
export const LOGIN_EXTERNAL_FAILURE = '[Auth] login EXTERNAL failure';

export const FORGOT_PASSWORD = '[Auth] forgot passwork init';
export const FORGOT_PASSWORD_SUCCESS = '[Auth] forgot password success';
export const FORGOT_PASSWORD_FAILURE = '[Auth] forgot passwork failure';

export const RESET_PASSWORD = '[Auth] reset passwork init';
export const RESET_PASSWORD_SUCCESS = '[Auth] reset password success';
export const RESET_PASSWORD_FAILURE = '[Auth] reset passwork failure';

export const CHECK_OTPCODE_SEND_TO_EMAIL = '[Auth] check optcode init';
export const CHECK_OTPCODE_SEND_TO_EMAIL_SUCCESS =
  '[Auth] check optcode success';
export const CHECK_OTPCODE_SEND_TO_EMAIL_FAILURE =
  '[Auth] check optcode failure';

export const REGISTER_INIT = '[Auth] register init';
export const REGISTER_SUCCESS = '[Auth] register success';
export const REGISTER_FAILURE = '[Auth] register failure';
export const LOGOUT = '[Auth] logout';
export const TOKEN_EXPIRED = '[Auth] token expired';
export const VERIFY_EMAIL = '[Auth] verify email';
export const VERIFY_EMAIL_SUCCESS = '[Auth] verify email success';
export const VERIFY_EMAIL_FAILURE = '[Auth] verify email failure';
export const CONFIRM_VERIFY_EMAIL = '[Auth] confirm verify email';
export const CONFIRM_VERIFY_EMAIL_SUCCESS =
  '[Auth] confirm verify email success';
export const CONFIRM_VERIFY_EMAIL_FAILURE =
  '[Auth] confirm verify email failure';
export const RESET_STATE = '[reset state] all state';

export const login = createAction(LOGIN_INIT, props<{ data: ILoginRequest }>());
export const login_success = createAction(
  LOGIN_SUCCESS,
  props<{ accessToken: string; refreshToken: string }>()
);
export const login_failure = createAction(
  LOGIN_FAILURE,
  props<{ error: string; statusCode: number }>()
);

export const login_external = createAction(
  LOGIN_EXTERNAL_INIT,
  props<{ data: IExternalLoginRequest }>()
);
export const login_external_success = createAction(
  LOGI_EXTERNAL_SUCCESS,
  props<{ accessToken: string; refreshToken: string }>()
);
export const login_external_failure = createAction(
  LOGIN_EXTERNAL_FAILURE,
  props<{ error: string }>()
);

export const forgotPassword = createAction(
  FORGOT_PASSWORD,
  props<{ data: IForgotPassword }>()
);
export const forgotPassword_success = createAction(
  FORGOT_PASSWORD_SUCCESS,
  props<{ email: string }>()
);
export const forgotPassword_failure = createAction(
  FORGOT_PASSWORD_FAILURE,
  props<{ error: string, statusCode: number }>()
);

export const resetPassword = createAction(
  RESET_PASSWORD,
  props<{ data: IResetPassword }>()
);
export const resetPassword_success = createAction(RESET_PASSWORD_SUCCESS);
export const resetPassword_failure = createAction(
  RESET_PASSWORD_FAILURE,
  props<{ error: string; statusCode: number }>()
);

export const checkOtpCode = createAction(
  CHECK_OTPCODE_SEND_TO_EMAIL,
  props<{ otpCode: string }>()
);
export const checkOtpCode_success = createAction(
  CHECK_OTPCODE_SEND_TO_EMAIL_SUCCESS
);
export const checkOtpCode_failure = createAction(
  CHECK_OTPCODE_SEND_TO_EMAIL_FAILURE,
  props<{ error: string }>()
);

export const register = createAction(
  REGISTER_INIT,
  props<{ data: IRegisterRequest }>()
);
export const register_success = createAction(
  REGISTER_SUCCESS,
  props<{ message: string }>()
);
export const register_failure = createAction(
  REGISTER_FAILURE,
  props<{ error: string }>()
);
export const logout = createAction(LOGOUT);

export const tokenExpire = createAction(
  TOKEN_EXPIRED,
  props<{ message: string }>()
);

export const verifyEmail = createAction(
  VERIFY_EMAIL,
  props<{ email: string, username: string }>()
);

export const verifyEmail_success = createAction(
  VERIFY_EMAIL_SUCCESS,
  props<{ statusCode: string | number }>()
);

export const verifyEmail_failure = createAction(
  VERIFY_EMAIL_FAILURE,
  props<{ error: string | string[] }>()
);
export const confirmVerifyEmail = createAction(
  CONFIRM_VERIFY_EMAIL,
  props<{ data: IConfirmEmailRequest, dataRegister: IRegisterRequest }>()
);

export const confirmVerifyEmail_success = createAction(
  CONFIRM_VERIFY_EMAIL_SUCCESS,  props<{ statusCode: string | number }>()
);

export const confirmVerifyEmail_failure = createAction(
  CONFIRM_VERIFY_EMAIL_FAILURE,
  props<{ error: string }>()
);

export const reset_state = createAction(RESET_STATE);
