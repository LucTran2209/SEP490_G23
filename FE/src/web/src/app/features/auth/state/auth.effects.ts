import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {
  catchError,
  defer,
  delay,
  map,
  mergeMap,
  of,
  pipe,
  switchMap,
  tap,
  throwError,
  timeout,
} from 'rxjs';
import { StorageService } from '../../../services/storage.service';
import { LocalStorageKey, STRING } from '../../../utils/constant';
import { encodeBase64 } from '../../../utils/anonymous.helper';
import { LoadingService } from '../../../services/loading.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { replaceCookie } from '../../../utils/cookie.helper';

@Injectable()
export class AuthEffect {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private loadingSerivce: LoadingService,
    private storageService: StorageService,
    private messageNZ: NzMessageService
  ) {}
  loginProcess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.login),
        tap(() => this.loadingSerivce.setLoading()),
        switchMap(({ data }) =>
          this.authService.login(data).pipe(
            map((res) => {
              return AuthActions.login_success({ user: res });
            }),
            catchError((error) => {
              console.log('line 37:', error);
              return of(AuthActions.login_failure({ error }));
            })
          )
        )
      ),
    { dispatch: true }
  );

  loginExternalProcess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.login_external),
        tap(() => this.loadingSerivce.setLoading()),
        switchMap(({ data }) =>
          this.authService.loginwithGoogle(data).pipe(
            map((res) => {
              return AuthActions.login_external_success({ user: res });
            }),
            catchError((error) => {
              return of(AuthActions.login_external_failure({ error }));
            })
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  forgotPasswordProcess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.forgotPassword),
        tap(() => this.loadingSerivce.setLoading()),
        switchMap(({ data }) =>
          this.authService.forgotPassWord(data).pipe(
            map((res) => {
              return AuthActions.forgotPassword_success({
                otpCode: res.data,
                email: data.email,
              });
            }),
            catchError((error) => {
              return of(AuthActions.forgotPassword_failure({ error }));
            })
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  registerProcess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.register),
        tap(() => this.loadingSerivce.setLoading()),
        mergeMap(({ data }) =>
          this.authService.register(data).pipe(
            map((data) => {
              return AuthActions.register_success({ message: data.message });
            }),
            catchError((err) =>
              of(AuthActions.register_failure({ error: err.message }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  checkOtpSendtoEmail$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActions.checkOtpCode),
      switchMap(({ otpCode }) =>
        this.authService.checkOtpCode(otpCode).pipe(
          map((isValid) => {
            if (isValid) {
              return AuthActions.checkOtpCode_success();
            } else {
              throw catchError;
            }
          }),
          catchError((err) =>
            of(
              AuthActions.checkOtpCode_failure({
                error: 'Mã xác nhận không hợp lệ vui lòng thử lại',
              })
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.login_success, AuthActions.login_external_success),
        tap(({ user }) => {
          this.loadingSerivce.setOtherLoading('loaded');
          this.authService.startSession(user.data);
        })
      ),
    { dispatch: false }
  );

  forogotPassword_success$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.forgotPassword_success),
        tap(({ otpCode: { optcode }, email }) => {
          let date = new Date();
          let currentRoute = this.router.routerState.snapshot.url;
          this.loadingSerivce.setOtherLoading('loaded');
          this.messageNZ.create('success', 'Chúng tôi đã gửi otpCode cho bạn!');
          let encodeCode = encodeBase64(optcode);
          date.setTime(date.getTime() + 1 * 60 * 1000);
          this.storageService.setSession(STRING.EMAIL, email);
          replaceCookie(STRING.OTPCODE, encodeCode, date, currentRoute);
        })
      ),
    { dispatch: false }
  );

  checkOtpCodeSendToEmail_success$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.checkOtpCode_success),
        tap(() => {
          this.loadingSerivce.setOtherLoading('loaded');
          this.messageNZ.create('success', 'Vui lòng nhập mật khẩu mới!');
          this.router.navigate(['auth/reset-password']);
        })
      ),
    { dispatch: false }
  );

  register_success$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.register_success),
        delay(5000),
        tap(() => {
          this.messageNZ.create('success', 'Bạn đã tạo tài khoản thành công!');
          this.loadingSerivce.setOtherLoading('loaded');
          this.router.navigateByUrl('/auth/login');
        })
      ),
    {
      dispatch: false,
    }
  );

  processFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          AuthActions.login_failure,
          AuthActions.login_external_failure,
          AuthActions.forgotPassword_failure,
          AuthActions.checkOtpCode_failure,
          AuthActions.register_failure
        ),
        tap((action) => {
          this.loadingSerivce.setOtherLoading('error');
          this.messageNZ.create('error', action.error);
        })
      ),
    { dispatch: false }
  );
}
