import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { LoadingService } from '../../../../services/loading.service';
import { MessageResponseService } from '../../../../services/message-response.service';
import { ProductService } from '../../../../services/product.service';
import { updateFilter } from '../../../../store/filters/filter.actions';
import {
  FilterParameters,
  selectFeature_filterState,
} from '../../../../store/filters/filter.reducers';
import * as RentalShopProductActions from './shop-personal.actions';
import { selectShopId } from './shop-personal.reducer';
import { Router } from '@angular/router';
import { getErrorMessage } from '../../../../utils/anonymous.helper';
@Injectable()
export class ShopRentalShopEffects {
  constructor(
    private action$: Actions,
    private loadingService: LoadingService,
    private productSerivce: ProductService,
    private toastMT: MessageResponseService,
    private router: Router,
    private store: Store<{ filter: FilterParameters }>
  ) {}

  processGetListRentalShopProduct$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RentalShopProductActions.getListProductRentalShop),
        tap(() => this.loadingService.setLoading()),
        withLatestFrom(this.store.select(selectFeature_filterState)),
        switchMap(([action, filters]) => {
          return this.productSerivce
            .listProductShopCommon(filters, action.shopId)
            .pipe(
              map(({ data: { items, pageIndex, pageSize, totalCount } }) => {
                return RentalShopProductActions.getListProductRentalShop_success(
                  {
                    productData: items,
                    pageIndex,
                    pageSize,
                    totalCount,
                  }
                );
              }),
              catchError((error) => {
                const errorMessage = getErrorMessage(error);
                const statusCode = error.status || error.statusCode;
                return of(
                  RentalShopProductActions.getListProductRentalShop_failure({
                    message: errorMessage,
                    statusCode,
                  })
                );
              })
            );
        })
      ),
    { dispatch: true }
  );

  processUpdateFilter$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateFilter),
      tap(() => this.loadingService.setLoading()),
      withLatestFrom(
        this.store.pipe(select(selectFeature_filterState)), // Get current filters
        this.store.pipe(select(selectShopId)) // Get shopId from state
      ),
      switchMap(([action, filters, shopId]) =>
        this.productSerivce.listProductShopCommon(filters, shopId).pipe(
          map(({ data: { items, pageIndex, pageSize, totalCount } }) =>
            RentalShopProductActions.getListProductRentalShop_success({
              productData: items,
              pageIndex,
              pageSize,
              totalCount,
            })
          ),
          catchError((error) => {
            const err = error.error.message || 'Đã xảy ra lỗi hiển thị';
            const statusCode = error.status;
            return of(
              RentalShopProductActions.getListProductRentalShop_failure({
                message: err,
                statusCode,
              })
            );
          })
        )
      )
    )
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
          this.toastMT.setErrorCode(statusCode);
          this.router.navigate(['error']);
        })
      ),
    { dispatch: false }
  );
}
