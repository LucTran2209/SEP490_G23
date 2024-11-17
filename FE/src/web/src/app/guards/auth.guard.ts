import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn  = (route, state): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  let url: string = state.url;
  return authService.checkUserLogin$(route,url);
};

