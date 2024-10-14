import { StatusProcess } from "../../../interfaces/anonymous.interface";

export interface UserState {
    dataUser: any | null,
    status: StatusProcess,
    message: string | null,
}