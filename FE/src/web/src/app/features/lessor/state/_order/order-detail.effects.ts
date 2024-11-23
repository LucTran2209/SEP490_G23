import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { LoadingService } from '../../../../services/loading.service';
import { MessageResponseService } from '../../../../services/message-response.service';
import { OrderService } from '../../../../services/order.service';
import * as OrderDetailActions from './order-detail.actions';
@Injectable()
export class OrderDetailEffects {
  constructor(
    private actions$: Actions,
    private loadingService: LoadingService,
    private messageResponseMS: MessageResponseService,
    private orderService: OrderService
  ) {}

  processOrderDetail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderDetailActions.getOrderDetail),
        tap(() => this.loadingService.setLoading()),
        switchMap(({ pid }) => {
          return this.orderService.getOrderDetailLessor(pid).pipe(
            map(({ data, message }) => {
              return OrderDetailActions.getOrderDetail_success({
                data: data,
                message,
              });
            }),
            catchError((err) =>
              of(
                OrderDetailActions.getOrderDetail_failure({
                  errMessage: 'có lỗi xảy ra trong quá trình hiển thị',
                })
              ),
            )
          );
        })
      ),
    {
      dispatch: true,
    }
  );
  processOrderDetail_success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderDetailActions.getOrderDetail_success),
        tap(() => {
          this.loadingService.setOtherLoading('loaded');
        })
      ),
    {
      dispatch: false,
    }
  );
  processOrderDetail_failure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderDetailActions.getOrderDetail_failure),
        tap(({ errMessage }) => {
          this.loadingService.setOtherLoading('error');
          this.messageResponseMS.handleError(errMessage);
        }),
      ),
    {
      dispatch: false,
    }
  );
}
