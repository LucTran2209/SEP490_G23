import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { catchError, first, map, Observable, of, switchMap } from 'rxjs';
import { HttpStatusCode } from '../../configs/status-code.config';
import { AuthService } from '../../services/auth.service';
import { REGEX } from '../constant';

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

export type MyValidationErrors = Record<
  string,
  {  vn: string }
>;

export class MyValidators {

  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (!control.value || control.value.length >= min) {
        return null;
      }
      return {
        minlength: {
          vn: `Độ dài tối thiểu là ${min}`,
        },
      };
    };
  }

  static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (!control.value || control.value.length <= max) {
        return null;
      }
      return {
        maxlength: {
          vn: `Độ dài tối đa là ${max}`,
        },
      };
    };
  }

  static email(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;
    if (!value || Validators.email(control) === null) {
      return null;
    }
    return {
      email: {
        vn: 'Không nhập đúng định dạng email',
      },
    };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;
    const isMobileValid =
      typeof value === 'string' && REGEX.phoneNumber.test(value);
    if (!value || isMobileValid) {
      return null;
    }
    return {
      mobile: {
        vn: 'Không nhập đúng định dạng số điện thoại',
      },
    };
  }

  static compose(validators: ValidatorFn[]): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      const errors: MyValidationErrors = {};
      for (const validator of validators) {
        const result = validator(control);
        if (result) {
          Object.assign(errors, result);
        }
      }
      return Object.keys(errors).length ? errors : null;
    };
  }

  static required(control: AbstractControl): MyValidationErrors | null {
    if (control.value) {
      return null;
    }
    return {
      required: {
        vn: 'Trường này là bắt buộc',
      },
    };
  }

  static emailAsync(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<MyValidationErrors | null> => {
      return control.valueChanges.pipe(
        switchMap((value) =>
          authService.isExistEmail({ email: value }).pipe(
            map((res) =>
              res.statusCode === HttpStatusCode.OK
                ? 
                null
                :
                {
                 emailExists: {
                vn: 'Không thể xác thực email, vui lòng thử lại sau',
              },
                }
            ),
            catchError((error) =>
              of({
                emailExists: {
                  vn: 'Email đã tồn tại',
                },
              })
            )
          )
        ),
        first()
      );
    };
  }
  
}
