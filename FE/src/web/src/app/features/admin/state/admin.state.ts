import { IPayLoad } from '../../../interfaces/account.interface';
import { StatusProcess } from '../../../interfaces/anonymous.interface';

export interface UserState {
  status: StatusProcess;
  message: string | null;
  messageCreateUser: string | null;
  errorCreateUser: string | null;
  refreshToken: string | null;
}