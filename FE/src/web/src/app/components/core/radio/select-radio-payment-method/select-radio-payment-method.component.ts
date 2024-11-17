import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionRadio } from '../../../../configs/anonymous.config';

@Component({
  selector: 'app-select-radio-payment-method',
  templateUrl: './select-radio-payment-method.component.html',
  styleUrl: './select-radio-payment-method.component.scss'
})

export class SelectRadioPaymentMethodComponent {
  @Input() options?: OptionRadio[] = mockRadioOption;
  @Input() selectedValue: string = '1';
  @Output() selectionChange = new EventEmitter<string>();

  onValueChange(value: string): void {
    this.selectionChange.emit(value);
  }

}

const mockRadioOption: OptionRadio[] = [
  {
    label: "Thanh toán 1 lần",
    value: "0",
    icon: "credit-card"
  },
  {
    label: "Thanh toán cọc trước",
    value: "1",
    icon: "pound-circle"
  }
]
