export interface ILoginRequest {
    username: string;
    password: string;
}
export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}