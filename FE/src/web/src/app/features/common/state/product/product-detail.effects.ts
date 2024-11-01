import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadingService } from '../../../../services/loading.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ProductService } from '../../../../services/product.service';
import * as ProductDetailActions from './product-detail.actions';
import { MessageResponseService } from '../../../../services/message-response.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as RentalProduct from '../rental/rental.actions';
import { Store } from '@ngrx/store';
@Injectable()
export class ProductDetailEffects {
  constructor(
    private action$: Actions,
    private loadingService: LoadingService,
    private productSerivce: ProductService,
    private toastMT: MessageResponseService,
    private store: Store
  ) {}

  processGetDetailProduct$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ProductDetailActions.getDetailProductRental),
        tap(() => this.loadingService.setLoading()),
        switchMap(({ productId }) =>
          this.productSerivce.getProductDetail(productId).pipe(
            map(({ data }) => {
              // set init price
              return ProductDetailActions.getDetailProductRental_success({
                data,
              });
            }),
            catchError((err: HttpErrorResponse) => {
              const errorMessage = err.message || 'Đã xảy ra lỗi hiển thị';
              const statusCode = err.status;
              return of(
                ProductDetailActions.getDetailProductRental_failure({
                  message: errorMessage,
                  statusCode,
                })
              );
            })
          )
        )
      ),
    { dispatch: true }
  );  
  processGetDetailProduct_success$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ProductDetailActions.getDetailProductRental_success),
        tap(({data}) => {
          this.loadingService.setOtherLoading('loaded');
           // set init price
          this.store.dispatch(
            RentalProduct.setInit({
              pid: data.id,
              depositPrice: data.depositPrice,
              quantityAvailable: data.quantity,
              rentalPrice: data.rentalPrice
            })
          )
          // set init price
        })
      ),
    { dispatch: false }
  );
  processGetDetailProduct_failure$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ProductDetailActions.getDetailProductRental_failure),
        tap(({ message, statusCode }) => {
          this.loadingService.setOtherLoading('error');
          this.toastMT.handleError(message, statusCode);
        })
      ),
    { dispatch: false }
  );
}
