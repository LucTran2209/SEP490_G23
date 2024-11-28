import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthSlug } from '../configs/api.configs';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('line 9', route, state.url);
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
