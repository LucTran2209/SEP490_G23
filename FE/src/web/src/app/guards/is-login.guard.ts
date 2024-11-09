import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1), 
    map(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['/common/home']);
        return false;
      }
      return true;
    })
  );
};
