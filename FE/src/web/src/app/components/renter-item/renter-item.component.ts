import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, map, Observable, Subject, take } from 'rxjs';
import { selectIsInitialState } from '../../features/common/state/product/product-detail.reducer';
import {
  removeOneOrder,
  setQuantityRequest
} from '../../features/common/state/rental/rental.actions';
import { OrderState } from '../../features/common/state/rental/rental.reducers';
import {
  selectNumberOfDaysById,
  selectProductRentalById,
  selectRentalActualPriceById,
} from '../../features/common/state/rental/rental.selectors';
import { MessageResponseService } from '../../services/message-response.service';
import { FeatureAppState } from '../../store/app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-renter-item',
  templateUrl: './renter-item.component.html',
  styleUrl: './renter-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenterItemComponent implements OnInit {
  productRentalFollowId$?: Observable<OrderState | undefined>;
  isInitialStateProductDetail$?: Observable<boolean>;
  @Input() pId?: string;
  @Output() removeOneRow = new EventEmitter<string | number>();
  rentalPriceActual$?: Observable<string | number | undefined>;
  numberDay$?: Observable<string | number | undefined>;
  demoValue = 1;
  private quantitySubject = new Subject<number>();

  handleRequestQuantity(val: number) {
    if(!val || val < 0){
      return;
    }
    this.productRentalFollowId$
      ?.pipe(
        take(1),
        map((order) => {
          if (order && val > Number(order.quantityAvailable)) {
            this.messageResponseMS.showPreventAccess(
              'Cảnh báo',
              'Số lượng yêu cầu vượt quá giới hạn số lượng có sẵn'
            );
            this.demoValue = null as any;
            setTimeout(() => {
              this.demoValue = Number(order.quantityAvailable);
              this.cdRef.detectChanges();
            }, 0);
          } else {
            this.quantitySubject.next(val);
          }
        })
      )
      .subscribe();
  }

  selectStateFromNgRx() {
    this.isInitialStateProductDetail$ = this.store.select(selectIsInitialState);
    if (this.pId) {
      this.rentalPriceActual$ = this.store.select(
        selectRentalActualPriceById(String(this.pId))
      );
      this.numberDay$ = this.store.select(
        selectNumberOfDaysById(String(this.pId))
      );
      this.productRentalFollowId$ = this.store.select(
        selectProductRentalById(String(this.pId))
      )
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

  get isRentalMore(){
    return this.router.url.includes('/common/shop');
  }

  deleteOneItem(){
    this.removeOneRow.emit(this.pId);
  }

  ngOnInit(): void {
    this.selectStateFromNgRx();
    this.dispatchActionNessarray();
    this.handleSubjectQuantity();
  }

  constructor(
    private store: Store<FeatureAppState>,
    private cdRef: ChangeDetectorRef,
    private messageResponseMS: MessageResponseService,
    private router: Router
  ) {}
}
