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
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { MessageResponseService } from '../services/message-response.service';
import { HttpStatusCode } from '../configs/status-code.config';

export interface IErrorItem {
  propertyName: string;
  errorMessage: string;
}
export interface IErrorApi {
  status: HttpStatusCode;
  errorList: IErrorItem[];
}


@Injectable()
export class httpErrorInterceptor implements HttpInterceptor {
  constructor(
    private message: NzMessageService,
    private router: Router,
    private authService: AuthService,
    private loadingSerivce: LoadingService,
    private responseMS: MessageResponseService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((errorRes: HttpErrorResponse) => {
        const { status, headers, ok, error } = errorRes;
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
    this.loadingSerivce.setOtherLoading('error');
    return throwError(() => error);
  }

  protected handleApiError(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    const {} = error;
    // console.log('>>> http-error interceptor: ',error);
    this.loadingSerivce.setOtherLoading('error');
    return throwError(() => error);
  }

  protected handleBadRequest(
    request: HttpRequest<any>,
    next: HttpHandler,
    errorRes: HttpErrorResponse
  ) {
    const { error } = errorRes;
    let diffError = error as IErrorApi;
    console.log('<<<<<line 93>>>>>',diffError);
    this.loadingSerivce.setOtherLoading('error');
    return throwError(() => diffError);
  }

  protected handleUnknownError(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    const {} = error;
    this.loadingSerivce.setOtherLoading('error');

    console.warn(error);

    return throwError(() => error);
  }

  protected handleNotFound(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    this.loadingSerivce.setOtherLoading('error');
    return throwError(() => error);
  }

  private handleExpiredToken(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    this.loadingSerivce.setOtherLoading('error');
    return throwError(() => error);
  }

  protected handleUnauthorized(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    this.loadingSerivce.setOtherLoading('error');
    return throwError(() => error);
  }
}
