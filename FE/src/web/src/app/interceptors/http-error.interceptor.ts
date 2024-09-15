// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, Observable, throwError } from 'rxjs';
// import { ErrorMessages } from '../utils/constant';


// @Injectable()

// export class httpErrorInterceptor implements HttpInterceptor {

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         const { status } = error;
//         if (status === 500) return this.handleApiError(req, next, error);
//         if (status === 400) return this.handleBadRequest(req, next, error);
//         if (status === 401) return this.handleUnauthorized(req, next, error);
//         if (status === 404) return this.handleNotFound(req, next, error);
//         return throwError(() => error);
//       }
//       ))
//   }

//   protected handleApiError(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): HttpErrorResponse {

//   }

//   protected handleBadRequest(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): HttpErrorResponse {

//   }

//   protected handleUnauthorized(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): HttpErrorResponse {
//     const e = error.error;
//     if(e.message === ErrorMessages.INVALID_TOKEN) return this.handleInvalidToken(request, next, error);
//     if(e.message === ErrorMessages.TOKEN_EXPIRED) return this.handleExpiredToken(request, next, error);
//     if(e.message === ErrorMessages.REFRESH_TOKEN_EXPIRED) return this.handleExpiredRefreshToken(request, next, error);
//   }

//   protected handleNotFound(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): HttpErrorResponse {

//   }

//   private handleExpiredToken(request: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse){

//   }
// }




