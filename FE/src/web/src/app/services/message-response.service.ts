import { Injectable } from '@angular/core';
import { ErrorMessages } from '../utils/constant';
import { ErrorStatusCode, HttpStatusCode } from '../configs/status-code.config';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { NzResultStatusType } from 'ng-zorro-antd/result';

@Injectable({
  providedIn: 'root',
})
export class MessageResponseService {
  private errorCodeSubject = new BehaviorSubject<ErrorStatusCode>(
    ErrorStatusCode.NOT_FOUND
  );

  errorCode$ = this.errorCodeSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  private openSnackBar(
    message: string,
    panelClass: string | string[],
    duration: number
  ): void {
    const config: MatSnackBarConfig = {
      duration,
      panelClass,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, '', config);
  }
  showSuccess(message: string, duration: number = 3000): void {
    this.openSnackBar(
      message,
      ['custom-snackbar', 'success-snackbar'],
      duration
    );
  }

  handleError(content: string, status?: number): void {
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
