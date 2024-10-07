import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';
import { StatusProcess } from '../../../interfaces/anonymous.interface';

const initialState: AuthState = {
  dataUser: [],
  isAuthenticated: false,
  message: null,
  errorRegister: null,
  messageRegister: null,
  status: 'idle',
  isRecoveringPassword: false,
  isRecoveredPassword: false,
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
    dataUser: action.user,
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
    dataUser: action.user,
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
  }))
  //----------------------------------logout
);
