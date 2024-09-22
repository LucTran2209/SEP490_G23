import { HttpEventType, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';
// import { mapApiResponse } from '../utils/transform.helper';
export const responseInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    map(event => {
      if (event instanceof HttpResponse) {
        const body = event.body;


        if (body && (body as any).datas) {
          const { datas, ...rest } = body as any;
          let modifiedBody = {
            data: datas,
            ...rest
          };

          // modifiedBody = mapApiResponse(modifiedBody);

          return event.clone({
            body: modifiedBody
          })
        }
      }
      return event;
    })
  );
};
