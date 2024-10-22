import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInputDto, UserUpdateInputDto } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/user.service';
import { ageValidator } from '../../../../utils/form-validators';

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
  @Input() userUpdate!: UserUpdateInputDto;
  @Input() showAlert: boolean = false;
  @Input() alertMessage: string = ''; 
  @Input() alertType: 'success' | 'error' = 'success';
  @Input() isVisible: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() title: string = '';
  @Output() saveUser = new EventEmitter<UserInputDto>();
  @Output() updateUser = new EventEmitter<UserUpdateInputDto>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UserService) {
    this.userForm = new FormGroup({
      fullName: new FormControl(this.user.fullName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.user.phoneNumber, [Validators.required, Validators.pattern('^0[0-9]{9}$')]),
      address: new FormControl(this.user.address, [Validators.required]),
      gender: new FormControl(this.user.gender, [Validators.required]),
      dateOfBirth: new FormControl(this.user.dateOfBirth, [Validators.required, ageValidator()]),
    });

    if (!this.isEditMode) {
      // Add these controls only in create mode
      this.userForm.addControl('userName', new FormControl(this.user.userName, [Validators.required]));
      this.userForm.addControl('password', new FormControl('123456789'));
      this.userForm.addControl('introduction', new FormControl(this.user.introduction, []));
      this.userForm.addControl('avatarPersonal', new FormControl(''));
      this.userForm.addControl('isActive', new FormControl(true));
      this.userForm.addControl('refreshToken', new FormControl(''));
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userUpdate'] && this.userUpdate) {
      this.populateForm();
    }
  }

  populateForm(): void {
    this.userForm.patchValue({
      fullName: this.userUpdate.fullName,
      email: this.userUpdate.email,
      phoneNumber: this.userUpdate.phoneNumber,
      address: this.userUpdate.address,
      gender: this.userUpdate.gender,
      dateOfBirth: this.userUpdate.dateOfBirth,
    });
    if (this.isEditMode) {
      this.userForm.removeControl('userName');
    }
  }

  handleOk(): void {
    this.isVisible = false;
    this.closeModal.emit();
    this.userForm.reset({
      password: '123456789',
      isActive: true,
    });

  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
    this.userForm.reset({
      password: '123456789',
      isActive: true,
    });
  }
  
  submitForm(){
    // Lắng nghe valueChanges và chuyển Date thành ISO string
    this.userForm.get('dateOfBirth')?.valueChanges.subscribe((value: Date) => {
      if (value) {
        const isoString = value.toISOString(); // Chuyển thành ISO string
        this.userForm.patchValue({ dateOfBirth: isoString }, { emitEvent: false });
      }
    });
    const formValue = this.userForm.value;

    if (this.userForm.invalid) {
      this.alertMessage = 'Thất Bại! Vui Lòng Điền Đúng Thông Tin';
      this.showAlert = true;
      this.alertType = 'error';
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
      return;
    }
  if (this.isEditMode) {
    // update value
    const updatedData: UserUpdateInputDto = {
      id: this.userUpdate.id,
      fullName: formValue.fullName,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      address: formValue.address,
      gender: formValue.gender,
      dateOfBirth: formValue.dateOfBirth,
    };
    
    this.updateUser.emit(updatedData);
  } else {
    // create value
    const userData: UserInputDto = {
      ...formValue,
      userName: formValue.userName,
      password: formValue.password,
      introduction: formValue.introduction,
      avatarPersonal: formValue.avatarPersonal,
      isActive: formValue.isActive,
      refreshToken: formValue.refreshToken,
    };
    
    this.saveUser.emit(userData);
  }
    
  }
}
