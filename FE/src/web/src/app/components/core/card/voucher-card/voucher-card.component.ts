import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VoucherDetailOutputDto, VoucherOutputDto } from '../../../../interfaces/voucher.interface';
import { UserProfileService } from '../../../../services/user-profile.service';

@Component({
  selector: 'app-voucher-card',
  templateUrl: './voucher-card.component.html',
  styleUrl: './voucher-card.component.scss'
})
export class VoucherCardComponent implements OnInit {
   @Input() voucher!: VoucherOutputDto | VoucherDetailOutputDto;
   @Input() isShop: boolean = false;
   shopId?: string;
   @Output() saveVoucher = new EventEmitter<string>();  
   constructor(
    private userProfileService: UserProfileService, 

  ) {
  }
  ngOnInit(): void{
    this.shopId = this.userProfileService.rentalshopId;
  }
   onSaveVoucher(){
    if ('id' in this.voucher && this.voucher.id) { // Kiểm tra thuộc tính 'id'
      this.saveVoucher.emit(this.voucher.id);
    } else {
      console.error('Voucher ID is missing or invalid');
    }
   }
}
