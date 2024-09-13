import { createAction, props } from "@ngrx/store";

//test get data user
const GETUSER = '[Data] get user';
const GETUSER_SUCCESS = '[Data] get user success';
const GETUSER_FAILURE = '[Data] get user failure';
//test get data user

export const getUser = createAction(GETUSER);
export const getUser_success = createAction(GETUSER_SUCCESS, props<{dataUser: any}>());
export const getUser_failure = createAction(GETUSER_FAILURE,props<{error: string}>());