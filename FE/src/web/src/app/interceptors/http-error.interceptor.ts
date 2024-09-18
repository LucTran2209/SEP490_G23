import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, switchMap, throwError } from 'rxjs';
import { ErrorMessages, STRING } from '../utils/constant';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { getCookie, replaceCookie } from '../utils/cookie.helper';

@Injectable()

export class httpErrorInterceptor implements HttpInterceptor {

  constructor(private message: NzMessageService, private router: Router, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        const { status } = error;
        if (status === 500) return this.handleApiError(req, next, error);
        if (status === 400) return this.handleBadRequest(req, next, error);
        if (status === 401) return this.handleUnauthorized(req, next, error);
        if (status === 403) return this.handleForbidden(req, next, error);
        if (status === 403) return this.handleForbidden(req, next, error);
        if (status === 404) return this.handleNotFound(req, next, error);
        return throwError(() => error);
      }
      ))
  }


  protected handleForbidden(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse) {
    this.message.create('error', 'Bạn không có quyền truy cập vào hệ thống');
    this.authService.endSession();
    return throwError(() => error);
  }

  protected handleApiError(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse) {
    return throwError(() => error);
  }

  protected handleBadRequest(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse) {
    return throwError(() => error);
  }


  protected handleNotFound(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse) {
    return throwError(() => error);
  }

  private handleExpiredToken(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse) {
    return throwError(() => error);
  }

  protected handleUnauthorized(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse){
    return this.checkAuth().pipe(
      switchMap(() => {
        const token = getCookie(STRING.ACCESS_TOKEN);
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
        return next.handle(request).pipe(retry(1));
      })
    )
  }

  private checkAuth(): Observable<null>{
    const accessToken = getCookie(STRING.ACCESS_TOKEN);
    const isValid = this.authService.isTokenExpired(accessToken || '');

    if (!isValid) {
      return this.authService.renewToken().pipe(
        switchMap((res) => {
          replaceCookie(STRING.ACCESS_TOKEN, res.data, null);
          return of(null);
        }),
        catchError((error) => {
          this.authService.endSession();
          return throwError(error);
        }),
      );
    }
    return of(null);
  }
}




