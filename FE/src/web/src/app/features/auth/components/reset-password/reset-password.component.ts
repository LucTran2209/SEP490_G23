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

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  validateResetForm: FormGroup<{
    password: FormControl<string>;
    confirm: FormControl<string>;
  }>;

  submitForm(): void {
    console.log('submit', this.validateResetForm.value);
  }

  validateConfirmPassword(): void {
    this.validateResetForm.controls.confirm.updateValueAndValidity();
  }

  constructor(private fb: NonNullableFormBuilder) {
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
