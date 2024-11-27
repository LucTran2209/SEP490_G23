import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import dayjs from 'dayjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { debounceTime, filter, Observable, of, switchMap } from 'rxjs';
import { VoucherDetailOutputDto } from '../../../interfaces/voucher.interface';
import { VoucherService } from '../../../services/voucher.service';
import { DetailVoucherAvailableComponent } from '../detail-voucher-available/detail-voucher-available.component';

@Component({
  selector: 'app-list-voucher-available',
  templateUrl: './list-voucher-available.component.html',
  styleUrl: './list-voucher-available.component.scss',
})
export class ListVoucherAvailableComponent implements OnInit {
  data$?: Observable<VoucherDetailOutputDto[]>;
  filterData$?: Observable<VoucherDetailOutputDto[]>;
  loading = false;
  searchVoucher: FormControl<string | null> = new FormControl<string | null>(
    null
  );
  private detailVoucherRef: NzModalRef | null = null;

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
    private voucherService: VoucherService
  ) {}
  ngOnInit(): void {
    this.loadListVoucherAvaiable();
    this.searchVoucherNoApi();
  }
}

const mockVouchers: any = [
  {
    code: 'MI75',
    discount: '8%',
    maxDiscount: '80K',
    details: 'Giảm 8% (tối đa 80K).',
    expiry: 'Hết hạn sau 5 ngày',
    isApplied: false,
  },
  {
    code: 'SALE50',
    discount: '50%',
    maxDiscount: '100K',
    details: 'Giảm 50% (tối đa 100K).',
    expiry: 'Hết hạn sau 3 ngày',
    isApplied: false,
  },
  {
    code: 'FREESHIP',
    discount: '100%',
    maxDiscount: '30K',
    details: 'Miễn phí vận chuyển (tối đa 30K).',
    expiry: 'Hết hạn sau 7 ngày',
    isApplied: false,
  },
  {
    code: 'WELCOME10',
    discount: '10%',
    maxDiscount: '50K',
    details: 'Giảm 10% (tối đa 50K).',
    expiry: 'Hết hạn sau 1 ngày',
    isApplied: false,
  },
  {
    code: 'VIP20',
    discount: '20%',
    maxDiscount: '200K',
    details: 'Giảm 20% (tối đa 200K).',
    expiry: 'Hết hạn sau 10 ngày',
    isApplied: false,
  },
];
