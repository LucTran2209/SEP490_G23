import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { ORDER_STATUS } from '../../../../utils/constant';
import { convertStatusOrder } from '../../../../utils/anonymous.helper';
import { map, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';

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
      value: ORDER_STATUS.REFUND,
      label: convertStatusOrder(ORDER_STATUS.REFUND),
    },
    {
      value: ORDER_STATUS.DEPOSIT_REFUND,
      label: convertStatusOrder(ORDER_STATUS.DEPOSIT_REFUND),
    },
    {
      value: ORDER_STATUS.PAYMENTED,
      label: convertStatusOrder(ORDER_STATUS.PAYMENTED),
    },
    {
      value: ORDER_STATUS.COMPLETE,
      label: convertStatusOrder(ORDER_STATUS.COMPLETE),
    },
    {
      value: ORDER_STATUS.CANCEL,
      label: convertStatusOrder(ORDER_STATUS.CANCEL),
    },
  ];

  
  filterFormOrder: FormGroup<{
    orderCode: FormControl<string | null>;
    orderStatus: FormControl<string | null>;
    humanRental: FormControl<string | null>;
    phoneNumber: FormControl<string | null>;
    timeRange: FormControl<Date[] | null>;
  }>;
  @Output() formValueFilter = new EventEmitter();
  @Output() resetLoad = new EventEmitter();
  onSubmit() {
    console.log('>>>> line 53', this.filterFormOrder.get("timeRange")?.value);
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

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.filterFormOrder = this.formBuilder.group({
      orderCode: new FormControl<string | null>(null),
      orderStatus: new FormControl<string | null>(null),
      humanRental: new FormControl<string | null>(null),
      phoneNumber: new FormControl<string | null>(null),
      timeRange: new FormControl<Date[] | null>(null),
    }) as FormGroup<{
      orderCode: FormControl<string | null>;
      orderStatus: FormControl<string | null>;
      humanRental: FormControl<string | null>;
      phoneNumber: FormControl<string | null>;
      timeRange: FormControl<Date[] | null>;
    }>;
  }

  ngOnInit(): void {
    this.filterFormOrder.get("timeRange")?.valueChanges.pipe(
      map(res => {
        if (res && res.length === 2) {
          const startDate = new Date(res[0]);
          const endDate = new Date(res[1]);
  
          startDate.setHours(0, 0, 0, 0);
  
          endDate.setHours(23, 0, 0, 0);
  
          const formattedDates = [startDate, endDate];
  
          this.filterFormOrder.get("timeRange")?.setValue(formattedDates, { emitEvent: false });
        }
      })
    ).subscribe();
  }
  
}
