import { HttpErrorResponse, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, finalize, map, switchMap, throwError, timer } from 'rxjs';
import { MessageResponseService } from '../services/message-response.service';
import { AuthSlug, CategorySlug, FeedBackSlug, ProductSlug, RentalShopSlug, VoucherSlug } from '../configs/api.configs';
import { Store } from '@ngrx/store';
import { selectIsRefreshing } from '../features/auth/state/auth.feature';
import { getCookie } from '../utils/cookie.helper';
import { STRING } from '../utils/constant';
import { logout, refreshToken_init } from '../features/auth/state/auth.actions';

const ignoredUrls: string[] = [
  AuthSlug.Login.api,
  AuthSlug.ForgotPassWord.api,
  AuthSlug.Register.api,
  AuthSlug.ResetPassWord.api,
  AuthSlug.VerifyEmail.api,
  AuthSlug.IsExistEmail.api,
  AuthSlug.ConfirmEmail.api,
  CategorySlug.ListCategory.api,
  CategorySlug.ListSubCategory.api,
  'https://esgoo.net/api-tinhthanh/',
  ProductSlug.RentalShopProduct.api,
  ProductSlug.GetDetailProduct.api,
  ProductSlug.ListProduct.api,
  RentalShopSlug.GetRentalShop.api,
  FeedBackSlug.ListFeedBack.api,
  VoucherSlug.ListVoucher.api,
  VoucherSlug.MyVoucher.api
];

//exist when authentication, but don't want to redirect to login page
const exceptionUrls: string[] = [
  VoucherSlug.MyVoucher.api
]

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;
  let authReq = req;
  const messageResponse  = inject(MessageResponseService);
  const shouldIgnore = ignoredUrls.some(url => req.url.includes(url));
  if (!token && !shouldIgnore && authService.isTokenExpired()) {
    // messageResponse.handleError('Hết phiên token vui lòng đăng nhập lại', 401);

    // return timer(3000).pipe(
    //   switchMap(() => {
    //     authService.logout();
    //     return throwError(() => new Error('Token expired, please log in again.'));
    //   })
    // );

    return next(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes(AuthSlug.Login.api) && error.status === 401) {
        return handle401Error(authReq, next);
      }
      return throwError(() => new Error());
    }));
  }

  const clonedRequest = !shouldIgnore && token || exceptionUrls
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(clonedRequest);
};

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn) {
  const store = inject(Store);
  const refreshToken = getCookie(STRING.REFRESH_TOKEN);
  const access_token = getCookie(STRING.ACCESS_TOKEN) || '';

  return store.select(selectIsRefreshing).pipe(
    switchMap((isRefresh) => {
      if (!isRefresh && refreshToken) {
        store.dispatch(refreshToken_init({ data: { refreshToken, token: access_token } }));
      }
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return next(clonedRequest);
    }),
    catchError((error) => {
      console.error('Token refresh failed:', error);
      store.dispatch(logout());
      return throwError(() => new Error('Token refresh failed'));
    })
  );
}
