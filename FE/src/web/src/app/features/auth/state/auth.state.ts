import { StatusProcess } from "../../../interfaces/anonymous.interface";

export interface AuthState {
    status: StatusProcess;
    message: string | null;
    isAuthenticated: boolean;
    dataUser: any | null;
    isRecoveringPassword: boolean;
    isRecoveredPassword: boolean;

}