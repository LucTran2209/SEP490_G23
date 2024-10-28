import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RenterShopService } from '../../../services/renter-shop.service';
import * as RegisterLessorActions from './register_lessor.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LoadingService } from '../../../services/loading.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable()
export class RegisterLessorEffects {
  constructor(
    private actions: Actions,
    private renterShopService: RenterShopService,
    private loadingSerivce: LoadingService,
    private messageNZ: NzMessageService
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

  registerLessorSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(RegisterLessorActions.renterShop_success),
      tap(({ message }) => {
        this.loadingSerivce.setOtherLoading('loaded');
        this.messageNZ.create('success', message);
      })
    )
  );
  registerLessorFailure$ = createEffect(() =>
    this.actions.pipe(
      ofType(RegisterLessorActions.renterShop_failure),
      tap(({ message }) => {
        console.log('>>> line 58', message);
        this.loadingSerivce.setOtherLoading('error');
        this.messageNZ.create('error', message);
      })
    )
  );
}
