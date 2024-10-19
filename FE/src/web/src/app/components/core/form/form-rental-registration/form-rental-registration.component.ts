import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-rental-registration',
  templateUrl: './form-rental-registration.component.html',
  styleUrl: './form-rental-registration.component.scss'
})
export class FormRentalRegistrationComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  image: string = 'https://cdn.tgdd.vn/Files/2014/12/06/586947/y-nghia-cua-toc-do-quay-vat-tren-may-giat-6.jpg';

  handleOk(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }
  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }
  editInformation(){
    this.handleOk();
    this.edit.emit();
  }
  confirmInformation(){
    this.handleOk();
    this.confirm.emit();
  }
  
}
