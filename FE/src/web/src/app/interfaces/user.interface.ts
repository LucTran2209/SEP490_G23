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
  avatarPersonal: string;
  isActive: boolean;
  balance: number;
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
    avatarPersonal: File | null;
    isActive: boolean;
    refreshToken: string;
  }
  export interface UserUpdateInputDto {
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    address: string,
    gender: boolean,
    dateOfBirth: string
    avatarPersonal?: File | null;
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