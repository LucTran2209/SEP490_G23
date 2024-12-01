import { ORDER_STATUS } from '../utils/constant';
import { ProductOutputDto } from './product.interface';
import { UserOutputDto } from './user.interface';
import { VoucherDetailOutputDto } from './voucher.interface';
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
export interface OrderDetailDto {
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
  rentalShopId: string;
  rentalShopName: string;
  voucher?: string;
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
  orderDetails: OrderDetailDto[];
  orderStatuses: OrderStatus[];
}
export interface User {
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: boolean;
  dateOfBirth: string;
}

export interface MyOrderDetailDto {
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
  note: string;
  mortgagePaperType: number;
  mortgagePaperImageFont: any | null;
  mortgagePaperImageBack: any | null;
  user: User;
  voucher: VoucherDetailOutputDto;
  orderDetails: OrderDetailDto[];
  orderStatuses: OrderStatus[];
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
export interface OrderDetailResultService {
  statusCode: number;
  message: string;
  data: MyOrderDetailDto;
}

export interface OrderCreateRequest {
  userId: string;
  voucherId: string | null;
  recipientName: string;
  recipientPhoneNumber: string;
  recipientEmail?: string;
  recipientAddress: string;
  startDate: string;
  endDate: string;
  totalRentPrice: number;
  totalDepositPrice: number;
  note?: string;
  mortgagePaperType: string;
  mortgagePaperImageFont: File;
  mortgagePaperImageBack: File;
  orderDetailsJson: string;
  orderDetails: null | string;
}
// export interface OrderCreateRequest {
//   userId: string;
//   voucherId: string | null;
//   recipientName: string;
//   recipientPhoneNumber: string;
//   recipientEmail: string;
//   recipientAddress: string;
//   startDate: string;
//   endDate: string;
//   totalRentPrice: number;
//   totalDepositPrice: number;
//   note: string;
//   mortgagePaperType: string;
//   mortgagePaperImageFont: File;
//   mortgagePaperImageBack: File;
//   orderDetails: {
//     id: string | null;
//     productId: string;
//     orderId: string | null;
//     quantity: number;
//   }[];
// }


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
  createdDate?: string;
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

export interface Deposit{
    orderId: string,
    rentalShopId: string | null,
    depoitAmount: number;
}