import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderStatus } from '../../../../interfaces/order.interface';
import { FormControl, FormGroup } from '@angular/forms';
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
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveForm = new EventEmitter<OrderStatus>();
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
  constructor(private messageService: MessageResponseService) {}
  private initForm() {
    this.formConfirm = new FormGroup({
      message: new FormControl(''),
    });
  }
  ngOnInit() {
    this.initForm(); // Không cần truyền tham số
  }
  onSubmit(){
      const formValue = this.formConfirm.value;
      this.saveForm.emit(formValue);
  }
  resetForm(): void {
    this.formConfirm.reset({
      message: '',
    });
  }
}
