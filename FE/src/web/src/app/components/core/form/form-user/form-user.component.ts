import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInputDto } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {
  dateFormat = 'dd/MM/yyyy';
  // user = {
  //   userName: 'nguyenvana',
  //   fullName: 'Nguyễn Văn A',
  //   email: 'nguyenvana@example.com',
  //   phoneNumber: '0123456789',
  //   address: '123 Đường ABC, Thành phố XYZ',
  //   gender: true,
  //   dateOfBirth: '01/01/2000'
  // };
  userForm: FormGroup;
  @Input() user: UserInputDto = {
    userName: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    gender: true,   // Assuming gender is a boolean
    dateOfBirth: ''
  };
  showAlert: boolean = false;  // To control the visibility of the alert
  alertMessage: string = '';    // To hold the alert message
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Output() saveUser = new EventEmitter<UserInputDto>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.userForm = new FormGroup({
      userName: new FormControl(this.user.userName, [Validators.required]),
      fullName: new FormControl(this.user.fullName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.user.phoneNumber, [Validators.required]),
      address: new FormControl(this.user.address, [Validators.required]),
      gender: new FormControl(this.user.gender, [Validators.required]),
      dateOfBirth: new FormControl(this.user.dateOfBirth, [Validators.required]),
    });
  }
  handleOk(): void {
    this.isVisible = false;
    this.closeModal.emit();
    this.userForm.reset();

  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
    this.userForm.reset();
  }
  
  submitForm(){
    if (this.userForm.valid) {
      this.saveUser.emit(this.user);
      console.log('Form submitted successfully', this.user);
      this.showAlert = true;  // Show the alert
      this.alertMessage = 'Update Profile successfully!';
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    } else {
      console.log('Form is invalid');
      this.showAlert = true;
      this.alertMessage = 'Form is invalid. Please fill out all required fields.';
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    }
  }

  // isFormValid(): boolean {
  //   return (
  //     !!this.user.userName &&
  //     !!this.user.fullName &&
  //     !!this.user.email &&
  //     !!this.user.phoneNumber &&
  //     !!this.user.address &&
  //     !!this.user.gender &&
  //     !!this.user.dateOfBirth
  //   );
  // }
}
