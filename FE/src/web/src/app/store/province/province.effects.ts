import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProvinceVnService } from '../../services/province-vn.service';
import * as ProvinceActions from './province.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs';
@Injectable()
export class ProvinceEffect {
  constructor(
    private action$: Actions,
    private provinceService: ProvinceVnService
  ) {}

  getProvince_process$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(ProvinceActions.getProvince),
        mergeMap(() =>
          this.provinceService.getProvinces().pipe(
            map((res) => {
              return ProvinceActions.getProvince_success({ dataP: res.data });
            })
            // catchError(() => {
            //     return ProvinceActions.getProvince_failure({errorMessage: ''});
            // })
          )
        )
      ),
    {
      dispatch: true,
    }
  );
}
