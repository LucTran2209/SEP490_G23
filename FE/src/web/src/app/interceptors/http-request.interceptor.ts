import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { finalize, switchMap, throwError, timer } from 'rxjs';
import { MessageResponseService } from '../services/message-response.service';
import { AuthSlug, CategorySlug, FeedBackSlug, ProductSlug, RentalShopSlug, VoucherSlug } from '../configs/api.configs';

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
  const messageResponse  = inject(MessageResponseService);
  const shouldIgnore = ignoredUrls.some(url => req.url.includes(url));
  if (!token && !shouldIgnore && authService.isTokenExpired()) {
    messageResponse.handleError('Hết phiên token vui lòng đăng nhập lại', 401);

    return timer(3000).pipe(
      switchMap(() => {
        authService.logout();
        return throwError(() => new Error('Token expired, please log in again.'));
      })
    );
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
