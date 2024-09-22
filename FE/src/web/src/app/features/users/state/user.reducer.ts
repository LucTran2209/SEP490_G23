import { createReducer, on } from "@ngrx/store";
import { UserState } from "./user.state";
import * as UserActions from './user.actions';
import { StatusProcess } from "../../../interfaces/anonymous.interface";
const initialState: UserState = {
    dataUser: {},
    message: null,
    status: 'idle'
}

export const usersReducer = createReducer(
    initialState,
    on(UserActions.getUser, (state, action) => ({ ...state, status: 'loading' as StatusProcess })),
    on(UserActions.getUser_success, (state, action) => ({ ...state, dataUser: action.dataUser, status: 'idle' as StatusProcess })),
    on(UserActions.getUser_failure, (state, action) => ({ ...state, message: action.error, status: 'error' as StatusProcess })),

)