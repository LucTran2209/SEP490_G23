import { Component, OnInit } from '@angular/core';
import { VoucherDetailOutputDto, VoucherDetailResultService } from '../../../../interfaces/voucher.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { VoucherService } from '../../../../services/voucher.service';
import { MessageResponseService } from '../../../../services/message-response.service';
import { LoadingService } from '../../../../services/loading.service';
import { Observable } from 'rxjs';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';

@Component({
  selector: 'app-my-voucher',
  templateUrl: './my-voucher.component.html',
  styleUrl: './my-voucher.component.scss'
})
export class MyVoucherComponent implements OnInit {
  searchText: string = '';
  vouchers!: VoucherDetailOutputDto[];
  loading$?: Observable<StatusProcess>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private voucherService: VoucherService,
    private messageService: MessageResponseService,
    private loadingService: LoadingService,
  ) {
    this.loading$ = this.loadingService.status$;
  }
  ngOnInit(): void{
    this.loadingService.setLoading();
    this.voucherService.myVoucher().subscribe((res: VoucherDetailResultService) => {
      this.vouchers = res.data;
      console.log(res.data);
      this.loadingService.setOtherLoading('loaded');
    });
  }
  onSearch(){

  }
}
