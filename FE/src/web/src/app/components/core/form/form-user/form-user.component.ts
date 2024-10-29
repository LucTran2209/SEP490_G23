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
    avatarPersonal: null,
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
      avatarPersonal: new FormControl(this.user.avatarPersonal),
    });

    if (!this.isEditMode) {
      // Add these controls only in create mode
      this.userForm.addControl('userName', new FormControl(this.user.userName, [Validators.required]));
      this.userForm.addControl('password', new FormControl('123456789'));
      this.userForm.addControl('introduction', new FormControl(this.user.introduction, []));
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
    const dateOfBirth = new Date(this.userUpdate.dateOfBirth);
    const isoString = dateOfBirth.toISOString().split('T')[0];
    this.userForm.patchValue({
      fullName: this.userUpdate.fullName,
      email: this.userUpdate.email,
      phoneNumber: this.userUpdate.phoneNumber,
      address: this.userUpdate.address,
      gender: this.userUpdate.gender,
      dateOfBirth: isoString, // or use a format you prefer
      avatarPersonal: this.userUpdate.avatarPersonal,
    });
    
    if (this.isEditMode) {
      this.userForm.removeControl('userName');
      this.userForm.removeControl('password');
      this.userForm.removeControl('isActive');
      this.userForm.removeControl('introduction');
      this.userForm.removeControl('refreshToken');
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
  // onFileChange(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input?.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     this.userForm.patchValue({ avatarPersonal: file });
  //   }
  // }
  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.userForm.patchValue({ avatarPersonal: file }); // Correctly patch the FormControl
    } else {
      this.userForm.patchValue({ avatarPersonal: null }); // Reset if no file is selected
    }
  }
  
  submitForm() {
    // Update dateOfBirth to ISO string format
    const dateOfBirthControl = this.userForm.get('dateOfBirth');
    if (dateOfBirthControl?.value) {
      const isoString = new Date(dateOfBirthControl.value).toISOString();
      dateOfBirthControl.setValue(isoString, { emitEvent: false });
    }
  
    if (this.userForm.invalid) {
      this.alertMessage = 'Thất Bại! Vui Lòng Điền Đúng Thông Tin';
      this.showAlert = true;
      this.alertType = 'error';
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
      return;
    }
  
    // Create FormData object
    const formData = new FormData();
  
    // Append form values to FormData with capitalized keys
    Object.entries(this.userForm.value).forEach(([key, value]) => {
      // Capitalize the first letter of each key
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
  
      if (capitalizedKey === 'AvatarPersonal' && value) {
        // Append file if AvatarPersonal is selected
        formData.append(capitalizedKey, value as File, (value as File).name);
        console.log(value);
      } else if (value !== null && value !== undefined) {
        // Append other fields as strings
        formData.append(capitalizedKey, value.toString());
      }
    });
  
    if (this.isEditMode) {
      // Emit update data with FormData
      formData.append('Id', this.userUpdate.id); // Append the ID for updates
      this.updateUser.emit(formData as unknown as UserUpdateInputDto); // Cast if needed
    } else {
      // Emit new user data with FormData
      this.saveUser.emit(formData as unknown as UserInputDto); // Cast if needed
    }
  
    this.userForm.reset({
      password: '123456789',
      isActive: true,
    });
  }
}
