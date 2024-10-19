import { createAction, props } from "@ngrx/store";
import { UserOutputDto, UserInputDto, UserResultService } from "../../../interfaces/user.interface";

export const LOAD_USERS_INIT = '[User] load users init';
export const LOAD_USERS_SUCCESS = '[User] load users success';
export const LOAD_USERS_FAILURE = '[User] load users failure';

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
export const load_users = createAction(LOAD_USERS_INIT, props<{ pageIndex: number, pageSize: number }>()); // Dữ liệu cần truyền vào (pagination)
export const load_users_success = createAction(
  LOAD_USERS_SUCCESS,
  props<{userList: UserOutputDto[] }>()  // Trả về danh sách người dùng
);
export const load_users_failure = createAction(
  LOAD_USERS_FAILURE,
  props<{ error: string }>()
);

