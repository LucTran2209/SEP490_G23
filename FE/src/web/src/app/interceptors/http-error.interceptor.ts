import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, Observable, of, retry, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { STRING } from '../utils/constant';
import { getCookie, replaceCookie } from '../utils/cookie.helper';

@Injectable()
export class httpErrorInterceptor implements HttpInterceptor {
  constructor(
    private message: NzMessageService,
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errorRes: HttpErrorResponse) => {
        const { status, headers, ok, error } = errorRes;
        console.log('>>> line 21:', errorRes);
        console.log('>>> chcek error:');
        if (status === 500) return this.handleApiError(req, next, errorRes);
        if (status === 400) return this.handleBadRequest(req, next, errorRes);
        if (status === 401) return this.handleUnauthorized(req, next, errorRes);
        if (status === 403) return this.handleForbidden(req, next, errorRes);
        if (status === 403) return this.handleForbidden(req, next, errorRes);
        if (status === 404) return this.handleNotFound(req, next, errorRes);
        if (
          !status &&
          !headers.keys().length &&
          !ok &&
          !error.loaded &&
          !error.total
        )
          return this.handleUnknownError(req, next, errorRes);
        return throwError(() => errorRes);
      })
    );
  }

  protected handleForbidden(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    this.message.create('error', 'Bạn không có quyền truy cập vào hệ thống');
    this.authService.endSession();
    return throwError(() => error);
  }

  protected handleApiError(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    const {} = error;
    // console.log('>>> http-error interceptor: ',error);
    this.message.create('error', 'Đã xảy ra lỗi nội bộ. Vui lòng thử lại sau.');
    return throwError(() => error);
  }

  protected handleBadRequest(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    return throwError(() => error);
  }

  protected handleUnknownError(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    const {} = error;
    this.message.create(
      'error',
      'Đã xảy ra lỗi phần máy chủ. Vui lòng thử lại sau.'
    );

    console.warn(error);

    return throwError(() => error);
  }

  protected handleNotFound(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    return throwError(() => error);
  }

  private handleExpiredToken(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    return throwError(() => error);
  }

  protected handleUnauthorized(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    return throwError(() => error);
    return this.checkAuth().pipe(
      switchMap(() => {
        return next.handle(request).pipe(retry(1));
      })
    );
  }

  private checkAuth(): Observable<null> {
    const accessToken = getCookie(STRING.ACCESS_TOKEN);
    const isValid = this.authService.isTokenExpired(accessToken || '');

    if (!isValid) {
      return this.authService.renewToken().pipe(
        switchMap((res) => {
          // replaceCookie(STRING.ACCESS_TOKEN, res.data, null);
          return of(null);
        }),
        catchError((error) => {
          this.authService.endSession();
          return throwError(error);
        })
      );
    }
    return of(null);
  }
}
