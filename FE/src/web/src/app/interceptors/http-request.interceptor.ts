import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { switchMap } from 'rxjs';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('>>> http-request:',req);
  return next(req)
};
