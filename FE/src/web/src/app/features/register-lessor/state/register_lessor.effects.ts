import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LoadingService } from '../../../services/loading.service';
import { MessageResponseService } from '../../../services/message-response.service';
import { RenterShopService } from '../../../services/renter-shop.service';
import { GlobalState } from '../../../store/app.state';
import * as RegisterLessorActions from './register_lessor.actions';
@Injectable()
export class RegisterLessorEffects {
  constructor(
    private actions: Actions,
    private renterShopService: RenterShopService,
    private loadingSerivce: LoadingService,
    private messageNZ: NzMessageService,
    private responseMessage: MessageResponseService,
    private store: Store<GlobalState>,
    private route: Router
  ) {}

  proccessRegisterLessor$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(RegisterLessorActions.renterShop),
        tap(() => this.loadingSerivce.setLoading()),
        switchMap(({ formData }) =>
          this.renterShopService.registerToLessor(formData).pipe(
            map((res) => {
              return RegisterLessorActions.renterShop_success({
                message: res.message,
              });
            }),
            catchError((err) => {
              const errorMessage = err.error.message;
              return of(
                RegisterLessorActions.renterShop_failure({
                  message: errorMessage,
                })
              );
            })
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  registerLessorSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(RegisterLessorActions.renterShop_success),
        tap(({ message }) => {
          this.loadingSerivce.setOtherLoading('loaded');
          this.responseMessage.showInfo("Chúng tôi đã nhận được thông tin, vui lòng chờ xử lý");
          this.route.navigateByUrl("/");
        })
      ),
    {
      dispatch: false,
    }
  );
  registerLessorFailure$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(RegisterLessorActions.renterShop_failure),
        tap(({ message }) => {
          this.loadingSerivce.setOtherLoading('error');
          this.messageNZ.create('error', message);
        })
      ),
    {
      dispatch: false,
    }
  );
}
