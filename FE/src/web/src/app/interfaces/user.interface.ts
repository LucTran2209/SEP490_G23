// Interface for each user in the datas array
export interface ListUserOutputDto {
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: boolean;  // Assuming gender is stored as boolean
    dateOfBirth: string;
    isActive: boolean;
  }
  export interface UserInputDto {
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: boolean;  // Assuming gender is stored as boolean
    dateOfBirth: string;
  }
  export interface ActiveUserInputDto{
    userName: string;
    isActive: boolean;
  }
  
  // Interface for the service response
  export interface UserResultService {
    statusCode: number;
    message: string;
    datas: ListUserOutputDto[];  // Array of list users
  }