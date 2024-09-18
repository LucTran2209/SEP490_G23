import { USER_ROLE } from "../utils/constant";

export interface ILoginRequest {
    username: string;
    password: string;
  }


  export interface ILoginResponse {
    accessToken: string
  }

  export interface IExternalLoginRequest{
    credential: string
}


  export interface IForgotPassword{
    email: string
  }

  export interface IForgotPasswordResponse {
    optcode: string
  }

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