import { Component, inject, OnInit } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { VoucherDetailOutputDto } from '../../../interfaces/voucher.interface';
import { convertDiscountType } from '../../../utils/anonymous.helper';
import { DISCOUNT_TYPE } from '../../../utils/constant';

@Component({
  selector: 'app-detail-voucher-available',
  templateUrl: './detail-voucher-available.component.html',
  styleUrl: './detail-voucher-available.component.scss',
})
export class DetailVoucherAvailableComponent implements OnInit {
  nzModalData: any = inject(NZ_MODAL_DATA);
  DISCOUNT_TYPE = DISCOUNT_TYPE;
  voucherDetail?: VoucherDetailOutputDto;

  convertTypeDiscount(discountType: DISCOUNT_TYPE){
    return convertDiscountType(discountType)
  }
  
  constructor() {}

  ngOnInit(): void {
    this.voucherDetail = this.nzModalData.voucherDetail;
  }
}
