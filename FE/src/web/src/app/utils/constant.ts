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