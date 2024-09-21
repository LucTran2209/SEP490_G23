// Interface for each user in the datas array
export interface ListUserOutputDto {
    id: number;
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: boolean;  // Assuming gender is stored as boolean
    dateOfBirth: string;
  }
  
  // Interface for the service response
  export interface UserResultService {
    statusCode: number;
    message: string;
    datas: ListUserOutputDto[];  // Array of users
  }