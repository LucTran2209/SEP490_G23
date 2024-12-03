import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoadingService } from '../../../../services/loading.service';
import * as CardOverviewActions from './card-overview.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { DashboardLessorService } from '../../../../services/dashboard-lessor.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable()
export class CardOverviewEffects {
  constructor(
    private actions$: Actions,
    private loadingService: LoadingService,
    private dashboardLessorService: DashboardLessorService,
    private nzToastMessage: NzMessageService
  ) {}

  processGetCardOverview$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CardOverviewActions.getAllCardOverview),
        tap(() => this.loadingService.setLoading()),
        mergeMap(({ bodyReq }) =>
          this.dashboardLessorService.getCardOverview(bodyReq).pipe(
            map(({ data }) =>
              CardOverviewActions.getAllCardOverview_success({
                dataRes: data,
                message: 'Thành công lấy dữ liệu',
              })
            ),
            catchError((err) => {
              console.log(err, 'err');
              return of(CardOverviewActions.getAllCardOverview_failure({message: 'Có lỗi trong quá trình lấy dữ liệu'}));
            })
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  processGetCardOverview_success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CardOverviewActions.getAllCardOverview_success),
        tap(() => {
          this.loadingService.setOtherLoading('loaded');
        })
      ),
    {
      dispatch: false,
    }
  );

  processGetCardOverview_failure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CardOverviewActions.getAllCardOverview_failure),
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
