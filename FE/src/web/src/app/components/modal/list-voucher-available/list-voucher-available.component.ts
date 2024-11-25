import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { DetailVoucherAvailableComponent } from '../detail-voucher-available/detail-voucher-available.component';

@Component({
  selector: 'app-list-voucher-available',
  templateUrl: './list-voucher-available.component.html',
  styleUrl: './list-voucher-available.component.scss',
})
export class ListVoucherAvailableComponent implements OnInit {
  data: any = mockVouchers;
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

  constructor(private modal: NzModalService) {}
  ngOnInit(): void {}
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
