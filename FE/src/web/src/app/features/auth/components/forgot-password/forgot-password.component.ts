import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IForgotPassword } from '../../../../interfaces/account.interface';
import { ItimeClock } from '../../../../interfaces/anonymous.interface';
import { AuthService } from '../../../../services/auth.service';
import { StorageService } from '../../../../services/storage.service';
import { FeatureAppState } from '../../../../store/app.state';
import * as AuthActions from '../../state/auth.actions';
import { selectIsRecoveringPassword } from '../../state/auth.feature';

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

  forgotPasswordForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

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

  constructor(
    private formbuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private store: Store<FeatureAppState>,
    private _authSerivce: AuthService,
    private storageSerive: StorageService
  ) {
    // this.isRecoveringForgotPassword = of(true);
    this.isRecoveringForgotPassword = this.store.select(
      selectIsRecoveringPassword
    );
  }

  ngOnInit(): void {}
}
