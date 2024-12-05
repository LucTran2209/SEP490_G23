import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { rechargeMoney } from '../../../../interfaces/payment.interface';
import { MessageResponseService } from '../../../../services/message-response.service';

@Component({
  selector: 'app-form-recharge',
  templateUrl: './form-recharge.component.html',
  styleUrl: './form-recharge.component.scss'
})
export class FormRechargeComponent implements OnInit{
  formRecharge!: FormGroup;
  @Output() saveForm = new EventEmitter<rechargeMoney>();
  formatterVND = (value: number | string): string => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
  };
  parserVND = (value: string): string => {
    return value.replace(/[^0-9.]/g, '');
  };
  // Hàm khởi tạo form
  private initForm() {
    this.formRecharge = new FormGroup({
      amount: new FormControl(0, [Validators.required, Validators.min(10000), Validators.max(14000000)]),
    });
  }
  constructor(private messageService: MessageResponseService) {}

  ngOnInit() {
    this.initForm(); // Không cần truyền tham số
  }

  // Hàm xử lý khi submit form
  onSubmit() {
    if (this.formRecharge.valid) {
      const formValue = this.formRecharge.value;
      console.log('Submitted Value:', formValue);
      this.saveForm.emit(formValue);
    } else {
      this.messageService.handleError('Vui lòng nhập số tiền cần nạp!');
    }
  }
  setAmount(value: number) {
    this.formRecharge.get('amount')?.setValue(value);
  }
}
