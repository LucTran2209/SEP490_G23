import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-info-shop',
  templateUrl: './info-shop.component.html',
  styleUrl: './info-shop.component.scss',
})
export class InfoShopComponent {

  @Output() handleRentalMoreProduct = new EventEmitter();
  rentalMoreProduct() {
    this.handleRentalMoreProduct.emit();
  }
}