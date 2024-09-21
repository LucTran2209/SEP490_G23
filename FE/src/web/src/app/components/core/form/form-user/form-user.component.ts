import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {
  dateFormat = 'dd/MM/yyyy';
  user = {
    userName: 'nguyenvana',
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phoneNumber: '0123456789',
    address: '123 Đường ABC, Thành phố XYZ',
    gender: true,
    dateOfBirth: '01/01/2000'
  };
  showAlert: boolean = false;  // To control the visibility of the alert
  alertMessage: string = '';    // To hold the alert message
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Output() saveUser = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  handleOk(): void {
    this.isVisible = false;
    this.closeModal.emit();

  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }
  submitForm(){
    if (this.isFormValid()) {
      console.log('Form submitted successfully', this.user);
      this.showAlert = true;  // Show the alert
      this.alertMessage = 'Update Profile successfully!';
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    } else {
      console.log('Form is invalid');
      this.showAlert = false;  // Hide the alert
      this.alertMessage = 'Form is invalid. Please fill out all required fields.';
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    }
  }
  isFormValid(): boolean {
    return (
      !!this.user.userName &&
      !!this.user.fullName &&
      !!this.user.email &&
      !!this.user.phoneNumber &&
      !!this.user.address &&
      !!this.user.gender &&
      !!this.user.dateOfBirth
    );
  }
}
