import { Injectable } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import { catchError, defer, delay, map, mergeMap, of, pipe, switchMap, tap, throwError, timeout } from "rxjs";
import { StorageService } from "../../../services/storage.service";
import { LocalStorageKey } from "../../../utils/constant";
import { encodeBase64 } from "../../../utils/anonymous.helper";
import { LoadingService } from "../../../services/loading.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable()

export class AuthEffect {

    constructor(
        private action$: Actions,
        private authService: AuthService,
        private router: Router,
        private store: Store,
        private storageService: StorageService,
        private loadingSerivce: LoadingService,
        private messageNZ: NzMessageService
    ) { }
    loginProcess$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.login),
            tap(() => this.loadingSerivce.setLoading()),
            switchMap(({ data }) =>
                this.authService.login(data).pipe(
                    map(res => {
                        return AuthActions.login_success({ user: res });
                    }),
                    catchError(error => {
                        return of(AuthActions.login_failure({ error }))
                    })
                )
            )
        ),
        { dispatch: true }
    );

    loginExternalProcess$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.login_external),
            tap(() => this.loadingSerivce.setLoading()),
            switchMap(({ data }) =>

                this.authService.loginwithGoogle(data).pipe(
                    map(res => {
                        return AuthActions.login_external_success({ user: res })
                    }),
                    catchError(error => {
                        return of(AuthActions.login_external_failure({ error }))
                    }),
                )
            )

        ), {
        dispatch: true
    }
    )

    forgotPasswordProcess$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.forgotPasswrod),
            tap(() => this.loadingSerivce.setLoading()),
            switchMap(({ data }) => this.authService.forgotPassWord(data).pipe(
                map(data => {
                    return AuthActions.forgotPasswrod_success({ forgotData: data.data });
                }),
                catchError(error => {
                    this.messageNZ.create('error', "Tiến trình bị hủy");
                    return of(AuthActions.forgotPasswrod_failure({ error }))
                }
                )
            )
            ),
        ), {
        dispatch: true
    },
    )

    registerProcess$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.register),
            tap(() => this.loadingSerivce.setLoading()),
            mergeMap(({ data }) => this.authService.register(data).pipe(
                map(data => {
                    return AuthActions.register_success({ message: data.message })
                }),
                catchError((err) => of(AuthActions.register_failure({ error: err.message })))
            )
            )
        ), {
        dispatch: true
    }
    )

    checkOtpSendtoEmail$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.checkOtpCode),
            switchMap(({ otpCode }) => this.authService.checkOtpCode(otpCode).pipe(
                map((isValid) => {
                    if (isValid) {
                        return AuthActions.checkOtpCode_success();
                    } else {
                        return AuthActions.checkOtpCode_failure({ error: 'Mã xác nhận không hợp lệ vui lòng thử lại' })
                    }
                }),
                catchError(err => of(AuthActions.checkOtpCode_failure({ error: err })))
            )

            )
        )

    )

    loginSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.login_success, AuthActions.login_external_success),
            tap(({ user }) => {
                this.loadingSerivce.setOtherLoading('loaded');
                this.authService.startSession(user.data)
            })
        ),
        { dispatch: false }
    )

    forogotPassword_success$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.forgotPasswrod_success),
            tap((action) => {
                this.loadingSerivce.setOtherLoading('loaded');
                let encodeCode = encodeBase64(action.forgotData.optcode);
                this.storageService.set(LocalStorageKey.otpCode, encodeCode);
            })
        ), { dispatch: true }
    )

    checkOtpCodeSendToEmail_success$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.checkOtpCode_success),
            tap(() => {

            })
        ), { dispatch: false }
    )

    register_success$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.register_success),
            delay(5000),
            tap(() => {
                this.messageNZ.create('success', 'Bạn đã tạo tài khoản thành công!');
                this.loadingSerivce.setOtherLoading('loaded');
                this.router.navigate(['/auth/login']);
            })

        ), {
        dispatch: false
    }
    )

    loginFailure$ = createEffect(() =>
        this.action$.pipe(
            ofType(AuthActions.login_failure,
                AuthActions.login_external_failure,
                AuthActions.forgotPasswrod_failure,
                AuthActions.checkOtpCode_failure,
                AuthActions.register_failure
            ),
            tap(
                (action) => {
                    this.loadingSerivce.setOtherLoading('error');
                }
            )
        ), { dispatch: false }
    )

}