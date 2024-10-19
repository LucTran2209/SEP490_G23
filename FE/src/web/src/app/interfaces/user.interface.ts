// Interface for each user in the datas array
export interface UserOutputDto {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: boolean;  
  dateOfBirth: string;
  isActive: boolean;
  listRole: [];
  }
  export interface UserInputDto {
    userName: string;
    password: string,
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: boolean;  
    dateOfBirth: string;
    introduction: string;
    avatarPersonal: string;
    isActive: boolean;
    refreshToken: string;
  }
  export interface ActiveUserInputDto{
    id: string;
    isActive: boolean;
  }
  
  // Interface for the service response
  export interface UserResultService {
    statusCode: string;
    message: string;
    data: {
      items : UserOutputDto[];
      pageSize: number;
      pageIndex: number;
      totalCount: number;
    };
    
  }
  export interface ProfileResultService {
    statusCode: string;
    message: string;
    data: UserOutputDto; 
  }