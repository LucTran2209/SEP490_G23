import { HttpStatusCode } from '../../../configs/status-code.config';
import { IPayLoad } from '../../../interfaces/account.interface';
import { StatusProcess } from '../../../interfaces/anonymous.interface';

export interface AuthState {
  status: StatusProcess;
  message: string | null;
  messageRegister: string | null;
  errorRegister: string | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  isRecoveringPassword: boolean;
  isRecoveredPassword: boolean;
  isHasConditionRegister: boolean;
  statusCode: HttpStatusCode
}
