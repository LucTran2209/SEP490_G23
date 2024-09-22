import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn  = (route, state): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  //router Guard has the role of checking whether the user has the appropriate role to redirect to the branch
  console.log(route);
  console.log(state);

  let url: string = state.url;
  return authService.checkUserLogin$(route,url);
};
