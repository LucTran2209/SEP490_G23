import { Injectable } from '@angular/core';
import { ErrorMessages } from '../utils/constant';
import { ErrorStatusCode, HttpStatusCode } from '../configs/status-code.config';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { NzResultStatusType } from 'ng-zorro-antd/result';
import {
  NzNotificationDataOptions,
  NzNotificationService,
} from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class MessageResponseService {
  private errorCodeSubject = new BehaviorSubject<ErrorStatusCode>(
    ErrorStatusCode.NOT_FOUND
  );

  errorCode$ = this.errorCodeSubject.asObservable();

  constructor(
    private snackBar: MatSnackBar,
    private nzNotificationService: NzNotificationService
  ) {}

  private openSnackBar(
    message: string | string[],
    panelClass: string | string[],
    duration: number
  ): void {
    const config: MatSnackBarConfig = {
      duration,
      panelClass,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };
    if (message instanceof Array) {
      message.forEach((message, index) => {
        setTimeout(() => {
          this.snackBar.open(message, '', config);
        }, index * 2000);
      });
    } else {
      this.snackBar.open(message, '', config);
    }
  }
  showSuccess(message: string, duration: number = 3000): void {
    this.openSnackBar(
      message,
      ['custom-snackbar', 'success-snackbar'],
      duration
    );
  }

  handleError(content: string | string[], status?: number): void {
    const message =
      ErrorMessages[status as HttpStatusCode] ||
      'Đã xảy ra lỗi. Vui lòng thử lại.';
    this.openSnackBar(
      content || message,
      ['custom-snackbar', 'error-snackbar'],
      3000
    );
  }

  showInfo(message: string, duration: number = 3000): void {
    this.openSnackBar(message, ['custom-snackbar', 'info-snackbar'], duration);
  }

  showPreventAccess(title: string, content: string, options?: object): void {
    let globalOptions: NzNotificationDataOptions<any> = {
      nzDuration: 3000,
      nzStyle: {
        background: '#FFF3E9',
        'border-radius': '8px',
        color: '#FF831E',
        border: '1px solid #FF831E',
        'box-shadow': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      },
    };
    this.nzNotificationService.warning(title, content, globalOptions);
  }

  setErrorCode(code: ErrorStatusCode): void {
    this.errorCodeSubject.next(code);
  }

  getMessageSubtitle(status: ErrorStatusCode) {
    return ErrorMessages[status] || 'Đã xảy ra lỗi không xác định.';
  }

  typeMessage(status: ErrorStatusCode): NzResultStatusType {
    switch (status) {
      case ErrorStatusCode.FORBIDDEN:
      case ErrorStatusCode.UNAUTHORIZED:
      case ErrorStatusCode.BAD_REQUEST:
      case ErrorStatusCode.UNKNOWN_ERROR:
        return '403';
      case ErrorStatusCode.NOT_FOUND:
        return '404';
      case ErrorStatusCode.INTERNAL_SERVER_ERROR:
      case ErrorStatusCode.CONFLICT:
      case ErrorStatusCode.BAD_GATEWAY:
        return '500';
      default:
        return '500';
    }
  }
}
