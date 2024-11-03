import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, Subject } from 'rxjs';
import { selectData } from '../../features/common/state/product/product-detail.reducer';
import { setQuantityRequest } from '../../features/common/state/rental/rental.actions';
import {
  selectNumberOfDaysById,
  selectRentalActualPriceById
} from '../../features/common/state/rental/rental.selectors';
import { ProductItemResponse } from '../../interfaces/product.interface';
import { FeatureAppState } from '../../store/app.state';


@Component({
  selector: 'app-renter-item',
  templateUrl: './renter-item.component.html',
  styleUrl: './renter-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenterItemComponent implements OnInit {
  productDetail$?: Observable<ProductItemResponse>;
  @Input() pId?: string;
  rentalPriceActual$?: Observable<string | number | undefined>;
  numberDay$?: Observable<string | number | undefined>;
  demoValue = 1;
  private quantitySubject = new Subject<number>();

  handleRequestQuantity(val: number) {
    this.quantitySubject.next(val);
  }

  selectStateFromNgRx() {
    this.productDetail$ = this.store.select(selectData);
    if (this.pId) {
      this.rentalPriceActual$ = this.store.select(
        selectRentalActualPriceById(String(this.pId))
      );
      this.numberDay$ = this.store.select(
        selectNumberOfDaysById(String(this.pId))
      );
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
