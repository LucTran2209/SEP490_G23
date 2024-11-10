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
  orderStatuses: OrderStatusDto[];
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
  voucher: any | null;
  orderDetails: OrderDetailDto[];
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
  orderDetails: null | string
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

export interface OrderDetailResponse {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  product: ProductOutputDto
  // product: {
    // id: 'a46a877d-d4c2-42da-8b91-2edb16bf9c25';
    // productName: 'Laptop DELL';
    // description: 'laptop dell moi nhat';
    // quantity: 1;
    // rentalPrice: 200000.0;
    // depositPrice: 10000000.0;
    // rentalLimitDays: 30;
    // evaluate: 0.0;
    // productImages: [
    //   {
    //     id: 'b1526e5e-9b90-4dc9-9d70-6ca3e61857a6';
    //     productId: 'a46a877d-d4c2-42da-8b91-2edb16bf9c25';
    //     link: 'https://sep490g23.blob.core.windows.net/g23storage/1638657963571590375_443f788c-79ac-43a3-a15a-339f634468e7.jpg';
    //   },
    //   {
    //     id: 'c2fd2158-0c52-4315-b850-95f858505a7d';
    //     productId: 'a46a877d-d4c2-42da-8b91-2edb16bf9c25';
    //     link: 'https://sep490g23.blob.core.windows.net/g23storage/1638657963562750458_11530a8d-91bc-43c1-879d-b5dd89ca64d7.jpg';
    //   }
    // ];
  // };
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