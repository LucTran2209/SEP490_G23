import { CanDeactivateFn } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { removeAllCookies, removeCookie } from '../utils/cookie.helper';
import { Store } from '@ngrx/store';
import { GlobalState } from '../store/app.state';
import { reset_state } from '../features/auth/state/auth.actions';
import { STRING } from '../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class WarningOutRegisterGuard {
  constructor(private modal: NzModalService, private store: Store<GlobalState>) {}

  canDeactivate(
    component: any,
    currentRoute: any,
    currentState: any,
    nextState?: any
  ): Observable<boolean> | boolean {
    if (component.canDeactivate && !component.canDeactivate()) {
      return new Observable<boolean>((observer) => {
        this.modal.confirm({
          nzTitle: 'Xác nhận rời trang',
          nzContent:
            'Bạn chưa hoàn tất quá trình xác minh email. Bạn có chắc chắn muốn rời khỏi trang này?',
          nzOkText: 'Rời đi',
          nzCancelText: 'Hủy',
          nzOnOk: () => {
            observer.next(true); 
            observer.complete();
            //delete otpCode and email
            removeCookie(STRING.OTPCODE);
            removeCookie(STRING.EMAIL);
            this.store.dispatch(reset_state());
          },
          nzOnCancel: () => {
            observer.next(false);
            observer.complete();
          },
        });
      });
    }

    return true; 
  }
}
