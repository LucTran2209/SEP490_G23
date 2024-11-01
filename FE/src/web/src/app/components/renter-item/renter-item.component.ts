import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, Observable, Subject } from 'rxjs';
import { ProductItemResponse } from '../../interfaces/product.interface';
import { FeatureAppState } from '../../store/app.state';
import {
  selectNumberOfDaysById,
  selectRentalActualPriceById,
} from '../../features/common/state/rental/rental.selectors';
import { setQuantityRequest } from '../../features/common/state/rental/rental.actions';

type TypeProductRentalCommon = Pick<
  ProductItemResponse,
  'productImages' | 'productName'
>;
@Component({
  selector: 'app-renter-item',
  templateUrl: './renter-item.component.html',
  styleUrl: './renter-item.component.scss',
})
export class RenterItemComponent implements OnInit {
  @Input() productRentalCommon?: TypeProductRentalCommon | null;
  @Input() pId?: string;
  rentalPriceActual$?: Observable<string | number | undefined>;
  numberDay$?: Observable<string | number | undefined>;
  demoValue = 1;
  private quantitySubject = new Subject<number>();

  handleRequestQuantity(val: number) {
    this.quantitySubject.next(val);
  }

  selectStateFromNgRx() {
    if (this.pId) {
      this.rentalPriceActual$ = this.store
        .select(selectRentalActualPriceById(String(this.pId)))

      this.numberDay$ = this.store
        .select(selectNumberOfDaysById(String(this.pId)))
    }
  }

  dispatchActionNessarray() {}

  handleSubjectQuantity() {
    this.quantitySubject.pipe(debounceTime(300)).subscribe((val) => {
      if (this.pId) {
        this.store.dispatch(
          setQuantityRequest({ quantityRequest: val, pid: this.pId })
        );
      }
    });
  }

  ngOnInit(): void {
    this.selectStateFromNgRx();
    this.dispatchActionNessarray();
    this.handleSubjectQuantity();
  }

  constructor(private store: Store<FeatureAppState>) {}
}
