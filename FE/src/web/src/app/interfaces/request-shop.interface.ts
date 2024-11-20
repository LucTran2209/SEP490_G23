export interface RequestShopResultService {
    statusCode: number;
    message: string;
    data: {
      items : RequestShopDto[];
      pageSize: number;
      pageIndex: number;
      totalCount: number;
    };
  }
  
  // Define the interface for the `datas` property
  export interface RequestShopDto {
    id: string;
    shopName: string;
    address: string;
    phoneNumber: string;
    email: string;
    status: number;
    isActive: boolean;
    description: string;
    adminNote: string;
  }
  export interface ChangeStatusRequestShop {
    id: string;
    status: number;
  }
  export interface RequestShopDetailResultService {
    statusCode: number;
    message: string;
    data: RequestShopDetailDto;
  }
  
  export interface RequestShopDetailDto {
    createDate?: string;
    id: string;
    userId: string;
    shopName: string;
    imageFont: string;
    imageBack: string;
    taxNumber: string;
    businessLicenseFile: string;
    rentalScale: number;
    address: string;
    phoneNumber: string;
    email: string;
    status: number;
    isActive: boolean;
    description: string;
    adminNote: string;
  }