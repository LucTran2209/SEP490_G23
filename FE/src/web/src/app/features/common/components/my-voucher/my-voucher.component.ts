import { Component, OnInit } from '@angular/core';
import { VoucherOutputDto } from '../../../../interfaces/voucher.interface';

@Component({
  selector: 'app-my-voucher',
  templateUrl: './my-voucher.component.html',
  styleUrl: './my-voucher.component.scss'
})
export class MyVoucherComponent implements OnInit {
  searchText: string = '';
  vouchers!: VoucherOutputDto[];
  ngOnInit(): void{

  }
  onSearch(){

  }
}
