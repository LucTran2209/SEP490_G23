import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-voucher',
  templateUrl: './my-voucher.component.html',
  styleUrl: './my-voucher.component.scss'
})
export class MyVoucherComponent implements OnInit {
  searchText: string = '';

  ngOnInit(): void{

  }
  onSearch(){

  }
}
