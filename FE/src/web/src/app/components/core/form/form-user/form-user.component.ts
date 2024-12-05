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
  avatarPreview: string | ArrayBuffer | null = null; // Changed to match base64 string or null
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
    // Trích xuất phần ngày mà không ảnh hưởng múi giờ
    const localDateString = dateOfBirth.toLocaleDateString('en-CA');
    
    this.userForm.patchValue({
      fullName: this.userUpdate.fullName,
      email: this.userUpdate.email,
      phoneNumber: this.userUpdate.phoneNumber,
      address: this.userUpdate.address,
      gender: this.userUpdate.gender,
      dateOfBirth: localDateString, // Format for date
      avatarPersonal: this.userUpdate.avatarPersonal ?? null, // Ensure it's null if undefined
    });
    console.log('FormControl Address:', this.userForm.get('address')?.value);

    // Check if avatarPersonal is a string or a File and convert it accordingly
    if (this.userUpdate.avatarPersonal) {
        if (typeof this.userUpdate.avatarPersonal === 'string') {
            this.avatarPreview = this.userUpdate.avatarPersonal; // Use as is if it's a base64 string
        } else if (this.userUpdate.avatarPersonal instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                this.avatarPreview = reader.result; // Set the base64 string for preview
            };
            reader.readAsDataURL(this.userUpdate.avatarPersonal); // Read the file as a data URL
        } else {
            this.avatarPreview = null; // Default to null for unexpected types
        }
    } else {
        this.avatarPreview = null; // Set preview to null if there's no avatar
    }

    if (this.isEditMode) {
      // Remove unnecessary controls for edit mode
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
    this.avatarPreview = null;
  }
  async onFileChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
  
      // Tạo URL hiển thị hình ảnh
      this.avatarPreview = URL.createObjectURL(file);
  
      // Ghi file vào form
      this.userForm.patchValue({ avatarPersonal: file });
  
      // Chuyển đổi ảnh sang base64 để xem trước
      reader.onload = () => {
        this.avatarPreview = reader.result; // Lưu kết quả base64
      };
      reader.readAsDataURL(file);
    } else {
      // Nếu không có file, reset preview
      this.avatarPreview = null;
      this.userForm.patchValue({ avatarPersonal: null });
    }
  }
  submitForm() {
    const addressValue = this.userForm.get('address')?.value;
    console.log('Address Value:', addressValue);
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
  
      // if (capitalizedKey === 'AvatarPersonal' && value) {
      //   // Append file if AvatarPersonal is selected
      //   formData.append(capitalizedKey, value as File, (value as File).name);
      // } else if (value !== null && value !== undefined) {
      //   // Append other fields as strings
      //   formData.append(capitalizedKey, value.toString());
      // }
      if (capitalizedKey === 'AvatarPersonal' && value instanceof Blob) {
        formData.append(capitalizedKey, value, 'avatar.jpg');
      } else if (value !== null && value !== undefined) {
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
      this.userForm.reset({
        password: '123456789',
        isActive: true,
      });
      this.avatarPreview = null;
    }
  
  }
  resetForm(){
    this.userForm.reset({
      password: '123456789',
      isActive: true,
    });
    this.avatarPreview = null;
  }
}
