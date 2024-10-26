import { Component } from '@angular/core';

@Component({
  selector: 'app-renter-item',
  templateUrl: './renter-item.component.html',
  styleUrl: './renter-item.component.scss'
})
export class RenterItemComponent {
  imageBaseURl: string =
    'https://cdn.tgdd.vn/Files/2014/12/06/586947/y-nghia-cua-toc-do-quay-vat-tren-may-giat-6.jpg';
  demoValue = 3;
}
