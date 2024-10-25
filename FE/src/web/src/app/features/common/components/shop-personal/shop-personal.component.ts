import { Component } from '@angular/core';
import { ProductOutputDto } from '../../../../interfaces/product.interface';
import { categoryOptions } from '../../../../mock/post';
import { selectSortByOrder } from '../../../../configs/post.config';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-shop-personal',
  templateUrl: './shop-personal.component.html',
  styleUrl: './shop-personal.component.scss'
})
export class ShopPersonalComponent {
  productList: ProductOutputDto[] = mockDataList;
  categoryOptions = categoryOptions;
  selectedValue = null;
  groupOptionFilterSelect: OptionSelect[] = selectSortByOrder;
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  goDown0() {
    this.scroller.scrollToAnchor("viewEnjoy");
  }

  goDown1() {
    this.scroller.scrollToAnchor("targetAllProduct");
  }

  goDown2() {
    this.scroller.scrollToAnchor("MoreRental");
  }

  constructor(private scroller: ViewportScroller) {
  }
}

const mockDataList: ProductOutputDto[] = [
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
  {
    id: '6e8a14df-a54c-466c-b768-5207573b99db',
    productName: 'Máy Khoan Cầm Tay',
    description: 'Máy khoan đa năng, công suất cao.',
    quantity: 10,
    rentalPrice: 150000,
    subCategoryId: "1234567",
    depositPrice: 200000,
    rentalLimitDays: 15,
    evaluate: 4.5,
    images:
      ['https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg'],
    rentalShopName: 'ABC Rentals',
  },
];

