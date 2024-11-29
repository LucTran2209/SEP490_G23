import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import dayjs from 'dayjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {
  debounceTime,
  filter,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
} from 'rxjs';
import { VoucherDetailOutputDto } from '../../../interfaces/voucher.interface';
import { VoucherService } from '../../../services/voucher.service';
import { DetailVoucherAvailableComponent } from '../detail-voucher-available/detail-voucher-available.component';
import { Store } from '@ngrx/store';
import { MessageResponseService } from '../../../services/message-response.service';
import { selectIsFineApplyVoucherAvaiable } from '../../../features/common/state/rental/rental.selectors';
import { applyVoucher } from '../../../features/common/state/rental/rental.actions';

@Component({
  selector: 'app-list-voucher-available',
  templateUrl: './list-voucher-available.component.html',
  styleUrl: './list-voucher-available.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListVoucherAvailableComponent implements OnInit, OnDestroy {
  data$?: Observable<VoucherDetailOutputDto[]>;
  filterData$?: Observable<VoucherDetailOutputDto[]>;
  loading = false;
  searchVoucher: FormControl<string | null> = new FormControl<string | null>(
    null
  );
  private detailVoucherRef: NzModalRef | null = null;
  private subscription?: Subscription;
  applyVoucher(voucher: VoucherDetailOutputDto) {
    this.subscription = this.store
      .select(selectIsFineApplyVoucherAvaiable(voucher.minimumSpend))
      .subscribe((res) => {
        if (res) {
          this.store.dispatch(applyVoucher({ voucher }));
          this.modalRef.triggerCancel();
        } else {
          this.toastMS.showPreventAccess(
            'Cảnh báo áp dụng voucher',
            'giá thuê sản phẩm ít hơn tối thiểu vui lòng xem chi tiết voucher'
          );
        }
      });
  }

  onChooseViewDetailVoucher(voucherDetail: VoucherDetailOutputDto) {
    this.detailVoucherRef = this.modal.create({
      nzTitle: `Chi tiết voucher ${voucherDetail.code}`,
      nzFooter: null,
      nzContent: DetailVoucherAvailableComponent,
      nzData: {
        voucherDetail: voucherDetail,
      },
    });
    if (this.detailVoucherRef)
      this.detailVoucherRef.afterClose.subscribe(() => {
        this.detailVoucherRef = null;
      });
  }

  convertDateToDay(date: string) {
    const now = dayjs();
    let tmp = dayjs(date).diff(now, 'day');
    return tmp;
  }

  searchVoucherNoApi() {
    this.searchVoucher.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((res) =>
          (this.data$ || of([])).pipe(
            filter(
              (vouchers) => Array.isArray(vouchers) && vouchers.length > 0
            ),
            switchMap((vouchers) =>
              of(
                vouchers.filter((voucher) =>
                  voucher.code.toLowerCase().includes(res?.toLowerCase() || '')
                )
              )
            )
          )
        )
      )
      .subscribe((res) => {
        this.filterData$ = of(res);
        this.cdRef.detectChanges();
      });
  }

  async loadListVoucherAvaiable() {
    this.loading = true;
    this.voucherService
      .getListVoucherAvaiable()
      .pipe(switchMap((res) => of(res.data)))
      .subscribe({
        next: (res) => {
          this.data$ = of(res);
          this.filterData$ = of(res);
          this.loading = false;
          this.cdRef.detectChanges();
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  constructor(
    private modal: NzModalService,
    private modalRef: NzModalRef,
    private voucherService: VoucherService,
    private store: Store,
    private toastMS: MessageResponseService,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.loadListVoucherAvaiable();
    this.searchVoucherNoApi();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
