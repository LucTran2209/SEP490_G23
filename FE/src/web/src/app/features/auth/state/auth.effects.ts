import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, delay, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { LoadingService } from '../../../services/loading.service';
import { StorageService } from '../../../services/storage.service';
import { encodeBase64 } from '../../../utils/anonymous.helper';
import { STRING } from '../../../utils/constant';
import { replaceCookie } from '../../../utils/cookie.helper';
import * as AuthActions from './auth.actions';
import { selectAccessToken } from './auth.feature';
import { MessageResponseService } from '../../../services/message-response.service';
import { HttpStatusCode } from '../../../configs/status-code.config';

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
              console.log('res', res);
              return AuthActions.login_success({
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
              });
            }),
            catchError((error) => {
              const errorMessage = error.error?.message || 'Đã xảy ra lỗi!';
              const statusCode = error.status 
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
              console.log('error',error);
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


  resetPassword$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(AuthActions.resetPassword),
        tap(() => this.loadingSerivce.setLoading()),
        switchMap(({ data }) =>
          this.authService.resetPassword(data).pipe(
            map((res) => {
              if(res.statusCode != HttpStatusCode.OK){
                throw Error;
              }else{
                return AuthActions.resetPassword_success();
              }
            }),
            catchError((err) =>
             {
              const errorMessage = err.error?.message || 'Đã xảy ra lỗi!';
              const statusCode = err.status 
              return of(
                AuthActions.resetPassword_failure({error: "Đường dẫn hết thời gian thay đổi mật khẩu!", statusCode: statusCode })
               )
             }
            )
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
          } else {
            this.loadingSerivce.setOtherLoading('error');
            catchError((err) =>
              of(
                AuthActions.checkOtpCode_failure({
                  error: 'Mã xác nhận không hợp lệ vui lòng thử lại',
                })
              )
            );
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
            'Vui lòng đăng nhập lại vào hệ thống'
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

  processFailure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          AuthActions.login_failure,
          AuthActions.login_external_failure,
          AuthActions.forgotPassword_failure,
          AuthActions.checkOtpCode_failure,
          AuthActions.register_failure,
          AuthActions.resetPassword_failure
        ),
        tap((action) => {
          this.loadingSerivce.setOtherLoading('error');
          this.toastMT.handleError(action.error);
        })
      ),
    { dispatch: false }
  );
}
