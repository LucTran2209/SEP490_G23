import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { IForgotPassword } from '../../../../interfaces/account.interface';
import { ItimeClock } from '../../../../interfaces/anonymous.interface';
import { AuthService } from '../../../../services/auth.service';
import { countDownTimer } from '../../../../utils/anonymous.helper';
import { otpValidator } from '../../../../utils/validators';
import * as AuthActions from '../../state/auth.actions';
import { selectIsRecoveringPassword } from '../../state/auth.feature';
import { StorageService } from '../../../../services/storage.service';
import { STRING } from '../../../../utils/constant';
import { FeatureAppState } from '../../../../store/app.state';

interface OtpFormControls {
  number1: AbstractControl<string | null>;
  number2: AbstractControl<string | null>;
  number3: AbstractControl<string | null>;
  number4: AbstractControl<string | null>;
  number5: AbstractControl<string | null>;
  number6: AbstractControl<string | null>;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  timeClock$?: Observable<ItimeClock>;
  otpErrorMessage: string | null = null;
  isTimeClockInitialized = false;
  isRecoveringForgotPassword: Observable<boolean>;
  enterCodeForm: FormGroup<OtpFormControls>;

  forgotPasswordForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get otpCode() {
    return Object.values(this.enterCodeForm.controls)
      .map((n) => n.value)
      .join('');
  }

  get isEnterCodeValid() {
    return this.enterCodeForm.valid;
  }

  submitForm(): void {
    if (this.forgotPasswordForm.valid) {
      const requestForgotPassowrd: IForgotPassword = {
        email: this.forgotPasswordForm.value.email!,
      };
      this.store.dispatch(
        AuthActions.forgotPassword({ data: requestForgotPassowrd })
      );
    } else {
      Object.values(this.forgotPasswordForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitCodeForm(): void {
    // Reset thông báo lỗi trước khi kiểm tra
    this.enterCodeForm.markAllAsTouched();
    this.otpErrorMessage = null;
    if (
      this.enterCodeForm.invalid &&
      this.enterCodeForm.hasError('otpMismatch')
    ) {
      this.otpErrorMessage = 'OTP không khớp, vui lòng thử lại!';
      console.log('Form không hợp lệ', this.enterCodeForm.errors);
      return;
    } else if (this.enterCodeForm.invalid) {
      this.otpErrorMessage = 'Vui lòng nhập  mã OTP!';
      return;
    }
    this.store.dispatch(AuthActions.checkOtpCode({ otpCode: this.otpCode }));
    console.log('OTP hợp lệ:');
  }

  reverseTimeHandle(seconds: number = 30) {
    if (!this.isTimeClockInitialized) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setSeconds(startDate.getSeconds() + seconds);
      this.timeClock$ = countDownTimer(startDate, endDate).pipe(
        tap((e) => {
          if (e.minutes === '00' && e.seconds === '00') {
            this.isTimeClockInitialized = false;
          }
        })
      );
      this.isTimeClockInitialized = true;
    }
  }

  onSendAgainCode() {
    const requestForgotPassowrd: IForgotPassword = {
      email: this.storageSerive.getSession(STRING.EMAIL) || 'abc@gmail.com',
    };
    if (!this.isTimeClockInitialized) {
      this.enterCodeForm.reset();
      this.reverseTimeHandle(60);
      this.store.dispatch(
        AuthActions.forgotPassword({ data: requestForgotPassowrd })
      );
    }
  }

  constructor(
    private formbuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private store: Store<FeatureAppState>,
    private _authSerivce: AuthService,
    private storageSerive: StorageService
  ) {
    this.enterCodeForm = this.formbuilder.group<OtpFormControls>(
      {
        number1: new FormControl<string | null>(null, [Validators.required]),
        number2: new FormControl<string | null>(null, [Validators.required]),
        number3: new FormControl<string | null>(null, [Validators.required]),
        number4: new FormControl<string | null>(null, [Validators.required]),
        number5: new FormControl<string | null>(null, [Validators.required]),
        number6: new FormControl<string | null>(null, [Validators.required]),
      },
      { asyncValidators: [otpValidator(_authSerivce)] }
    );

    this.isRecoveringForgotPassword = this.store.select(
      selectIsRecoveringPassword
    );
  }

  ngOnInit(): void {
    // this.reverseTimeHandle(60);
  }
}
