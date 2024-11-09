import { Subcategory, SubcategoryOutputDto } from './category.interface';
import { RentalShopInfo } from './rental-shop.interface';

export interface ProductOutputDto {
    id: string;
    productName: string;
    description: string;
    quantity: number;
    rentalPrice: number;
    depositPrice: number;
    rentalLimitDays: number;
    evaluate: number;
    images: string[];
    subCategory: SubcategoryOutputDto;
    
}
export interface ProductInputDto {
  productName: string;
  description: string;
  quantity: number;
  subCategoryId: string;
  rentalShopId: string;
  rentalPrice: number;
  depositPrice: number;
  rentalLimitDays: number;
  evaluate: number;
  images: File[];
}
export interface UpdateProductInputDto {
  productName: string;
  description: string;
  quantity: number;
  rentalPrice: number;
  depositPrice: number;
  rentalLimitDays: number;
  evaluate: number;
  images: (File | string)[];
}
export interface ProductResultService {
  statusCode: number;
  message: string;
  data: {
    items: ProductOutputDto[];
    pageSize: number;
    pageIndex: number;
    totalCount: number;
  };
}

export interface ProductImage {
  id: string;
  productId: string;
  link: string;
}

export interface ProductRentalOrderProcess {
  productId: string;
  numberOfDay: number;
  timeStart: Date;
  timeEnd: Date;
  note: string;
  images: string[];
  productName: string;
  quantityRequest: number;
  rentalPriceRequest: number;
  depositPriceRequest: number;
}

export interface ProductItemResponse {
  id: string;
  productName: string;
  description: string;
  quantity: number;
  subCategoryId: string;
  rentalPrice: string | number;
  depositPrice: string | number;
  rentalLimitDays: string | number;
  evaluate: string | number;
  subCategory?: Subcategory;
  rentalShop: RentalShopInfo;
  images: string[];
}
