import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { VoucherEditInputDto, VoucherInputDto } from '../../../../interfaces/voucher.interface';
import { VoucherService } from '../../../../services/voucher.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DISCOUNT_TYPE } from '../../../../utils/constant';
import { convertDiscountType } from '../../../../utils/anonymous.helper';
import { expiryDateValidator, startDateBeforeExpiryDateValidator } from '../../../../utils/form-validators';
import { MessageResponseService } from '../../../../services/message-response.service';

@Component({
  selector: 'app-form-voucher',
  templateUrl: './form-voucher.component.html',
  styleUrl: './form-voucher.component.scss'
})
export class FormVoucherComponent {
  formVoucher!: FormGroup;
  @Input() voucher?: VoucherInputDto;
  @Output() saveVoucher = new EventEmitter<VoucherInputDto>();
  @Output() updateVoucher = new EventEmitter<VoucherEditInputDto>();
  labelButton: string = '';
  discountTypeOptions = Object.entries(DISCOUNT_TYPE)
    .filter(([key, value]) => !isNaN(Number(value)))
    .map(([key, value]) => ({ label: convertDiscountType(value as DISCOUNT_TYPE), value }));

  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): string => value.replace(' %', '');
  formatterVND = (value: number | string): string => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
  };
  parserVND = (value: string): string => {
    return value.replace(/[^0-9.]/g, '');
  };
  constructor(private voucherService: VoucherService, private messageService: MessageResponseService,) {}
  
  ngOnInit() {
    if (this.voucher) {
      this.initForm(this.voucher);
    } else {
      this.initForm({
        shopId: '',
        code: '',
        description: '',
        discountType: 0,
        discountValue: 0,
        minimumSpend: 0,
        maximumDiscount: 0,
        startDate: '',
        expiryDate: '',
        usageLimit: 0
      });
    }
    this.labelButton = this.voucher ? 'Cập Nhật' : 'Tạo Mới';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['voucher'] && changes['voucher'].currentValue) {
      this.initForm(this.voucher!);
      this.labelButton = 'Cập Nhật';
    } else if (!changes['voucher'].currentValue) {
      this.labelButton = 'Tạo Mới';
    }
  }

  // Phương thức khởi tạo form
  private initForm(voucher: VoucherInputDto) {
    this.formVoucher = new FormGroup({
      code: new FormControl(voucher.code || '', [Validators.required]),
      description: new FormControl(voucher.description || '', [Validators.required]),
      discountType: new FormControl(voucher.discountType || 0, [Validators.required]),
      discountValue: new FormControl(voucher.discountValue || 0, [Validators.required]),
      minimumSpend: new FormControl(voucher.minimumSpend || 0, [Validators.required]),
      maximumDiscount: new FormControl(voucher.maximumDiscount || 0, [Validators.required]),
      startDate: new FormControl(voucher.startDate || '', [Validators.required]),
      expiryDate: new FormControl(voucher.expiryDate || '', [Validators.required, expiryDateValidator()]),
      usageLimit: new FormControl(voucher.usageLimit || 0, [Validators.required]),
    }, { validators: startDateBeforeExpiryDateValidator() });
  }

  onSubmit() {
    if (this.formVoucher.valid) {

  
      // Nếu voucher đã có, bạn có thể update nó, nếu chưa, bạn tạo mới
      if (this.voucher) {
        const formData: VoucherEditInputDto = this.formVoucher.value;
        this.updateVoucher.emit({ ...this.voucher, ...formData });
        this.resetForm();
      } else {
        const formData: VoucherInputDto = this.formVoucher.value;
        console.log('Form data:', formData);
        this.saveVoucher.emit(formData); // Tạo mới voucher nếu không có
        this.resetForm();
      }
    } else {
      this.messageService.handleError('Vui Lòng Điền Đầy Đủ Thông Tin!');
      this.formVoucher.markAllAsTouched(); // Đánh dấu tất cả các trường đã được kiểm tra
    }
  }

  resetForm() {
    this.formVoucher.reset({
      code: '',
      description: '',
      discountType: 0,
      discountValue: 0,
      minimumSpend: 0,
      maximumDiscount: 0,
      startDate: '',
      expiryDate: '',
      usageLimit: 0,
    });
    this.labelButton = 'Tạo Mới';
  }
}
