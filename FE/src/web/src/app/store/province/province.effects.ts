import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProvinceActions from './province.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { ProvinceVNService } from '../../services/province-vn.service';
@Injectable()
export class ProvinceEffect {
  constructor(
    private action$: Actions,
    private provinceService: ProvinceVNService
  ) {}

  getProvince_process$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ProvinceActions.getProvince),
        switchMap(() =>
          this.provinceService.getListProvince().pipe(
            map((res) => {
              return ProvinceActions.getProvince_success({ dataP: res.data });
            }),
            catchError(() => {
              return of(
                ProvinceActions.getProvince_failure({ errorMessage: '' })
              );
            })
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  getDistrict_process$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ProvinceActions.getDistrict),
        switchMap(({ id }) =>
          this.provinceService.getListDistrict(id).pipe(
            map((res) => {
              return ProvinceActions.getDistrict_success({ dataD: res.data });
            }),
            catchError(() => {
              return of(
                ProvinceActions.getDistrict_failure({ errorMessage: '' })
              );
            })
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  gettWardOrCommume_process$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ProvinceActions.getWardOrCommume),
        switchMap(({ id }) =>
          this.provinceService.getListWardCommune(id).pipe(
            map((res) => {
              return ProvinceActions.getWardOrCommume_success({
                dataW: res.data,
              });
            }),
            catchError(() => {
              return of(
                ProvinceActions.getWardOrCommume_failure({ errorMessage: '' })
              );
            })
          )
        )
      ),
    {
      dispatch: true,
    }
  );

  processSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        ProvinceActions.getProvince_success,
        ProvinceActions.getDistrict_success,
        ProvinceActions.getWardOrCommume_success
      ),
      tap((data) => {
       
      })
    ),
    {
      dispatch: false,
    }
  );

  processFailure$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        ProvinceActions.getDistrict_failure,
        ProvinceActions.getProvince_failure,
        ProvinceActions.getWardOrCommume_failure
      ),
      tap((err) => {
        console.log('error:', err);
      })
    ),
    {
      dispatch: false,
    }
  );
}
