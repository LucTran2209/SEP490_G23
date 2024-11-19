import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-form-search-voucher',
  templateUrl: './form-search-voucher.component.html',
  styleUrl: './form-search-voucher.component.scss'
})
export class FormSearchVoucherComponent implements OnInit {
  filterFormVoucher: FormGroup<{
    voucherCode: FormControl<string | null>;
    createdDate: FormControl<Date | null>;
    timeRange: FormControl<Date[] | null>;
  }>;
  @Output() formValueFilter = new EventEmitter();
  @Output() resetLoad = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.filterFormVoucher = this.formBuilder.group({
      voucherCode: new FormControl<string | null>(null),
      createdDate: new FormControl<Date | null>(null),
      timeRange: new FormControl<Date[] | null>(null),
    }) as FormGroup<{
      voucherCode: FormControl<string | null>;
      createdDate: FormControl<Date | null>;
      timeRange: FormControl<Date[] | null>;
    }>;
  }
  ngOnInit(): void {
    this.filterFormVoucher.get("timeRange")?.valueChanges.pipe(
      map(res => {
        if (res && res.length === 2) {
          const startDate = new Date(res[0]);
          const endDate = new Date(res[1]);
  
          startDate.setHours(0, 0, 0, 0);
  
          endDate.setHours(23, 0, 0, 0);
  
          const formattedDates = [startDate, endDate];
  
          this.filterFormVoucher.get("timeRange")?.setValue(formattedDates, { emitEvent: false });
        }
      })
    ).subscribe();
  }
  onSubmit() {
    console.log('>>>> line 53', this.filterFormVoucher.get("timeRange")?.value);
    this.formValueFilter.emit(this.filterFormVoucher.value);
  }
  resetForm(): void {
    this.filterFormVoucher.reset({
      voucherCode: '',
      createdDate: null,
      timeRange: [],
    });
    this.resetLoad.emit();
  }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
