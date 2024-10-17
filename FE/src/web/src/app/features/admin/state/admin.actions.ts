import { createAction, props } from "@ngrx/store";
import { UserInputDto } from "../../../interfaces/user.interface";

export const CREATE_USER_INIT = '[User] create user init';
export const CREATE_USER_SUCCESS = '[User] create user success';
export const CREATE_USER_FAILURE = '[User] create user failure';
export const create_user = createAction(CREATE_USER_INIT, props<{ data: UserInputDto }>());
export const create_user_success = createAction(
    CREATE_USER_SUCCESS,
    props<{ message: string }>()
  );
  export const create_user_failure = createAction(
    CREATE_USER_FAILURE,
    props<{ error: string }>()
  );