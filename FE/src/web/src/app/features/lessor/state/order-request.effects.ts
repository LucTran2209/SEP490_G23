import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  map,
  of,
  switchMap,
  tap
} from 'rxjs';
import { LoadingService } from '../../../services/loading.service';
import { MessageResponseService } from '../../../services/message-response.service';
import { OrderService } from '../../../services/order.service';
import { FeatureAppState } from '../../../store/app.state';
import * as RequestOrderActions from './order-request.actions';
import { Route, Router } from '@angular/router';
@Injectable()
export class OrderRequestEffects {
  constructor(
    private actions$: Actions,
    private loadingService: LoadingService,
    private messageResponseMS: MessageResponseService,
    private orderService: OrderService,
    private store: Store<FeatureAppState>,
    private route: Router
  ) {}

  processOrderRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RequestOrderActions.requestOrderInit),
        tap(() => this.loadingService.setLoading()),
        switchMap(({ formData, pid }) =>
          this.orderService.requestOrderStatus(formData).pipe(
            map((res) => RequestOrderActions.requestOrder_sucess({ pid })),
            catchError((err) => {
              return of(RequestOrderActions.requestOrder_failure());
            })
          )
        )
      ),
    {
      dispatch: true,
    }
  );
  processOrderRequest_success$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestOrderActions.requestOrder_sucess),
      tap(() => {
        this.loadingService.setOtherLoading('loaded');
        this.messageResponseMS.showSuccess('Cập nhật trạng thái thành công');
      }),
    ),
    {
      dispatch: false,
    }
  );
  processOrderRequest_failure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RequestOrderActions.requestOrder_failure),
        tap(() => {
          this.loadingService.setOtherLoading('error');
          this.messageResponseMS.handleError('Cập nhật trạng thái thất bại');
        })
      ),
    {
      dispatch: false,
    }
  );
}
