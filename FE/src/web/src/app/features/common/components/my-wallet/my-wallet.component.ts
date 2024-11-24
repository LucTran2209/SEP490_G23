import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../../services/user-profile.service';
import { rechargeMoney } from '../../../../interfaces/payment.interface';
import { PaymentService } from '../../../../services/payment.service';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrl: './my-wallet.component.scss'
})
export class MyWalletComponent implements OnInit {
  isShow: boolean = false;
  isRecharge: boolean = false;
  balance: number = 0;
  constructor(
    private userProfileService: UserProfileService, 
    private paymentService: PaymentService,
  ) {
  }
  ngOnInit(): void {
    this.balance = Math.floor(this.userProfileService.currentUser.Balance);
    this.isShow = false;
  }
  toggleShow(): void {
    this.isShow = !this.isShow;
  }
  toggleRecharge(): void {
    this.isRecharge = !this.isRecharge;
  }
  rechargeMoney(data: rechargeMoney) {
    this.paymentService.rechargeMoney(data).subscribe((res) =>{
      window.location.href = res.data;
    });
  }
  get formattedBalance(): string {
    return new Intl.NumberFormat('vi-VN', {  currency: 'VND' }).format(this.balance);
  }
}
