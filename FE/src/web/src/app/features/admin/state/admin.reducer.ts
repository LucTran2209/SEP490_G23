import { createReducer, on } from '@ngrx/store';
import { StatusProcess } from '../../../interfaces/anonymous.interface';
import * as AdminActions from './admin.actions';
import { UserState } from './admin.state';

const initialState: UserState = {
    refreshToken: null,
    message: null,
    errorCreateUser: null,
    messageCreateUser: null,
    status: 'idle',
};
  export const adminReducer = createReducer(
    initialState,
    // create user
    on(AdminActions.create_user, (state, action) => ({
        ...state,
        status: 'loading' as StatusProcess,
      })),
      on(AdminActions.create_user_success, (state, action) => ({
        ...state,
        messageRegister: action.message,
        status: 'loaded' as StatusProcess,
      })),
      on(AdminActions.create_user_failure, (state, action) => ({
        ...state,
        errorRegister: action.error,
        status: 'error' as StatusProcess,
      })),
  );