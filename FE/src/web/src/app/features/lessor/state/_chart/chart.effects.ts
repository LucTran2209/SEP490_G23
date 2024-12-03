import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadingService } from '../../../../services/loading.service';
import * as ChartOrderActions from './chartOrder-overview.actions';
import * as ChartRevenueActions from './chartRevenue-overview.actions';
import * as ChartTopSubCategoryActions from './chartTopSubCategory-overview.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { DashboardLessorService } from '../../../../services/dashboard-lessor.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable()
export class ChartOverviewEffects {
  constructor(
    private actions$: Actions,
    private loadingService: LoadingService,
    private dashboardLessorService: DashboardLessorService,
    private nzToastMessage: NzMessageService
  ) {}

  processGetDataChartTopSubCategory$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChartTopSubCategoryActions.getDATACHARTSUBCATEGORY),
        tap(() => this.loadingService.setLoading()),
        mergeMap(({ bodyReq }) =>
          this.dashboardLessorService.getDataChartTopSubCategory(bodyReq).pipe(
            map(({ data }) =>
              ChartTopSubCategoryActions.getDATACHARTSUBCATEGORY_success({
                dataRes: data,
                message: 'Thành công lấy dữ liệu',
              })
            ),
            catchError((err) => {
              console.error(err, 'err');
              return of(
                ChartTopSubCategoryActions.getDATACHARTSUBCATEGORY_failure({
                  message: 'Có lỗi trong quá trình lấy dữ liệu',
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
  processGetDataChartRevenue$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChartRevenueActions.getDATACHARTREVENUE),
        tap(() => this.loadingService.setLoading()),
        mergeMap(({ bodyReq, typeOption }) => {
          if (typeOption === 'm') {
            return this.dashboardLessorService
              .getDataChartRevenue1(bodyReq)
              .pipe(
                map(({ data }) =>
                  ChartRevenueActions.getDATACHARTREVENUE_success({
                    dataRes: data,
                    message: 'Thành công lấy dữ liệu',
                  })
                ),
                catchError((err) => {
                  console.error(err, 'err');
                  return of(
                    ChartRevenueActions.getDATACHARTREVENUE_failure({
                      message: 'Có lỗi trong quá trình lấy dữ liệu',
                    })
                  );
                })
              );
          } else {
            return this.dashboardLessorService
              .getDataChartRevenue2(bodyReq)
              .pipe(
                map(({ data }) =>
                  ChartRevenueActions.getDATACHARTREVENUE_success({
                    dataRes: data,
                    message: 'Thành công lấy dữ liệu',
                  })
                ),
                catchError((err) => {
                  console.error(err, 'err');
                  return of(
                    ChartRevenueActions.getDATACHARTREVENUE_failure({
                      message: 'Có lỗi trong quá trình lấy dữ liệu',
                    })
                  );
                })
              );
          }
        })
      ),
    {
      dispatch: true,
    }
  );
  processGetDataChartOrder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChartOrderActions.getDATACHARTORDER),
        tap(() => this.loadingService.setLoading()),
        mergeMap(({ bodyReq }) =>
          this.dashboardLessorService.getDataChartOrder(bodyReq).pipe(
            map(({ data }) =>
              ChartOrderActions.getDATACHARTORDER_success({
                dataRes: data,
                message: 'Thành công lấy dữ liệu',
              })
            ),
            catchError((err) => {
              console.error(err, 'err');
              return of(
                ChartOrderActions.getDATACHARTORDER_failure({
                  message: 'Có lỗi trong quá trình lấy dữ liệu',
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

  processGetChart_success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ChartOrderActions.getDATACHARTORDER_success,
          ChartRevenueActions.getDATACHARTREVENUE_success,
          ChartTopSubCategoryActions.getDATACHARTSUBCATEGORY
        ),
        tap(() => {
          this.loadingService.setOtherLoading('loaded');
        })
      ),
    {
      dispatch: false,
    }
  );

  processGetChart_failure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ChartOrderActions.getDATACHARTORDER_failure,
          ChartRevenueActions.getDATACHARTREVENUE_failure,
          ChartTopSubCategoryActions.getDATACHARTSUBCATEGORY_failure
        ),
        tap(({ message }) => {
          this.loadingService.setOtherLoading('error');
          this.nzToastMessage.error(message);
        })
      ),
    {
      dispatch: false,
    }
  );
}
