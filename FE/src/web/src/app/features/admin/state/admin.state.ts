import { IPayLoad } from '../../../interfaces/account.interface';
import { StatusProcess } from '../../../interfaces/anonymous.interface';
import { ListUserOutputDto, UserResultService } from '../../../interfaces/user.interface';

export interface AdminState {
  status: StatusProcess;
  message: string | null;
  messageCreateUser: string | null;
  errorCreateUser: string | null;
  refreshToken: string | null;
  userList: ListUserOutputDto[];
  loading: boolean;
  error: string | null;
}