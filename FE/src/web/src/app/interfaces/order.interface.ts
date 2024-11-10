import { ORDER_STATUS } from '../utils/constant';
import { ProductOutputDto } from './product.interface';
import { UserOutputDto } from './user.interface';
export interface ProductImage {
  id: string;
  productId: string;
  link: string;
}

export interface Product {
  id: string;
  productName: string;
  description: string;
  quantity: number;
  rentalPrice: number;
  depositPrice: number;
  rentalLimitDays: number;
  evaluate: number;
  productImages: ProductImage[];
}
export interface OrderDetail {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  product: Product;
}
export interface OrderStatusDto {
  id: string;
  orderId: string;
  message: string;
  status: number;
  fileAttach: string | null;
}
export interface MyOrderOutputDto {
  id: string;
  userId: string;
  voucherId: string | null;
  code: string | null;
  recipientName: string | null;
  recipientPhoneNumber: string;
  recipientEmail: string | null;
  recipientAddress: string | null;
  startDate: string;
  endDate: string;
  totalRentPrice: number;
  totalDepositPrice: number;
  note: string | null;
  mortgagePaperType: number;
  mortgagePaperImageFont: string | null;
  mortgagePaperImageBack: string | null;
  orderDetails: OrderDetail[];
  orderStatuses: OrderStatusDto[];
}

export interface OrderResultService {
  statusCode: number;
  message: string;
  data: {
    items: MyOrderOutputDto[];
    pageSize: number;
    pageIndex: number;
    totalCount: number;
  };
}

export interface OrderCreateRequest {
  userId: string;
  voucherId: string | null;
  recipientName: string;
  recipientPhoneNumber: string;
  recipientEmail: string;
  recipientAddress: string;
  startDate: string;
  endDate: string;
  totalRentPrice: number;
  totalDepositPrice: number;
  note: string;
  mortgagePaperType: string;
  mortgagePaperImageFont: File;
  mortgagePaperImageBack: File;
  orderDetailsJson: string;
  orderDetails: null | string;
}

type ProductCustomImage = ProductOutputDto & {
  productImages: ProductImage[];
};

export interface OrderDetailResponse {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  product: ProductCustomImage;
}

export interface OrderStatus {
  id: string;
  orderId: string;
  message: string;
  status: ORDER_STATUS;
  fileAttach: null;
}
export interface OrderListResponse {
  id: string;
  user: UserOutputDto;
  userId: string;
  voucher: string | null;
  voucherId: null;
  orderDetails: OrderDetailResponse[];
  orderStatuses: OrderStatus[];
  code: string | null;
  recipientName: string;
  recipientPhoneNumber: string;
  recipientEmail: string;
  recipientAddress: string;
  startDate: string;
  endDate: string;
  totalRentPrice: string | number;
  totalDepositPrice: string | number;
  note: string;
  mortgagePaperType: number;
  mortgagePaperImageFont: null;
  mortgagePaperImageBack: null;
}
