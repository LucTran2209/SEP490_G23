export enum STRING {
    ID = 'id',
    ASC = 'ascend',
    DESC = 'descend',
    TIME = 'time',
    DATE = 'date',
    NUMBER = 'number',
    STRING = 'string',
    ACCESS_TOKEN = 'access_token',
    REFRESH_TOKEN = 'refresh_token',
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
    PREFIX = 'prefix',
    SUFFIX = 'suffix',
    TOKEN = 'token',
    FAILED = 'failed',
  }
  
  export enum ErrorMessages {
    INVALID_TOKEN = 'invalid_token',
    TOKEN_EXPIRED = 'token_expired',
    REFRESH_TOKEN_EXPIRED = 'refresh_token_expired'
  }

  export const BASE_AVATAR_IMG = "https://firebasestorage.googleapis.com/v0/b/sm-ngrx-6e4cd.appspot.com/o/ezgif-1-c7078777f5-removebg-preview%201%20(1).png?alt=media&token=aa4b5717-5708-4bc9-8ffc-24d992c47b48";
  


  export enum USER_ROLE {
    ADMIN = 'admin',
    USER = 'user',
  }
  
  export const LocalStorageKey = {
    currentUser: 'current_user',
    breadCrumb: 'bread_crumb',
    prevBreadcrumb: 'prev_bread_crumb',
    otpCode: 'otp_encode_code'
  };
  

  export const REGEX = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^.{8,30}$/,
    phoneNumber: /^[0-9]{1,11}$/,
    onlyOneNumber: /^\d{1}$/
  };

  export const FormatDate =  {
    DDMMYYYY: 'dd/MM/YYYY',
  }