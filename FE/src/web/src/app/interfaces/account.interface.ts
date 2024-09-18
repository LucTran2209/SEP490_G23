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