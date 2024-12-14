import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthSlug } from '../configs/api.configs';
import { AuthService } from '../services/auth.service';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated$.pipe(
    take(1), 
    map(isAuthenticated => {
      if (isAuthenticated && !state.url.includes( AuthSlug.ChangePassword.label)) {
        router.navigate(['/common/home']);
        return false;
      }
      return true;
    })
  );
};
