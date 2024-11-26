import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VoucherDetailOutputDto, VoucherOutputDto } from '../../../../interfaces/voucher.interface';

@Component({
  selector: 'app-voucher-card',
  templateUrl: './voucher-card.component.html',
  styleUrl: './voucher-card.component.scss'
})
export class VoucherCardComponent {
   @Input() voucher!: VoucherOutputDto | VoucherDetailOutputDto;
   @Input() isShop: boolean = false;
   @Output() saveVoucher = new EventEmitter<string>();  
   
   onSaveVoucher(){
    if ('id' in this.voucher && this.voucher.id) { // Kiểm tra thuộc tính 'id'
      this.saveVoucher.emit(this.voucher.id);
    } else {
      console.error('Voucher ID is missing or invalid');
    }
   }
}
