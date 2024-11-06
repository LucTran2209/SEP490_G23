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
import { UserOutputDto, UserResultService } from '../../../interfaces/user.interface';
@Injectable()
export class AdminEffect {
    constructor(
        private action$: Actions,
        private userService: UserService,
        private loadingSerivce: LoadingService,
        private messageNZ: NzMessageService
      ) {}

      loadUsersProcess$ = createEffect(() =>
        this.action$.pipe(
          ofType(AdminActions.load_users),
          mergeMap(action =>
            this.userService.listUser(action.pageIndex, action.pageSize).pipe(
              map((response: UserResultService) => {
                console.log(response);
                const userList: UserOutputDto[] = response.data.items;
                return AdminActions.load_users_success({ userList });
              }),
              catchError(error => of(AdminActions.load_users_failure({ error })))
            )
          )
        )
      );
      createUserProcess$ = createEffect(
        () =>
          this.action$.pipe(
            ofType(AdminActions.create_user),
            tap(() => this.loadingSerivce.setLoading()),
            mergeMap(({ data }) =>
              this.userService.addUser(data).pipe(
                // Nếu API call thành công, dispatch createUsersSuccess với dữ liệu trả về
                map((data) => {
                  return AdminActions.create_user_success({ message: data.message });
                }),
                // Nếu API call thành công, dispatch createUsersFailure với dữ liệu trả về
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