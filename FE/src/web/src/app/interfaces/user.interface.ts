// Interface for each user in the datas array
export interface ListUserOutputDto {
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: boolean;  // Assuming gender is stored as boolean
  dateOfBirth: string;
  isActive: boolean;
  }
  export interface UserInputDto {
    fullName: string;
    userName: string;
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
    statusCode: string;
    message: string;
    datas: {
      list: ListUserOutputDto[];
    };  // Array of list users
  }
  export interface ProfileResultService {
    statusCode: string;
    message: string;
    datas: UserInputDto; 
  }