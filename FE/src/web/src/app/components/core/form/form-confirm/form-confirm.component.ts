import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderStatus } from '../../../../interfaces/order.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageResponseService } from '../../../../services/message-response.service';

@Component({
  selector: 'app-form-confirm',
  templateUrl: './form-confirm.component.html',
  styleUrl: './form-confirm.component.scss'
})
export class FormConfirmComponent {
  formConfirm!: FormGroup;
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() isReturn: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveForm = new EventEmitter<OrderStatus>();
  uploadedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  handleOk(): void {
    this.isVisible = false;
    this.closeModal.emit();
    this.resetForm();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
    this.resetForm();
  }
  constructor(private messageService: MessageResponseService, private cdRef: ChangeDetectorRef) {}
  private initForm() {
    this.formConfirm = new FormGroup({
      message: new FormControl(''),
    });
  }

  // Initialize the form and handle visibility changes
  ngOnInit() {
    this.initForm();
  }

  // Handles form submission
  onSubmit() {
    if (this.formConfirm.invalid) {
      return; // Ngăn chặn submit nếu form không hợp lệ
    }

    const formValue = this.formConfirm.value;

    // Gắn file vào dữ liệu form nếu có file đã chọn
    const orderStatus: any = {
      message: formValue.message,
      fileAttach: this.uploadedFile, // Thêm file đính kèm vào dữ liệu gửi đi
    };

    // Emit dữ liệu form
    // this.saveForm.emit(formValue);
    this.saveForm.emit(orderStatus);
    this.resetForm();
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target?.result ?? null;
        this.cdRef.detectChanges();
      };
      reader.readAsDataURL(this.uploadedFile);
    }
  }

  // Reset form
  resetForm(): void {
    this.formConfirm.reset({
      message: '',
    });
    this.uploadedFile = null;
    this.previewImage = null;
  }
}
