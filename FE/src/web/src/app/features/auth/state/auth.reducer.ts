import { createReducer, on } from "@ngrx/store";
import { AuthState } from "./auth.state";
import * as AuthActions from "./auth.actions";
import { StatusProcess } from "../../../interfaces/anonymous.interface";


const initialState: AuthState = {
    dataUser: [],
    isAuthenticated: false,
    message: null,
    status: 'idle',
    isRecoveringPassword: false,
    isRecoveredPassword: false
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state, action) => ({ ...state, status: 'loading' as StatusProcess })),
    on(AuthActions.login_success, (state, action) => ({ ...state, status: 'loaded' as StatusProcess, dataUser: action.user, isAuthenticated: true, message: 'ok' })),
    on(AuthActions.login_failure, (state, action) => ({ ...state, status: 'error' as StatusProcess, message: action.error })),
    on(AuthActions.login_external, (state, action) => ({ ...state, status: 'loading' as StatusProcess })),
    on(AuthActions.login_external_success, (state, action) => ({ ...state, status: 'loaded' as StatusProcess, dataUser: action.user, isAuthenticated: true, message: 'ok' })),
    on(AuthActions.login_external_failure, (state, action) => ({ ...state, status: 'error' as StatusProcess, message: action.error })),
    on(AuthActions.forgotPasswrod, (state, action) => ({ ...state, status: 'loading' as StatusProcess })),
    on(AuthActions.forgotPasswrod_success, (state, action) => ({ ...state, status: 'loaded' as StatusProcess, message: 'ok email is isExist' })),
    on(AuthActions.forgotPasswrod_failure, (state, action) => ({ ...state, status: 'error' as StatusProcess, message: action.error })),
    on(AuthActions.checkOtpCode, (state, action) => ({ ...state, status: 'loading' as StatusProcess })),
    on(AuthActions.checkOtpCode, (state, action) => ({ ...state, isRecoveringPassword: true, status: 'loaded' as StatusProcess })),
    on(AuthActions.checkOtpCode, (state, action) => ({ ...state, isRecoveredPassword: true, isRecoveringPassword: false, status: 'error' as StatusProcess })),

)