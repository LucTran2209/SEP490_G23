import { createReducer, on } from '@ngrx/store';
import { StatusProcess } from '../../../interfaces/anonymous.interface';
import * as AdminActions from './admin.actions';
import { AdminState } from './admin.state';

const initialState: AdminState = {
    refreshToken: null,
    message: null,
    errorCreateUser: null,
    messageCreateUser: null,
    status: 'idle',
    userList: [],
    loading: false,
    error: null,
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

      //load users
      on(AdminActions.load_users, (state) => ({
        ...state,
        loading: true,
      })),
      on(AdminActions.load_users_success, (state, { userList }) => ({
        ...state,
        userList: userList,
        loading: false,
      })),
      on(AdminActions.load_users_failure, (state, { error }) => ({
        ...state,
        loading: false,
      })),
  );