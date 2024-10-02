import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { matchValidator } from '../../../../utils/form-validators';
import { IChangePassword, ResultService } from '../../../../interfaces/account.interface';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  curPswVisible = false;
  newPswVisible = false;
  confirmVisible = false;
  password?: string;
  resultMessage: string | null = null;
  datas: any;  // To store the `datas` from the API response
  constructor(private fb: NonNullableFormBuilder, private authService : AuthService) {}

  changePswForm: FormGroup<{
    currentPsw: FormControl<string>;
    newPsw: FormControl<string>;
    confirmPsw: FormControl<string>;
  }> = this.fb.group({
    currentPsw: ['', [Validators.required]],
    newPsw: ['', [Validators.required]],
    confirmPsw: ['', [Validators.required, matchValidator('newPsw')]],
  });
  
  get confirmPsw() {
    return this.changePswForm.get('confirmPsw');
  }

  submitForm(): void {
    if (this.changePswForm.valid) {
      const formValue = this.changePswForm.value;
      const payload: IChangePassword = {
        currentPassword: formValue.currentPsw as string,
        newPassword: formValue.newPsw as string
      };
      this.authService.changepassword(payload).subscribe(
        // (response: ResultService) => {
        //   this.resultMessage = `Status: ${response.statusCode}, Message: ${response.message}`;
        // },
        // (error) => {
        //   // Handle error response
        //   console.error('Error changing password', error);
        //   this.resultMessage = 'An error occurred. Please try again.';
        // }
      )

    } else {
      Object.values(this.changePswForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
      
  }
}
