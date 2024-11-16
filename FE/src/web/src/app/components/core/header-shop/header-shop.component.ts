import { Component } from '@angular/core';
import { RequestShopDetailDto } from '../../../interfaces/request-shop.interface';

@Component({
  selector: 'app-header-shop',
  templateUrl: './header-shop.component.html',
  styleUrl: './header-shop.component.scss'
})
export class HeaderShopComponent {
  shop!: RequestShopDetailDto;
}
