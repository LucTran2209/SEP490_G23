import { Subcategory, SubcategoryOutputDto } from './category.interface';
import { RentalShopInfo, RentalShop } from './rental-shop.interface';

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
  productImages?: ProductImage[];
  subCategory: SubcategoryOutputDto;
  rentalShop?: RentalShop;
  
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
  numberOfVoted: string | number;
  rentalPrice: string | number;
  depositPrice: string | number;
  rentalLimitDays: string | number;
  evaluate: string | number;
  subCategory?: Subcategory;
  rentalShop: RentalShopInfo;
  images: string[];
}


//Nhinth



export interface ProductDtoResponse {
  statusCode: number;
  message: string;
  data: {
    rentalShops: RentalShop[];
    products: {
      items: ProductOutputDto[];
      pageSize: number;
      pageIndex: number;
      totalCount: number;
    };
  };
}
export interface SearchProduct {
  pageSize: number;
  pageIndex: number;
  search?: string;
  orderBy?: string;
  orderByDesc?: boolean;
  thenBy?: string;
  thenByDesc?: boolean;
  addresses?: string[];
  subCategory?: string[];
  evaluates?: number[];
  minPrice?: number;
  maxPrice?: number;
}