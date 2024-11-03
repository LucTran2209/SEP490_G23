import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderState } from '../../features/common/state/rental/rental.reducers';
import {
  selectAllProductRental
} from '../../features/common/state/rental/rental.selectors';
import { ProductItemResponse } from '../../interfaces/product.interface';
import { FeatureAppState } from '../../store/app.state';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.scss',
})
export class PriceListComponent implements OnInit {
  @Input() productDetails?: ProductItemResponse[];

  rentalPrice$?: Observable<number>;
  depositPrice$?: Observable<number>;
  allProductRental$?: Observable<OrderState[]>;

  constructor(private store: Store<FeatureAppState>) {}

  ngOnInit(): void {
    this.allProductRental$ = this.store.select(selectAllProductRental);
  }

  calculateTotalAmount(allProductRental: OrderState[]): number {
    return allProductRental.reduce((acc, order) => {
      const depositActualPrice = Number(order.depositActualPrice) || 0;
      const rentalActualPrice = Number(order.rentalActualPrice) || 0;

      const orderTotal = depositActualPrice + rentalActualPrice;

      return acc + orderTotal;
    }, 0);
  }
}
