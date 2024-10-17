// Interface for each user in the datas array
export interface ListUserOutputDto {
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
      items : ListUserOutputDto[];
      pageSize: number;
      pageIndex: number;
      totalCount: number;
    };
    
  }
  export interface ProfileResultService {
    statusCode: string;
    message: string;
    datas: UserInputDto; 
  }