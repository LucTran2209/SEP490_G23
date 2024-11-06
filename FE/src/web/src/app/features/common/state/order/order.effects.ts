import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '../../../../services/order.service';
import { LoadingService } from '../../../../services/loading.service';
import { Store } from '@ngrx/store';
import { MessageResponseService } from '../../../../services/message-response.service';
import * as OrderActions from './order.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable()
export class OrderProductsEffects {
  constructor(
    private action$: Actions,
    private orderService: OrderService,
    private loadingService: LoadingService,
    private responseMessage: MessageResponseService,
    private store: Store,
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
              return OrderActions.createOrder_success({ message: res.message });
            }),
            catchError((err) => {
              const errorMessage = err.error.message;
              return of(
                OrderActions.createOrder_failure({ message: errorMessage })
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
          this.messageNZ.create('error', message);
        })
      ),
    {
      dispatch: false,
    }
  );
}
