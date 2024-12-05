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
  currentFormatter: (value: number) => string = this.formatterPercent;
  currentParser: (value: string) => string = this.parserPercent;
  currentMin: number = 0;
  currentMax: number = 100;
  currentStep: number = 100;
  constructor(private voucherService: VoucherService, private messageService: MessageResponseService,) {}
  
  ngOnInit() {
    if (this.voucher) {
      this.initForm(this.voucher);
    } else {
      this.initForm({
        shopId: '',
        code: '',
        description: '',
        discountType: DISCOUNT_TYPE.PERCENTAGE,
        discountValue: 0,
        minimumSpend: 0,
        maximumDiscount: 0,
        startDate: '',
        expiryDate: '',
        usageLimit: 0
      });
    }
    this.labelButton = this.voucher ? 'Cập Nhật' : 'Tạo Mới';
    this.handleDiscountTypeChange(this.formVoucher.get('discountType')?.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['voucher'] && changes['voucher'].currentValue) {
      this.initForm(this.voucher!);
      this.labelButton = 'Cập Nhật';
    } else if (!changes['voucher'].currentValue) {
      this.labelButton = 'Tạo Mới';
    }
    if (changes['voucher']?.currentValue?.discountType !== undefined) {
      this.handleDiscountTypeChange(this.voucher?.discountType || DISCOUNT_TYPE.PERCENTAGE);  // Kiểm tra lại khi voucher thay đổi
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
      maximumDiscount: new FormControl(voucher.maximumDiscount || 0),
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
      discountType: DISCOUNT_TYPE.PERCENTAGE,
      discountValue: 0,
      minimumSpend: 0,
      maximumDiscount: 0,
      startDate: '',
      expiryDate: '',
      usageLimit: 0,
    });
    this.labelButton = 'Tạo Mới';
    this.voucher = undefined;
  }

  // Phương thức xử lý disable/enable maximumDiscount
  handleDiscountTypeChange(discountType: number) {
    const maximumDiscountControl = this.formVoucher.get('maximumDiscount');
    const discountValueControl = this.formVoucher.get('discountValue');

    if (discountType === DISCOUNT_TYPE.FIXED_AMOUNT) {
      maximumDiscountControl?.disable();
      this.currentFormatter = this.formatterVND;
      this.currentParser = this.parserVND;
      this.currentMin = 0;
      this.currentMax = undefined as any;
      this.currentStep = 2000;
    } else {
      maximumDiscountControl?.enable();
      this.currentFormatter = this.formatterPercent;
      this.currentParser = this.parserPercent;
      // Set min và max cho discountValue nếu là PERCENTAGE
      this.currentMin = 0;
      this.currentMax = 100;
      this.currentStep = 1;
    }
    // Cập nhật lại giá trị của discountValue
    discountValueControl?.updateValueAndValidity();
  }
}
