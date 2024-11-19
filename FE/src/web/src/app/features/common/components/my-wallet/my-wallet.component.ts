import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrl: './my-wallet.component.scss'
})
export class MyWalletComponent implements OnInit {
  isShow: boolean = false;
  ngOnInit(): void {
    this.isShow = false;
  }
  toggleShow(): void {
    this.isShow = !this.isShow;
  }
}
