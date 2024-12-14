import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzAutocompleteOptionComponent } from 'ng-zorro-antd/auto-complete';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { AddressService } from '../../../services/address.service';
export interface OptionAddress {
  desc: string;
  placeId: string;
}
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
  @Input() value?: string;
  @Output() valueChange = new EventEmitter<OptionAddress>();
  options: OptionAddress[] = [];

  private onChange: (value: string) => void = () => {
  };
  private onTouched: () => void = () => {};
  private inputSubject = new Subject<string>();
  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    // Lắng nghe sự thay đổi input
    this.inputSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) =>
        this.addressService.getAddress(value).pipe(
          map((data) =>
            data.predictions.map((item: any) => ({
              desc: item.description,
              placeId: item.place_id,
            }))
          ),
          catchError(() => of([]))
        )
      ),
      // tap((options) => console.log('Fetched options:', options))
    ).subscribe((options) => {
      this.options = options;
    });
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);

    this.inputSubject.next(inputValue);
  }

  onSelectionChange(option: NzAutocompleteOptionComponent): void {
    const selectedValue = option.nzValue;
    this.value = selectedValue.desc;
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
