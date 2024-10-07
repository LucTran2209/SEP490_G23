import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export function otpValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    let otpCode = Object.values(control.value).join('');
    return authService.checkOtpCode(otpCode).pipe(
      map((isValid) => {
        console.log(isValid);
        if (!isValid) {
          return { otpMismatch: true };
        } else {
          return null;
        }
      })
    );
  };
}

export function confirmValidator(
  passwordControl: AbstractControl
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== passwordControl.value) {
      return { confirm: true };
    }
    return null;
  };
}
