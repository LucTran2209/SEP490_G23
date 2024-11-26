import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VoucherOutputDto } from '../../../../interfaces/voucher.interface';

@Component({
  selector: 'app-voucher-card',
  templateUrl: './voucher-card.component.html',
  styleUrl: './voucher-card.component.scss'
})
export class VoucherCardComponent {
   @Input() voucher!: VoucherOutputDto;
   @Output() saveVoucher = new EventEmitter<string>();  
   
   onSaveVoucher(voucherId: string){
    this.saveVoucher.emit(voucherId);
   }
}
