import { IPayLoad } from '../../../interfaces/account.interface';
import { StatusProcess } from '../../../interfaces/anonymous.interface';
import { UserOutputDto, UserResultService } from '../../../interfaces/user.interface';

export interface AdminState {
  status: StatusProcess;
  message: string | null;
  messageCreateUser: string | null;
  errorCreateUser: string | null;
  refreshToken: string | null;
  userList: UserOutputDto[];
  loading: boolean;
  error: string | null;
}