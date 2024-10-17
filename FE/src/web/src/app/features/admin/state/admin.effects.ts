import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  catchError,
  delay,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { UserService } from '../../../services/user.service';
import { LoadingService } from '../../../services/loading.service';
import { StorageService } from '../../../services/storage.service';
import { encodeBase64 } from '../../../utils/anonymous.helper';
import { STRING } from '../../../utils/constant';
import { replaceCookie } from '../../../utils/cookie.helper';
import * as AdminActions from './admin.actions';
@Injectable()
export class AuthEffect {
    constructor(
        private action$: Actions,
        private userService: UserService,
        private router: Router,
        private store: Store,
        private loadingSerivce: LoadingService,
        private storageService: StorageService,
        private messageNZ: NzMessageService
      ) {}
      registerProcess$ = createEffect(
        () =>
          this.action$.pipe(
            ofType(AdminActions.create_user),
            tap(() => this.loadingSerivce.setLoading()),
            mergeMap(({ data }) =>
              this.userService.addUser(data).pipe(
                map((data) => {
                  return AdminActions.create_user_success({ message: data.message });
                }),
                catchError((err) =>
                  of(AdminActions.create_user_failure({ error: err.message }))
                )
              )
            )
          ),
        {
          dispatch: true,
        }
      );
      create_user_success$ = createEffect(
        () =>
          this.action$.pipe(
            ofType(AdminActions.create_user_success),
            delay(5000),
            tap(() => {
              this.messageNZ.create('success', 'Bạn đã thêm một người mới thành công!');
              this.loadingSerivce.setOtherLoading('loaded');
              this.router.navigateByUrl('/admin/users');
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
                AdminActions.create_user_failure,
            ),
            tap((action) => {
              this.loadingSerivce.setOtherLoading('error');
              this.messageNZ.create('error', action.error);
            })
          ),
        { dispatch: false }
      );
}