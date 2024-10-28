import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Danh sách các URL không muốn đính kèm token
const ignoredUrls: string[] = [
  '/public-api/login',
  '/public-api/register',
  '/health-check',
  'https://esgoo.net/api-tinhthanh/'
];

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  const shouldIgnore = ignoredUrls.some(url => req.url.includes(url));

  const clonedRequest = !shouldIgnore && token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(clonedRequest);
};
