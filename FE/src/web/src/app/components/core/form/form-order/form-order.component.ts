import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { ORDER_STATUS } from '../../../../utils/constant';
import { convertStatusOrder } from '../../../../utils/anonymous.helper';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.scss',
})
export class FormOrderComponent implements OnInit {
  optionOrderStatus: OptionSelect[] = [
    {
      value: ORDER_STATUS.PENDING_APPROVAL,
      label: convertStatusOrder(ORDER_STATUS.PENDING_APPROVAL),
    },
    {
      value: ORDER_STATUS.PENDING_DELIVERY,
      label: convertStatusOrder(ORDER_STATUS.PENDING_DELIVERY),
    },
    {
      value: ORDER_STATUS.PENDING_PAYMENT,
      label: convertStatusOrder(ORDER_STATUS.PENDING_PAYMENT),
    },
    {
      value: ORDER_STATUS.RECEIVED,
      label: convertStatusOrder(ORDER_STATUS.RECEIVED),
    },
    {
      value: ORDER_STATUS.REFUND,
      label: convertStatusOrder(ORDER_STATUS.REFUND),
    },
    {
      value: ORDER_STATUS.DEPOSIT_REFUND,
      label: convertStatusOrder(ORDER_STATUS.DEPOSIT_REFUND),
    },
  ];

  
  filterFormOrder: FormGroup<{
    orderCode: FormControl<string | null>;
    orderStatus: FormControl<string | null>;
    humanRental: FormControl<string | null>;
    phoneNumber: FormControl<string | null>;
    timeRange: FormControl<string[] | null>;
  }>;

  @Output() formValueFilter = new EventEmitter();
  @Output() resetLoad = new EventEmitter();
  onSubmit() {
    this.formValueFilter.emit(this.filterFormOrder.value);
  }
  resetForm(): void {
    this.filterFormOrder.reset({
      orderCode: '',
      orderStatus: '',
      humanRental: '',
      phoneNumber: '',
      timeRange: [],
    });
    this.resetLoad.emit();
  }

  constructor(private formBuilder: FormBuilder) {
    this.filterFormOrder = this.formBuilder.group({
      orderCode: new FormControl<string | null>(null),
      orderStatus: new FormControl<string | null>(null),
      humanRental: new FormControl<string | null>(null),
      phoneNumber: new FormControl<string | null>(null),
      timeRange: new FormControl<string[] | null>(null),
    }) as FormGroup<{
      orderCode: FormControl<string | null>;
      orderStatus: FormControl<string | null>;
      humanRental: FormControl<string | null>;
      phoneNumber: FormControl<string | null>;
      timeRange: FormControl<string[] | null>;
    }>;
  }

  ngOnInit(): void {}
}
