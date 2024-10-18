import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { switchMap, take, throwError } from 'rxjs';
import { AuthSlug } from '../configs/api.configs';
import { SVGcommon } from '../configs/svg-icon';
import * as AuthActions from '../features/auth/state/auth.actions';
import { selectAccessToken } from '../features/auth/state/auth.feature';
import { AuthService } from '../services/auth.service';
import { getApi } from '../utils/anonymous.helper';

/**
 * @description: some of api don't need token on header
 */
const NOT_PROTECTED_URL = [...getApi(AuthSlug), ...SVGcommon];

/**
 *
 * @param req : some of url to give data source from backend and focus on jwt expire
 * if it's expire, redirect to home page and logout user and ohterwhise
 * @param next
 * @returns
 */
export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const store = inject(Store);
  const messageNZ = inject(NzMessageService);
  console.log('req url', req.url);
  const isSkipApi = NOT_PROTECTED_URL.every((url) => !req.url.includes(url));

  if (!isSkipApi) {
    return next(req);
  }
  return next(req);

  // const token$ = store.select(selectAccessToken);
  // console.log('line 24', NOT_PROTECTED_URL);
  // return token$.pipe(
  //   take(1),
  //   switchMap((token) => {
  //     if (authService.isTokenExpired(token)) {
  //       messageNZ.info('Bạn đã hết phiên đăng nhập vui lòng đăng nhập lại');
  //       store.dispatch(AuthActions.logout());
  //       return throwError(
  //         () => new Error('Token expired, redirecting to login page.')
  //       );
  //     }

  //     const clonedRequest = req.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     return next(clonedRequest);
  //   })
  // );
};
