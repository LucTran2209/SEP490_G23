export interface RentalShopInfo {
  createDate: string;
  id: string;
  userId: string;
  shopName: string;
  rentalScale: number;
  address: string;
  phoneNumber: string;
  email: string;
  isActive: boolean;
  description: string;
}

export interface RentalShopOutputDto {
    createDate?: string;
    id: string;
    userId: string;
    shopName: string;
    rentalScale: number;
    address: string;
    phoneNumber: string;
    email: string;
    isActive: boolean;
    description: string;
}

export interface RentalShopOutputDto {
    createDate?: string;
    numberOfRenter?: number;
    id: string;
    userId: string;
    shopName: string;
    imageFont: string | null;
    imageBack: string | null;
    taxNumber: string | null;
    businessLicenseFile: string | null;
    rentalScale: number;
    address: string;
    phoneNumber: string;
    email: string;
    status: number;
    isActive: boolean;
    description: string;
    avatarShop: string;
}
export interface RentalShopResultService {
    statusCode: string;
    message: string;
    data: RentalShopOutputDto;
}


export interface RentalShop  {
    id: string;
    userId: string;
    avatarShop: string | null;
    shopName: string;
    imageFont: string | null;
    imageBack: string | null;
    taxNumber: string | null;
    businessLicenseFile: string | null;
    rentalScale: number;
    address: string;
    phoneNumber: string;
    email: string;
    status: number;
    isActive: boolean;
    description: string;
}
export interface UpdateRentalShop {
    shopName: string;
    avatarShop: File | null;
}
export interface DeactiveShop {
    id: string;
    isActive: boolean,
    adminNote: string
}