import { Component } from '@angular/core';

@Component({
  selector: 'card-product-horizontal',
  templateUrl: './card-product-horizontal.component.html',
  styleUrl: './card-product-horizontal.component.scss',
})
export class CardProductHorizontalComponent {
  mockData: {
    thumbnail: string;
    title: string;
    price: number;
    numberRental: string;
    evaluate: string;
  } = {
    thumbnail: './assets/images/142814ae-b725-448c-ac5e-15ddffd00b9d.png',
    title: 'product name',
    price: 300000,
    numberRental: '10',
    evaluate: '5',
  };
}
