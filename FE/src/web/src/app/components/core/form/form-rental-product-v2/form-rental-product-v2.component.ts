import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter, Observable, Subscription } from 'rxjs';
import { removeOneOrder, resetRentalProduct } from '../../../../features/common/state/rental/rental.actions';
import { OrderState } from '../../../../features/common/state/rental/rental.reducers';
import {
  selectAllProductRental,
  selectTotalAllProductDepositPrice,
  selectTotalAllProductRentalPrice,
} from '../../../../features/common/state/rental/rental.selectors';
import { MessageResponseService } from '../../../../services/message-response.service';
import { RentalTimerService } from '../../../../services/rental-timer.service';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { ConfimOrderProcessComponent } from '../../../modal/confim-order-process/confim-order-process.component';
import { PickerTimerComponent } from '../../../modal/picker-timer/picker-timer.component';

interface IProductShortSearch {
  id: string | number;
  productName: string;
  rentalPrice: number;
  depositPrice: number;
  rentalLimitDays: number;
  images: string;
}

@Component({
  selector: 'app-form-rental-product-v2',
  templateUrl: './form-rental-product-v2.component.html',
  styleUrl: './form-rental-product-v2.component.scss',
})
export class FormRentalProductV2Component implements OnInit, OnDestroy {
  isConfirmLoading = false;
  isVisible = false;
  inputValue?: string;
  productRentalDetailArray$?: Observable<OrderState[]>;

  rentalPriceActualAll$?: Observable<string | number>;
  depositPriceActualAll$?: Observable<string | number>;
  //date time

  //subscription
  private routeSubscription?: Subscription;
  //date time

  

  onChooseRental(titleTemplate: TemplateRef<any>) {
    this.modal.create({
      nzTitle: titleTemplate,
      nzContent: ConfimOrderProcessComponent,
      nzFooter: null,
      nzWidth: 820,
      nzData: {
        productRentalDetailArray$: this.productRentalDetailArray$
      },
    });
  }

  onChooseDateCustom() {
    this.modal.create({
      nzTitle: 'Thời gian',
      nzContent: PickerTimerComponent,
      nzFooter: null,
      nzWidth: 700,
    });
  }

onRemoveRow(pid: string | number){
  console.log('pid',pid);
this.store.dispatch(removeOneOrder({pid}))
}


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  // on choose more
  onChooseRentalMore() {}

  selectStateFromNgRx() {
    this.rentalPriceActualAll$ = this.store.select(
      selectTotalAllProductRentalPrice()
    );
    this.depositPriceActualAll$ = this.store.select(
      selectTotalAllProductDepositPrice()
    );
    this.productRentalDetailArray$ = this.store.select(selectAllProductRental);
  }

  dispatchActionNessarray() {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalTimerService: RentalTimerService,
    private store: Store<FeatureAppState>,
    private storageService: StorageService,
    private ToasMS: MessageResponseService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.dispatchActionNessarray();
    this.selectStateFromNgRx();

    //unsubscrib
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.rentalTimerService.clearState();
      });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    this.store.dispatch(resetRentalProduct());
  }
}
