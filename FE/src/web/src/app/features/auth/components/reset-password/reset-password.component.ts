import { Component } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { confirmValidator } from '../../../../utils/validators';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/featureApp.state';
import { Store } from '@ngrx/store';
import { getCookie } from '../../../../utils/cookie.helper';
import { STRING } from '../../../../utils/constant';
import { IResetPassword } from '../../../../interfaces/account.interface';
import { resetPassword } from '../../state/auth.actions';

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
    const data: IResetPassword = {
      email: emailSession,
      currentPassword: this.validateResetForm.controls.password.value,
      newPassword: this.validateResetForm.controls.confirm.value,
    };
    this.store.dispatch(resetPassword({ data }));
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
