import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-shop',
  templateUrl: './info-shop.component.html',
  styleUrl: './info-shop.component.scss',
})
export class InfoShopComponent {
  @Input() isOpen?: boolean;
  @Output() handleRentalMoreProduct = new EventEmitter();
  rentalMoreProduct(val: boolean) {
    this.handleRentalMoreProduct.emit(val);
  }
}