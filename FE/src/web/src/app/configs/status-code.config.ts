export enum NormalStatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
  
  }

  export enum ErrorStatusCode {
    UNKNOWN_ERROR = 0,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
  }

  export const HttpStatusCode = {
    ...NormalStatusCode,
    ...ErrorStatusCode,
  } as const;
  

  export type HttpStatusCode = NormalStatusCode | ErrorStatusCode;
  