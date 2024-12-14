import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import {
  VoucherDetailOutputDto,
  VoucherDetailResultService,
} from '../../../../interfaces/voucher.interface';
import { LoadingService } from '../../../../services/loading.service';
import { VoucherService } from '../../../../services/voucher.service';

@Component({
  selector: 'app-my-voucher',
  templateUrl: './my-voucher.component.html',
  styleUrl: './my-voucher.component.scss',
})
export class MyVoucherComponent implements OnInit {
  searchText: string = '';
  vouchers!: VoucherDetailOutputDto[];
  loading$?: Observable<StatusProcess>;
  constructor(
    private voucherService: VoucherService,
    private loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.status$;
  }
  ngOnInit(): void {
    this.loadingService.setLoading();
    this.voucherService
      .myVoucher()
      .subscribe((res: VoucherDetailResultService) => {
        this.vouchers = res.data;
        this.loadingService.setOtherLoading('loaded');
      });
  }
  onSearch() {}
}
