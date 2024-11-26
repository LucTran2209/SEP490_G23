import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { AddressService } from '../../../services/address.service';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzAutocompleteOptionComponent } from 'ng-zorro-antd/auto-complete';

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrl: './input-address.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAddressComponent),
      multi: true,
    },
  ],
})
export class InputAddressComponent implements OnInit, ControlValueAccessor {
  @Input() value: string = ''; // Giá trị hiện tại của input
  @Output() valueChange = new EventEmitter<string>(); // Bắn sự kiện khi giá trị thay đổi
  options: string[] = []; // Danh sách gợi ý địa chỉ

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {}

  // Hàm xử lý khi người dùng nhập vào ô input
  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
  
    this.addressService.getAddress(inputValue).subscribe(
      (data) => {
        this.options = data.predictions.map((item: any) => item.description);
        console.log('Options:', this.options); // Log để kiểm tra
      },
      (error) => {
        console.error('Error:', error);
        this.options = [];
      }
    );
  }

  // Xử lý khi người dùng chọn một gợi ý từ autocomplete
  onSelectionChange(option: NzAutocompleteOptionComponent): void {
    const selectedValue = option.nzValue || ''; // Lấy giá trị từ option
    this.value = selectedValue;
    this.onChange(selectedValue);
    this.valueChange.emit(selectedValue);
  }

  // ControlValueAccessor - Ghi giá trị từ FormControl vào component
  writeValue(value: string): void {
    this.value = value || '';
  }

  // ControlValueAccessor - Đăng ký hàm callback khi giá trị thay đổi
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // ControlValueAccessor - Đăng ký hàm callback khi component bị "touched"
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
