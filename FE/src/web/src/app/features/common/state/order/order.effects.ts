import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LoadingService } from '../../../../services/loading.service';
import { MessageResponseService } from '../../../../services/message-response.service';
import { OrderService } from '../../../../services/order.service';
import * as OrderActions from './order.actions';
@Injectable()
export class OrderProductsEffects {
  constructor(
    private action$: Actions,
    private orderService: OrderService,
    private loadingService: LoadingService,
    private responseMessage: MessageResponseService,
    private store: Store,
    private router: Router,
    private messageNZ: NzMessageService
  ) {}

  processCreateOrderProduct$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(OrderActions.createOrder),
        tap(() => this.loadingService.setLoading()),
        switchMap(({ formData }) =>
          this.orderService.createOrders(formData).pipe(
            map((res) => {
              console.log(res,'>>>> line 29', res);
              return OrderActions.createOrder_success({ message: res.message });
            }),
            catchError((err) => {
              return of(
                OrderActions.createOrder_failure({ message: '' })
              );
            })
          )
        )
      ),
    {
      dispatch: true,
    }   
  );

  createOrderProduct_success$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(OrderActions.createOrder_success),
        tap(({ message }) => {
          this.loadingService.setOtherLoading('loaded');
          this.responseMessage.showSuccess(
            'Đơn hàng đã được gửi yêu cầu tới Người cho thuê!'
          );
          this.router.navigateByUrl('/common/user/order');
          this.store.dispatch(OrderActions.resetOrderState());
        })
      ),
    {
      dispatch: false,
    }
  );

  createOrderProduct_failure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(OrderActions.createOrder_failure),
        tap(({ message }) => {
          this.loadingService.setOtherLoading('error');
        })
      ),
    {
      dispatch: false,
    }
  );
}
