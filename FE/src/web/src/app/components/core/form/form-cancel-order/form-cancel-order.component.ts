import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderStatus } from '../../../../interfaces/order.interface';
import { MessageResponseService } from '../../../../services/message-response.service';

@Component({
  selector: 'app-form-cancel-order',
  templateUrl: './form-cancel-order.component.html',
  styleUrl: './form-cancel-order.component.scss'
})
export class FormCancelOrderComponent implements OnInit {
  formCancelOrder!: FormGroup;
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
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
    this.formCancelOrder = new FormGroup({
      message: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.initForm(); // Không cần truyền tham số
  }
  onSubmit(){
    if (this.formCancelOrder.valid) {
      const formValue = this.formCancelOrder.value;
      // console.log('Submitted Value:', formValue);
      this.saveForm.emit(formValue);
    } else {
      this.messageService.handleError('Vui lòng nhập lý do hủy đơn!');
    }
  }
  setMessage(value: string) {
    this.formCancelOrder.get('message')?.setValue(value);
  }
  resetForm(): void {
    this.formCancelOrder.reset({
      message: '',
    });
  }
}
