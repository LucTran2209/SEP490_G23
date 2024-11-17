import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthSlug } from '../configs/api.configs';
import { selectIsHasConditionRegister } from '../features/auth/state/auth.feature';
import { MessageResponseService } from '../services/message-response.service';
import { STRING } from '../utils/constant';
import { getCookie } from '../utils/cookie.helper';

export const checkRegisterCommonGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const errorPage =  inject(MessageResponseService);
  let emailGenerate = getCookie(STRING.EMAIL);
  let otpCodeGenerate = getCookie(STRING.OTPCODE);
  return store.select(selectIsHasConditionRegister).pipe(
    map((res) => {
      if (res && emailGenerate && otpCodeGenerate) {
        return true
      } else {
        // errorPage.setErrorCode(ErrorStatusCode.BAD_REQUEST);
        router.navigateByUrl(`/auth/${AuthSlug.VerifyEmail.label}`)
        return false
      }
    })
  );
};
