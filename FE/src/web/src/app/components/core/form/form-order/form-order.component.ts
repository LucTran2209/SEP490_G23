import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.scss',
})
export class FormOrderComponent implements OnInit {
  filterFormOrder: FormGroup<{
    orderCode: FormControl<string | null>;
    orderStatus: FormControl<string | null>;
    humanRental: FormControl<string | null>;
    phoneNumber: FormControl<string | null>;
    timeRange: FormControl<string[] | null>;
  }>;

  onSubmit() {
    console.log('form val:', this.filterFormOrder.value);
  }
  resetForm(): void {
    this.filterFormOrder.reset({
      orderCode: '',
      orderStatus: '',
      humanRental: '',
      phoneNumber: '',
      timeRange: [],
    });
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
