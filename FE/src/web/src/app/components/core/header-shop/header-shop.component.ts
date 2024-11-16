import { Component, Input } from '@angular/core';
import { RentalShop } from '../../../interfaces/rental-shop.interface';

@Component({
  selector: 'app-header-shop',
  templateUrl: './header-shop.component.html',
  styleUrl: './header-shop.component.scss'
})
export class HeaderShopComponent {
  @Input() shop!: RentalShop;
}
