import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import { STRING } from '../../../../utils/constant';
import { getCookie } from '../../../../utils/cookie.helper';
import { confirmValidator } from '../../../../utils/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  passwordVisible = false;
  confirmPasswordVisible = false;
  validateResetForm: FormGroup<{
    password: FormControl<string>;
    confirm: FormControl<string>;
  }>;

  submitForm(): void {
    let emailSession = getCookie(STRING.EMAIL) || '';
    // const data: IResetPassword = {
    //   email: emailSession,
    //   newPassword: this.validateResetForm.controls.confirm.value,

    // };
    // this.store.dispatch(resetPassword({ data }));
    console.log('submit', this.validateResetForm.value);
  }

  validateConfirmPassword(): void {
    this.validateResetForm.controls.confirm.updateValueAndValidity();
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private storageService: StorageService,
    private store: Store<FeatureAppState>
  ) {
    this.validateResetForm = this.fb.group({
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]],
    });
    this.validateResetForm
      .get('confirm')
      ?.setValidators(
        confirmValidator(this.validateResetForm.get('password')!)
      );
  }
}
