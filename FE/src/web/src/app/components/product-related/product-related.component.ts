import { Component, Input } from '@angular/core';
import { ProductOutputDto } from '../../interfaces/product.interface';
import { ProductCardComponent } from "../core/card/product-card/product-card.component";

@Component({
  selector: 'app-product-related',
  templateUrl: './product-related.component.html',
  styleUrl: './product-related.component.scss',
  // imports: [ProductCardComponent]
})
export class ProductRelatedComponent {
@Input() productRelatedList: ProductOutputDto[] = mockDataList;
slideConfig = {
  slidesToShow: 4,
  slidesToScroll: 1,
  dots: false,
  infinite: false,
};
breakpoint(e: any) {
  console.log('breakpoint');
}

afterChange(e: any) {
  console.log('afterChange');
}

beforeChange(e: any) {
  console.log('beforeChange');
}
}


const mockDataList: ProductOutputDto[] = [
  // {
  //   id: '6e8a14df-a54c-466c-b768-5207573b99db',
  //   productName: 'Máy Khoan Cầm Tay',
  //   description: 'Máy khoan đa năng, công suất cao.',
  //   quantity: 10,
  //   rentalPrice: 150000,
  //   subCategoryId: '1234567',
  //   depositPrice: 200000,
  //   rentalLimitDays: 15,
  //   evaluate: 4.5,
  //   images: [
  //     'https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg',
  //   ],
  //   rentalShopName: 'ABC Rentals',
  // },
  // {
  //   id: '6e8a14df-a54c-466c-b768-5207573b99db',
  //   productName: 'Máy Khoan Cầm Tay',
  //   description: 'Máy khoan đa năng, công suất cao.',
  //   quantity: 10,
  //   rentalPrice: 150000,
  //   subCategoryId: '1234567',
  //   depositPrice: 200000,
  //   rentalLimitDays: 15,
  //   evaluate: 4.5,
  //   images: [
  //     'https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg',
  //   ],
  //   rentalShopName: 'ABC Rentals',
  // },
  // {
  //   id: '6e8a14df-a54c-466c-b768-5207573b99db',
  //   productName: 'Máy Khoan Cầm Tay',
  //   description: 'Máy khoan đa năng, công suất cao.',
  //   quantity: 10,
  //   rentalPrice: 150000,
  //   subCategoryId: '1234567',
  //   depositPrice: 200000,
  //   rentalLimitDays: 15,
  //   evaluate: 4.5,
  //   images: [
  //     'https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg',
  //   ],
  //   rentalShopName: 'ABC Rentals',
  // },
  // {
  //   id: '6e8a14df-a54c-466c-b768-5207573b99db',
  //   productName: 'Máy Khoan Cầm Tay',
  //   description: 'Máy khoan đa năng, công suất cao.',
  //   quantity: 10,
  //   rentalPrice: 150000,
  //   subCategoryId: '1234567',
  //   depositPrice: 200000,
  //   rentalLimitDays: 15,
  //   evaluate: 4.5,
  //   images: [
  //     'https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg',
  //   ],
  //   rentalShopName: 'ABC Rentals',
  // },
  // {
  //   id: '6e8a14df-a54c-466c-b768-5207573b99db',
  //   productName: 'Máy Khoan Cầm Tay',
  //   description: 'Máy khoan đa năng, công suất cao.',
  //   quantity: 10,
  //   rentalPrice: 150000,
  //   subCategoryId: '1234567',
  //   depositPrice: 200000,
  //   rentalLimitDays: 15,
  //   evaluate: 4.5,
  //   images: [
  //     'https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg',
  //   ],
  //   rentalShopName: 'ABC Rentals',
  // },
  // {
  //   id: '6e8a14df-a54c-466c-b768-5207573b99db',
  //   productName: 'Máy Khoan Cầm Tay',
  //   description: 'Máy khoan đa năng, công suất cao.',
  //   quantity: 10,
  //   rentalPrice: 150000,
  //   subCategoryId: '1234567',
  //   depositPrice: 200000,
  //   rentalLimitDays: 15,
  //   evaluate: 4.5,
  //   images: [
  //     'https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg',
  //   ],
  //   rentalShopName: 'ABC Rentals',
  // },
];
