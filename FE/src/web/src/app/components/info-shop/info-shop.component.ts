import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RentalShopOutputDto } from '../../interfaces/rental-shop.interface';

@Component({
  selector: 'app-info-shop',
  templateUrl: './info-shop.component.html',
  styleUrl: './info-shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoShopComponent {
  @Input() shopInfo?: RentalShopOutputDto | null
  @Input() isOpen?: boolean;
  @Output() handleRentalMoreProduct = new EventEmitter();
  rentalMoreProduct(val: boolean) {
    this.handleRentalMoreProduct.emit(val);
  }
}