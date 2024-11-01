import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadingService } from '../../../../services/loading.service';
import * as RentalShopProductActions from './shop-personal.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ProductService } from '../../../../services/product.service';
import { MessageResponseService } from '../../../../services/message-response.service';
@Injectable()
export class ShopRentalShopEffects {
  constructor(
    private action$: Actions,
    private loadingService: LoadingService,
    private productSerivce: ProductService,
    private toastMT: MessageResponseService
  ) {}

  processGetListRentalShopProduct$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RentalShopProductActions.getListProductRentalShop),
        tap(() => this.loadingService.setLoading()),
        switchMap(({ params, shopId }) =>
          this.productSerivce.listProductShopCommon(params, shopId).pipe(
            map(({ data: { items, pageIndex, pageSize, totalCount } }) => {
              console.log('>>> line 25', { items, pageIndex, pageSize, totalCount });
              return RentalShopProductActions.getListProductRentalShop_success({
                data: items,
                pageIndex: pageIndex,
                pageSize: pageSize,
                totalCount: totalCount,
              });
            }),
            catchError((error) => {
              const err = error.error.message || 'Đã xảy ra lỗi hiển thị';
              const statusCode = err.status;
              return of(
                RentalShopProductActions.getListProductRentalShop_failure({
                  message: err,
                  statusCode,
                })
              );
            })
          )
        )
      ),
    { dispatch: true }
  );
  processGetListRentalShopProduct_success$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RentalShopProductActions.getListProductRentalShop_success),
        tap(({}) => {
          this.loadingService.setOtherLoading('loaded');
        })
      ),
    { dispatch: false }
  );
  processGetListRentalShopProduct_failure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RentalShopProductActions.getListProductRentalShop_failure),
        tap(({ message, statusCode }) => {
          this.loadingService.setOtherLoading('error');
          this.toastMT.handleError(message, statusCode);
        })
      ),
    { dispatch: false }
  );
}
