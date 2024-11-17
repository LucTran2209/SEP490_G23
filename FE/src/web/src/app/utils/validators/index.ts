import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { REGEX } from '../constant';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { catchError, debounceTime, distinctUntilChanged, first, map, Observable, of, switchMap } from 'rxjs';
import { HttpStatusCode } from '../../configs/status-code.config';

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
  { 'zh-cn': string; en: string }
>;

export class MyValidators {

  static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (!control.value || control.value.length >= min) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${min}`,
          en: `Độ dài tối thiểu là ${min}`,
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
          'zh-cn': `最大长度为 ${max}`,
          en: `Độ dài tối đa là ${max}`,
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
        'zh-cn': '邮箱格式不正确',
        en: 'Không nhập đúng định dạng email',
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
        'zh-cn': '手机号格式不正确',
        en: 'Không nhập đúng định dạng số điện thoại',
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
        'zh-cn': '此项为必填项',
        en: 'Trường này là bắt buộc',
      },
    };
  }

  static emailAsync(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<MyValidationErrors | null> => {
      return control.valueChanges.pipe(
        switchMap((value) =>
          authService.verifyEmail({ email: value }).pipe(
            map((res) =>
              res.statusCode === HttpStatusCode.OK
                ? 
                null
                :
                {
                 emailExists: {
                'zh-cn': '无法验证邮箱，请稍后再试',
                en: 'Không thể xác thực email, vui lòng thử lại sau',
              },
                }
            ),
            catchError((error) =>
              of({
                emailExists: {
                  'zh-cn': '邮箱已存在',
                  en: 'Email đã tồn tại',
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
