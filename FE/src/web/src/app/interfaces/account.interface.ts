import { USER_ROLE } from '../utils/constant';

export interface ILoginRequest {
  username: string;
  password: string;
}
export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}
export interface ResultService {
  statusCode: number;
  message: string;
  datas?: {};
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IExternalLoginRequest {
  credential: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  email: string;
  newPassword: string;
  token: string;
}

export interface IVerifyEmailRequest {
  email: string;
  userName: string;
}


export interface IConfirmEmailRequest {
  email: string;
  userComfirmCode: string;
}

export interface IRegisterTabCommon {
  firstName: string;
  lastName: string;
}
export interface IRegisterTabAuth {
  username: string;
  password: string;
  email: string;
}

export interface IRegisterRequest
  extends IRegisterTabCommon,
    IRegisterTabAuth {}

export interface IPayLoad {
  _id: string;
  Avatar: string;
  Balance: number;
  UserId: string;
  RentalShopId: string;
  FullName: string;
  UserName: string;
  Email: string;
  Role?: string | string[];
  exp: number;
}
