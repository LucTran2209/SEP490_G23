export interface DetailOfProduct {
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
  address: string;
  startDate: Date;
  endDate: Date;
  note: string;
  totalPrice: number;
  orderStatus: string;
  rentalShopName: string;
  detailProducts: DetailOfProduct[];
}
export interface OrderResultService {
  statusCode: string;
  message: string;
  data: {
    items: OrderByUserOutputDto[];
    pageSize: number;
    pageIndex: number;
    totalCount: number;
  };
}

export interface OrderCreateRequest {
  id: null;
  voucherId?: string | null;
  code: string;
  recipientName: string;
  recipientPhoneNumber: string;
  recipientEmail: string;
  recipientAddress: string;
  totalRentPrice: number;
  totalDepositPrice: number;
  paymentType: 0;
  userId: string;
  startDate: string;
  endDate: string;
  note: string;
  orderDetails: {
    id: string | null;
    productId: string;
    orderId: string | null;
    quantity: number;
  }[];
}
