import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, delay, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpStatusCode } from '../../../configs/status-code.config';
import { AuthService } from '../../../services/auth.service';
import { LoadingService } from '../../../services/loading.service';
import { MessageResponseService } from '../../../services/message-response.service';
import { StorageService } from '../../../services/storage.service';
import { getErrorMessage } from '../../../utils/anonymous.helper';
import { STRING } from '../../../utils/constant';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffect {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private loadingSerivce: LoadingService,
    private storageService: StorageService,
    private messageNZ: NzMessageService,
    private toastMT: MessageResponseService
  ) {}
  loginProcess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.login),
        tap(() => this.loadingSerivce.setLoading()),
        switchMap(({ data }) =>
          this.authService.login(data).pipe(
            map((res) => {
              return AuthActions.login_success({
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              });
            }),
            catchError((error) => {
              console.log('error', error);
              const errorMessage = getErrorMessage(error);
              const statusCode = error.status || error.statusCode;
              return of(
                AuthActions.login_failure({ error: errorMessage, statusCode })
              );
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
              return AuthActions.login_external_success({
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              });
            }),
            catchError((error) => {
              console.log('error', error);
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
                email: data.email,
              });
            }),
            catchError((error) => {
              console.log('error', error);
              const errorMessage = getErrorMessage(error);
              const statusCode = error.status || error.statusCode;

              return of(
                AuthActions.forgotPassword_failure({
                  error: errorMessage,
                  statusCode,
                })
              );
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
              of(AuthActions.register_failure({ error: 'Đã xảy ra lỗi' }))
            )
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  resetPassword$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.resetPassword),
        tap(() => this.loadingSerivce.setLoading()),
        switchMap(({ data }) =>
          this.authService.resetPassword(data).pipe(
            map((res) => {
              if (res.statusCode != HttpStatusCode.OK) {
                throw Error;
              } else {
                return AuthActions.resetPassword_success();
              }
            }),
            catchError((err) => {
              const statusCode = err.status;
              let diffErrArr = err.errorList.map(
                (item: any) => item.errorMessage
              );
              return of(
                AuthActions.resetPassword_failure({
                  error: diffErrArr,
                  statusCode: statusCode,
                })
              );
            })
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  verifyEmailProcess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.verifyEmail),
        tap(() => {
          this.loadingSerivce.setLoading();
        }),
        switchMap(({ email, username }) =>
          this.authService.verifyEmail({ email, userName: username }).pipe(
            map(({ statusCode }) =>
              AuthActions.verifyEmail_success({ statusCode })
            ),
            catchError((error) => {
              let diffErrArr = error.errorList.map(
                (item: any) => item.errorMessage
              );
              return of(
                AuthActions.verifyEmail_failure({
                  error: diffErrArr,
                })
              );
            })
          )
        )
      ),
    {
      dispatch: true,
    }
  );
  confirmVerifyEmailProcess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.confirmVerifyEmail),
        tap(() => {
          this.loadingSerivce.setLoading();
        }),
        switchMap(({ data, dataRegister }) =>
          this.authService.confirmVerifyEmail(data).pipe(
            switchMap(({ statusCode }) => {
              if (statusCode === HttpStatusCode.OK) {
                return this.authService.register(dataRegister).pipe(
                  map((data) => {
                    return AuthActions.register_success({
                      message: data.message,
                    });
                  }),
                  catchError((err) =>
                    of(
                      AuthActions.register_failure({
                        error: 'Đã xảy ra lỗi trong khi tạo tài khoản',
                      })
                    )
                  )
                );
              } else {
                return of(
                  AuthActions.verifyEmail_failure({
                    error: 'Mã OTP không hợp lệ!',
                  })
                );
              }
            }),
            catchError((err) => {
              return of(
                AuthActions.verifyEmail_failure({
                  error: 'Có lỗi xảy ra vui lòng thử lại',
                })
              );
            })
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  loginSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.login_success, AuthActions.login_external_success),
        tap((data) => {
          if (data) {
            this.loadingSerivce.setOtherLoading('loaded');
            this.authService.startSession(data.accessToken, data.refreshToken);
            this.messageNZ.success('Đăng nhập thành công');
          } else {
            this.loadingSerivce.setOtherLoading('error');
            catchError((error) => {
              let diffErrArr = error.errorList.map(
                (item: any) => item.errorMessage
              );
              return of(
                AuthActions.login_failure({
                  error: diffErrArr,
                  statusCode: 0,
                })
              );
            });
          }
        })
      ),
    { dispatch: false }
  );

  forogotPassword_success$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.forgotPassword_success),
        tap(({ email }) => {
          let date = new Date();
          this.loadingSerivce.setOtherLoading('loaded');
          this.storageService.setSession(STRING.EMAIL, email);
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

  resetPassword_success$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.resetPassword_success),
        tap(() => {
          this.loadingSerivce.setOtherLoading('loaded');
          this.messageNZ.create(
            'success',
            'Bạn đã cập nhật mật khẩu mới thành công. Vui lòng đăng nhập lại vào hệ thống!'
          );
          this.router.navigate(['auth/login']);
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

  logout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
        })
      ),
    {
      dispatch: false,
    }
  );

  verifyEmail_success$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.verifyEmail_success),
        tap(({}) => {
          this.loadingSerivce.setOtherLoading('loaded');
          // const timestamp15MinutesLater = Math.floor(Date.now() / 1000) + 15 * 60;
          // replaceCookie(STRING.OTPCODE, code, timestamp15MinutesLater, '/'); //15 minutes
          // replaceCookie(STRING.EMAIL, email, timestamp15MinutesLater, '/'); //15 minutes
          // window.location.reload();
        })
      ),
    {
      dispatch: false,
    }
  );
  confirmVerifyEmail_success$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.confirmVerifyEmail_success),
        tap(() => {
          this.loadingSerivce.setOtherLoading('loaded');
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
          AuthActions.register_failure,
          AuthActions.resetPassword_failure,
          AuthActions.verifyEmail_failure,
          AuthActions.confirmVerifyEmail_failure
        ),
        tap((action) => {
          console.log('action', action);
          this.loadingSerivce.setOtherLoading('error');
          this.toastMT.handleError(action.error);
        })
      ),
    { dispatch: false }
  );
}
