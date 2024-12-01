import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  IChangePassword
} from '../../../../interfaces/account.interface';
import { AuthService } from '../../../../services/auth.service';
import { LoadingService } from '../../../../services/loading.service';
import { MessageResponseService } from '../../../../services/message-response.service';
import { getErrorMessage } from '../../../../utils/anonymous.helper';
import { matchValidator } from '../../../../utils/form-validators';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  curPswVisible = false;
  newPswVisible = false;
  confirmVisible = false;
  password?: string;
  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private messageMS: NzMessageService,
    private loadingService: LoadingService,
    private messageResponseService: MessageResponseService,
    private router: Router
  ) {}

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
      this.loadingService.setLoading();
      const formValue = this.changePswForm.value;
      const payload: IChangePassword = {
        currentPassword: formValue.currentPsw as string,
        newPassword: formValue.newPsw as string,
      };
      this.authService.changepassword(payload).subscribe({
        next: () => {
          this.loadingService.setOtherLoading('loaded');
          this.messageMS.success('Mật khẩu được cập nhật thành công');
          this.router.navigate(['/']);
        },
        error: (error) => {
          const errorMessage = getErrorMessage(error);
          this.loadingService.setOtherLoading('error');
          this.messageResponseService.handleError(errorMessage);
        },
        complete: () => {
          this.loadingService.setOtherLoading('loaded');
        },
      });
    } else {
      Object.values(this.changePswForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {}
}
