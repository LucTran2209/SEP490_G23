import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeactiveShop } from '../../../interfaces/rental-shop.interface';
import { MessageResponseService } from '../../../services/message-response.service';

@Component({
  selector: 'app-form-deactive-shop',
  templateUrl: './form-deactive-shop.component.html',
  styleUrl: './form-deactive-shop.component.scss'
})
export class FormDeactiveShopComponent {
  formDeactive!: FormGroup;
  @Input() DeactiveShop!: DeactiveShop;
  radioValue: string = ''; // Giá trị được chọn từ radio button
  otherReason: string = ''; // Giá trị nhập từ input
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveShop = new EventEmitter<DeactiveShop>();
  adminNoteTypeOptions: string[] = [
    'Bị Đánh Giá Thấp Nhiều',
    'Bị Khiếu Nại Nhiều',
    'Vi Phạm Quy Tắc Cộng Đồng',
    'Không Hoạt Động Trong Thời Gian Dài',
  ];
  constructor(private fb: FormBuilder, private messageService: MessageResponseService) {
    this.formDeactive = this.fb.group({
      adminNote: [null, [Validators.required]],
      otherReason: [{ value: '', disabled: true }]
    });
  }
  onRadioChange(value: string): void {
    const otherReasonControl = this.formDeactive.get('otherReason');
    if (value === 'other') {
      otherReasonControl?.enable(); // Kích hoạt input nếu chọn "Lý do khác"
    } else {
      otherReasonControl?.disable(); // Vô hiệu hóa nếu không chọn "Lý do khác"
      otherReasonControl?.setValue(''); // Reset giá trị
    }
  }
 

  handleOk(): void {
    this.isVisible = false;
    this.resetForm();
    this.closeModal.emit();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.resetForm();
    this.closeModal.emit();
  }
  CancelForm(){
    this.isVisible = false;
    this.resetForm();
    this.closeModal.emit();
    this.messageService.showInfo('Bạn Đã Hủy! Không Xóa Cửa Hàng!');
  }
  onSubmit(): void {
    if (this.formDeactive.valid) {
      const adminNote = this.formDeactive.value.adminNote;
      const otherReason = this.formDeactive.value.otherReason;
      // Nếu chọn "Lý do khác", gán giá trị của otherReason vào adminNote
      const finalAdminNote = adminNote === 'other' ? otherReason : adminNote;

      const formData: DeactiveShop = {
        id: '',
        isActive: true,
        adminNote: finalAdminNote
      };
      this.saveShop.emit(formData);

      console.log('Form data:', formData);
      this.resetForm();
    }else{
      this.messageService.handleError('Vui Lòng Chọn Lý Do Xóa Shop!');
    }
  }
  resetForm() {
    this.formDeactive.reset({
      adminNote: null,
      otherReason: '',
    });
  }
}
