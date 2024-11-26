import { createReducer, on } from '@ngrx/store';
import { StatusProcess } from '../../../interfaces/anonymous.interface';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.state';
import { HttpStatusCode } from '../../../configs/status-code.config';

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  message: null,
  errorRegister: null,
  messageRegister: null,
  status: 'idle',
  isRecoveringPassword: false,
  isRecoveredPassword: false,
  isHasConditionRegister: false,
  statusCode: HttpStatusCode.UNKNOWN_ERROR
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(AuthActions.login_success, (state, action) => ({
    ...state,
    status: 'loaded' as StatusProcess,
    accessToken: action.accessToken,
    refreshToken: action.refreshToken,
    isAuthenticated: true,
    message: 'ok',
  })),
  on(AuthActions.login_failure, (state, action) => ({
    ...state,
    status: 'error' as StatusProcess,
    message: action.error,
  })),
  //----------------------------------login
  on(AuthActions.login_external, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(AuthActions.login_external_success, (state, action) => ({
    ...state,
    status: 'loaded' as StatusProcess,
    accessToken: action.accessToken,
    isAuthenticated: true,
    message: 'ok',
  })),
  on(AuthActions.login_external_failure, (state, action) => ({
    ...state,
    status: 'error' as StatusProcess,
    message: action.error,
  })),
  //----------------------------------login_external
  on(AuthActions.forgotPassword, (state) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(AuthActions.forgotPassword_success, (state) => ({
    ...state,
    status: 'loaded' as StatusProcess,
    isRecoveringPassword: true,
    message: 'ok email is isExist',
  })),
  on(AuthActions.forgotPassword_failure, (state, action) => ({
    ...state,
    status: 'error' as StatusProcess,
    message: action.error,
  })),
  //----------------------------------forgot
  on(AuthActions.resetPassword, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(AuthActions.resetPassword_success, (state, action) => ({
    ...state,
    status: 'loaded' as StatusProcess,
    isRecoveringPassword: false,
    isRecoveredPassword: true,
  })),
  on(AuthActions.resetPassword_failure, (state, action) => ({
    ...state,
    status: 'error' as StatusProcess,
    message: action.error,
  })),
  //----------------------------------reset
  on(AuthActions.checkOtpCode, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(AuthActions.checkOtpCode_success, (state, action) => ({
    ...state,
    isRecoveringPassword: true,
    status: 'loaded' as StatusProcess,
  })),
  on(AuthActions.checkOtpCode_failure, (state, action) => ({
    ...state,
    status: 'error' as StatusProcess,
  })),
  //----------------------------------checkOtpCode
  on(AuthActions.register, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(AuthActions.register_success, (state, action) => ({
    ...state,
    messageRegister: action.message,
    status: 'loaded' as StatusProcess,
  })),
  on(AuthActions.register_failure, (state, action) => ({
    ...state,
    errorRegister: action.error,
    status: 'error' as StatusProcess,
  })),
  //----------------------------------register
  on(AuthActions.logout, (state, action) => ({
    ...initialState,
  })),
  //----------------------------------logout
  on(AuthActions.verifyEmail, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(AuthActions.verifyEmail_success, (state, action) => ({
    ...initialState,
    message: 'Mã xác minh đã được gửi đến hộp thư đến của bạn',
    status: 'loaded' as StatusProcess,
    statusCode: action.statusCode as HttpStatusCode
  })),
  on(AuthActions.verifyEmail_failure, (state, { error }) => ({
    ...initialState,
    message:  (error instanceof Array) ? 'arr error message': error,
    status: 'loading' as StatusProcess,
  })),
  //----------------------------------verify email
  on(AuthActions.confirmVerifyEmail, (state, action) => ({
    ...state,
    status: 'loading' as StatusProcess,
  })),
  on(AuthActions.confirmVerifyEmail_success, (state, action) => ({
    ...state,
    isHasConditionRegister: true,
    message: 'Email hợp lệ, tiếp tục đăng ký nào',
    status: 'loaded' as StatusProcess,
    statusCode: action.statusCode as HttpStatusCode
  })),
  on(AuthActions.confirmVerifyEmail_failure, (state, { error }) => ({
    ...initialState,
    message: error,
    status: 'loading' as StatusProcess,
  })),
  //----------------------------------confirm verify email
on(AuthActions.reset_state, () => ({...initialState}))
  //----------------------------------reset state and reson something
);
