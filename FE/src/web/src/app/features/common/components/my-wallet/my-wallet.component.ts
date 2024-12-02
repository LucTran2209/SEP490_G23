import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../../services/user-profile.service';
import { RechargeHistoryResponse, rechargeMoney, RechargeHistoryData } from '../../../../interfaces/payment.interface';
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
  isShowHistory: boolean = false;
  isRecharge: boolean = false;
  balance: number = 0;
  data: RechargeHistoryData[] = [];
  dataNull= true;
  dateRange: Date[] = [];
  constructor(
    private userProfileService: UserProfileService, 
    private paymentService: PaymentService,
    private userService: UserService,
    private cdRef: ChangeDetectorRef,
  ) {
  }
  ngOnInit(): void {
    this.loadBalance();
    this.isShow = false;
    this.loadListHistory();
  }

  // Fetch the current balance and update the component state
  private loadBalance(): void {
    const id = this.userProfileService.UserId ?? '';
    this.userService.viewProfile(id).subscribe({
      next: (res: ProfileResultService) => {
        this.balance = res.data.balance;
      },
      error: () => {
        console.error('Error fetching user balance');
      }
    });
  }
  toggleShow(): void {
    this.isShow = !this.isShow;
  }
  toggleRecharge(): void {
    this.isRecharge = !this.isRecharge;
    this.isShowHistory = false;
  }
  toggleHistory(): void {
    this.isShowHistory = !this.isShowHistory;
    this.isRecharge = false;
  }
  rechargeMoney(data: rechargeMoney) {
    this.paymentService.rechargeMoney(data).subscribe((res) =>{
      window.location.href = res.data;
      this.cdRef.markForCheck();
    });
  }
  loadListHistory(from?: string, to?: string){
    this.paymentService.rechargeHistory(from, to).subscribe((res: RechargeHistoryResponse) => {
      this.data = res.data;
      this.cdRef.markForCheck();
      console.log(this.data);
      this.dataNull = !this.data || this.data.length === 0;
    });
  }
    onDateRangeChange(result: Date[]): void {
    this.dateRange = result;

    // Kiểm tra nếu cả hai ngày được chọn thì tự động gọi API
      this.search();

  }
  search(): void {
    if (this.dateRange.length === 2) {
      const from = this.formatDate(this.dateRange[0]);
      const to = this.formatDate(this.dateRange[1]);
      this.loadListHistory(from, to);
    }else{
      this.loadListHistory();
    }
  }

  private formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  }
}
