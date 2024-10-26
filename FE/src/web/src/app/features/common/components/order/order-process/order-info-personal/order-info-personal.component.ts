import { Component } from '@angular/core';
interface OrderItem {
  key: string;
  productName: string;
  image: string;
  quantity: number;
  rentalPrice: number | string;
  depositPrice: number | string;
  total: string | number;
}
@Component({
  selector: 'app-order-info-personal',
  templateUrl: './order-info-personal.component.html',
  styleUrl: './order-info-personal.component.scss',
})
export class OrderInfoPersonalComponent {
  listOfData: OrderItem[] = [
   {
    key: "1",
    productName: "Máy giặt XQB30MJ102W",
    image: "https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg",
    depositPrice: "400000",
    quantity: 3,
    rentalPrice: "200000",
    total: 600000
   },
   {
    key: "2",
    productName: "Máy giặt XQB30MJ102W",
    image: "https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg",
    depositPrice: "400000",
    quantity: 3,
    rentalPrice: "200000",
    total: 600000
   },
   {
    key: "3",
    productName: "Máy giặt XQB30MJ102W",
    image: "https://matika.vn/wp-content/uploads/2023/02/quat-tich-dien-pvn-5626.jpg",
    depositPrice: "400000",
    quantity: 3,
    rentalPrice: "200000",
    total: 600000
   }
  ];

  demoValue = 3;
}
