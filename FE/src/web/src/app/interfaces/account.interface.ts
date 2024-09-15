import { USER_ROLE } from "../utils/constant";

export interface ILoginRequest {
    email: string;
    password: string;
  }


  export interface IForgotPassword{
    
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