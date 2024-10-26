export interface DeatilOfProduct{
    productId: string;
    quantity: number;
    price: number;
    images: string[];
}
export interface OrderByUserOutputDto {
    orderId: string;
    userId: string;
    address?: string | null;
    startDate: Date;
    endDate: Date;
    note?: string | null;
    orderStatus: string;
    rentalShopId: string;
    detailProducts?: DeatilOfProduct[] | null;
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