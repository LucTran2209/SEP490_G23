import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderState } from '../../features/common/state/rental/rental.reducers';
import {
  selectAllProductRental,
  selectCalcActualDiscountVoucher,
  selectVoucherAvaiable,
} from '../../features/common/state/rental/rental.selectors';
import { FeatureAppState } from '../../store/app.state';
import { VoucherDetailOutputDto } from '../../interfaces/voucher.interface';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrl: './price-list.component.scss',
})
export class PriceListComponent implements OnInit {
  rentalPrice$?: Observable<number>;
  depositPrice$?: Observable<number>;
  allProductRental$?: Observable<OrderState[]>;
  voucherAvaiable$?: Observable<VoucherDetailOutputDto | null>;
  calcActualDiscountVoucher$?: Observable<number>;
  constructor(private store: Store<FeatureAppState>) {}

  ngOnInit(): void {
    this.allProductRental$ = this.store.select(selectAllProductRental);
    this.voucherAvaiable$ = this.store.select(selectVoucherAvaiable);
    this.calcActualDiscountVoucher$ = this.store.select(
      selectCalcActualDiscountVoucher
    );
  }

  calculateTotalAmount(
    allProductRental: OrderState[],
    discountPriceVoucher: number | null
  ): number {
    const tmpSubtract =
      discountPriceVoucher === null ? 0 : discountPriceVoucher;
    let totalAfter =
      allProductRental.reduce((acc, order) => {
        const rentalActualPrice = Number(order.rentalActualPrice) || 0;
        const orderTotal = rentalActualPrice;

        return acc + orderTotal;
      }, 0) - tmpSubtract;
    return totalAfter < 0 ? 0 : totalAfter;
  }
}
