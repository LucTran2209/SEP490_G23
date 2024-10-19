import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInputDto } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent{
  dateFormat = 'dd/MM/yyyy';
  userForm: FormGroup;
  @Input() user: UserInputDto = {
    userName: '',
    password: '123456789',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    gender: true, 
    dateOfBirth: '',
    introduction: '',
    avatarPersonal: '',
    isActive: true,
    refreshToken: '',
  };
  showAlert: boolean = false;  // To control the visibility of the alert
  alertMessage: string = '';    // To hold the alert message
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Output() saveUser = new EventEmitter<UserInputDto>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UserService) {
    this.userForm = new FormGroup({
      userName: new FormControl(this.user.userName, [Validators.required]),
      password: new FormControl('123456789'), 
      fullName: new FormControl(this.user.fullName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.user.phoneNumber, [Validators.required]),
      address: new FormControl(this.user.address, [Validators.required]),
      gender: new FormControl(this.user.gender, [Validators.required]),
      dateOfBirth: new FormControl(this.user.dateOfBirth, [Validators.required]),
      introduction: new FormControl(this.user.introduction, []),
      avatarPersonal: new FormControl('NULL'),
      isActive: new FormControl(true),
      refreshToken: new FormControl('NULL')
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
    // Lắng nghe valueChanges và chuyển Date thành ISO string
    this.userForm.get('dateOfBirth')?.valueChanges.subscribe((value: Date) => {
      if (value) {
        const isoString = value.toISOString(); // Chuyển thành ISO string
        this.userForm.patchValue({ dateOfBirth: isoString }, { emitEvent: false });
      }
    });
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      // Kiểm tra nếu form không hợp lệ
      console.log('Form is invalid');
      return;
    }
    // if (this.userForm.valid) {
    //   this.saveUser.emit(this.user);
    //   console.log('Form submitted successfully', this.user);
    //   this.showAlert = true;  // Show the alert
    //   this.alertMessage = 'Update Profile successfully!';
    //   setTimeout(() => {
    //     this.showAlert = false;
    //   }, 2000);
    // } else {
    //   console.log('Form is invalid');
    //   this.showAlert = true;
    //   this.alertMessage = 'Form is invalid. Please fill out all required fields.';
    //   setTimeout(() => {
    //     this.showAlert = false;
    //   }, 2000);
    // }
    this.saveUser.emit(this.userForm.value);
    this.userForm.reset();
    this.handleOk();
  }
}
