import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { DetailVoucherAvailableComponent } from '../detail-voucher-available/detail-voucher-available.component';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, of, switchMap } from 'rxjs';
import { VoucherService } from '../../../services/voucher.service';
import { VoucherOutputDto } from '../../../interfaces/voucher.interface';

@Component({
  selector: 'app-list-voucher-available',
  templateUrl: './list-voucher-available.component.html',
  styleUrl: './list-voucher-available.component.scss',
})
export class ListVoucherAvailableComponent implements OnInit {
  data$?: Observable<VoucherOutputDto[]>;
  loading = false;
  searchVoucher: FormControl<string | null> = new FormControl<string | null>(
    null
  );
  private detailVoucherRef: NzModalRef | null = null;

  onChooseViewDetailVoucher() {
    this.detailVoucherRef = this.modal.create({
      nzTitle: 'Chi tiết voucher MI75',
      nzFooter: null,
      nzContent: DetailVoucherAvailableComponent,
    });
    if (this.detailVoucherRef)
      this.detailVoucherRef.afterClose.subscribe(() => {
        this.detailVoucherRef = null;
      });
  }

  // searchVoucherNoApi() {
  //   this.searchVoucher.valueChanges
  //     .pipe(
  //       debounceTime(300),
  //       switchMap((res) => {
  //         let tmp = mockVouchers.filter((vo: any) =>
  //           vo.code.toLowerCase().includes(res?.toLowerCase())
  //         );
  //         return of(tmp);
  //       })
  //     )
  //     .subscribe((res) => {
  //       this.data = res;
  //     });
  // }

  loadListVoucherAvaiable() {
    this.voucherService
      .getListVoucherAvaiable()
      .pipe(
        map((res) => {
          console.log('>>> line 51', res);
        })
      )
      .subscribe();
  }

  constructor(
    private modal: NzModalService,
    private voucherService: VoucherService
  ) {}
  ngOnInit(): void {
    this.loadListVoucherAvaiable();
    // this.searchVoucherNoApi();
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
