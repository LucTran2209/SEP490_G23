export interface DetailOfProduct{
    productName: string;
    quantity: number;
    price: number;
    depositPrice: number;
    // numberofRentalDays?: number;
    images: string[];
}
export interface OrderByUserOutputDto {
    orderId: string;
    userId: string;
    address?: string | null;
    startDate: Date;
    endDate: Date;
    note?: string | null;
    totalPrice?: number | null;
    orderStatus: string;
    rentalShopName: string;
    detailProducts?: DetailOfProduct[] | null;
}
export interface OrderResultService {
    statusCode: string;
    message: string;
    data: {
      items : OrderByUserOutputDto[];
      pageSize: number;
      pageIndex: number;
      totalCount: number;
    };
    
  }