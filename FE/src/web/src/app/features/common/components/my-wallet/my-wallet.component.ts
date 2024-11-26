import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../../services/user-profile.service';
import { rechargeMoney } from '../../../../interfaces/payment.interface';
import { PaymentService } from '../../../../services/payment.service';
import { UserService } from '../../../../services/user.service';
import { ProfileResultService } from '../../../../interfaces/user.interface';

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
    private userService: UserService,
  ) {
  }
  ngOnInit(): void {
    const id = this.userProfileService.UserId;
    this.userService.viewProfile(id).subscribe({
      next: (res: ProfileResultService) => {
        this.balance = res.data.balance;
      },
      error: () => {
      }
    });
    
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
}
