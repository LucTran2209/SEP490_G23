
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
export interface RentalShopResultService {
    statusCode: string;
    message: string;
    data: RentalShopOutputDto;
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
export interface RentalShopResultService {
    statusCode: string;
    message: string;
    data: RentalShopOutputDto;
}
