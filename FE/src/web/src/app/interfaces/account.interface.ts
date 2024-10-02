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
}

export interface IExternalLoginRequest {
  credential: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IOtpCodeResponse {
  optcode: string;
}

export interface IRegisterTabCommon {
  fullname: string;
  phonenumber?: string;
  address?: string;
  gender: boolean;
  dateofbirth: Date;
  introduction?: string;
}
export interface IRegisterTabAuth {
  username: string;
  password: string;
  email: string;
}

export interface IRegisterRequest
  extends IRegisterTabCommon,
    IRegisterTabAuth {}

export interface IAccount {
  _id: string;
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  role: USER_ROLE;
  isActive?: boolean;
  slug?: string;
  avatar?: string;
}
