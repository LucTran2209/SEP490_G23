import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import {
  MappingLinkAfterLoginByRoles,
  RouteData,
} from '../configs/anonymous.config';
import { AuthSlug } from '../configs/api.configs';
import {
  IChangePassword,
  IExternalLoginRequest,
  IForgotPassword,
  ILoginRequest,
  ILoginResponse,
  IPayLoad,
  IRegisterRequest,
  IResetPassword,
} from '../interfaces/account.interface';
import { BaseResponseApi } from '../interfaces/api.interface';
import { FeatureAppState } from '../store/app.state';
import { decodeBase64 } from '../utils/anonymous.helper';
import { LocalStorageKey, STRING, USER_ROLE } from '../utils/constant';
import {
  getCookie,
  removeAllCookies,
  replaceCookie,
} from '../utils/cookie.helper';
import { AppHttpClientService } from './app-http-client.service';
import { StorageService } from './storage.service';
import { UserProfileService } from './user-profile.service';
import { selectIsAuthenticated } from '../features/auth/state/auth.feature';
import { MessageResponseService } from './message-response.service';
import { ErrorStatusCode } from '../configs/status-code.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public routerLinkRedirectURLSubject = new BehaviorSubject<string>('');

  private routerLinkRedirectURL$: Observable<string> =
    this.routerLinkRedirectURLSubject.asObservable();

  constructor(
    private httpClient: AppHttpClientService,
    private http: HttpClient,
    private router: Router,
    private store: Store<FeatureAppState>,
    private userProfileService: UserProfileService,
    private storageService: StorageService,
    private errorPage: MessageResponseService
  ) {}

  get token() {
    return getCookie(STRING.ACCESS_TOKEN);
  }

  get isAuthenticated$() {
    return this.store.select(selectIsAuthenticated);
  }

  checkUserLogin$(
    route: ActivatedRouteSnapshot,
    url: any
  ): Observable<boolean> {
    const data = route.data as RouteData;
    const roleCheck = this.userProfileService.roleCurrentUser;
   const expectedRole = Array.isArray(data.expectedRole) ? data.expectedRole : [];
  
   const hasExpectedRole = expectedRole.some((r) => {
     return roleCheck?.includes(r);
   });
   console.log(hasExpectedRole, "hasExpectedRole");
    return this.isAuthenticated$.pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          if (!hasExpectedRole) {
            this.errorPage.setErrorCode(ErrorStatusCode.FORBIDDEN);
            this.router.navigate(['error']);
            return false;
          }
          return true;
        } else {
          this.router.navigate(['auth/login']);
          return false;
        }
      })
    );
  }

  /**
   *
   * @param otpcode
   */
  checkOtpCode(otpcode: string): Observable<boolean> {
    let savecodefirst = getCookie(STRING.OTPCODE);
    if (savecodefirst) {
      let decodeotpcode = decodeBase64(savecodefirst);
      if (otpcode === decodeotpcode) {
        return of(true);
      }
    } else {
      return of(false);
    }
    return of(false);
  }
  /**
   *
   * @param token
   * @returns
   * @description
   */
  decodedTokenToGiveInfo(token: string) {
    let decoded = jwtDecode<IPayLoad>(token);
    console.log('line 128', decoded);
    return decoded;
  }

  /**
   *
   * @param token
   */
  isTokenExpired(token: string | null): boolean {
    if (!token) {
      return true;
    }
    try {
      const expiry = jwtDecode(token).exp;
      if (expiry) {
        return Math.floor(new Date().getTime() / 1000) <= expiry;
      }
    } catch (error) {
      return true;
    }
    return true;
  }

  startSession(accessToken: string, refreshToken: string): void {
    const userPayLoad = this.decodedTokenToGiveInfo(accessToken);

    // const roleId =
    //   Array.isArray(userPayLoad.roleId) && userPayLoad.roleId.length > 0
    //     ? userPayLoad.roleId[0]
    //     : userPayLoad.roleId;

    // const redirectUrl =
    //   roleId !== undefined
    //     ? MappingLinkAfterLoginByRoles[roleId as USER_ROLE] ?? '/common/home'
    //     : '/common/home';

    replaceCookie(STRING.ACCESS_TOKEN, accessToken, userPayLoad.exp, '/');
    replaceCookie(STRING.REFRESH_TOKEN, refreshToken, null, '/');
    this.storageService.set(
      LocalStorageKey.currentUser,
      JSON.stringify(userPayLoad)
    );
    // this.routerLinkRedirectURLSubject.next(redirectUrl);

    this.redirectToPageAfter();
  }

  redirectToPageAfter(): void {
    this.routerLinkRedirectURL$.subscribe((toUrl) => {
      const redirectUrl = toUrl ? this.router.parseUrl(toUrl) : '/common/home';
      this.router.navigateByUrl(redirectUrl);
    });
  }

  //logout with user
  endSession(): void {
    removeAllCookies();
    window.localStorage.clear();
    window.location.href = '/common/home';
  }

  /**
   *
   * @param data
   */
  login(data: ILoginRequest): Observable<BaseResponseApi<ILoginResponse>> {
    return this.httpClient.post<BaseResponseApi<ILoginResponse>>(
      AuthSlug.Login.api,
      data
    );
  }

  loginwithGoogle(
    data: IExternalLoginRequest
  ): Observable<BaseResponseApi<ILoginResponse>> {
    return this.httpClient.post<BaseResponseApi<ILoginResponse>>(
      AuthSlug.LoginOther.api,
      data
    );
  }

  logout() {
    this.endSession();
  }

  forgotPassWord(data: IForgotPassword): Observable<BaseResponseApi<null>> {
    return this.httpClient.post<BaseResponseApi<null>>(
      AuthSlug.ForgotPassWord.api,
      data
    );
  }

  resetPassword(data: IResetPassword): Observable<BaseResponseApi<any>> {
    return this.httpClient.post<BaseResponseApi<any>>(
      AuthSlug.ResetPassWord.api,
      data
    );
  }

  register(data: IRegisterRequest): Observable<BaseResponseApi<null>> {
    return this.httpClient.post<BaseResponseApi<null>>(
      AuthSlug.Register.api,
      data
    );
  }

  renewToken(): Observable<BaseResponseApi<string>> {
    return this.httpClient.post(AuthSlug.RenewToken.api, {
      refreshToken: getCookie(STRING.REFRESH_TOKEN),
    });
  }
  //test
  // changepassword(data: IChangePassword): Observable<ResultService>{
  //   return this.httpClient.post(AuthSlug.ChangePassWord.api, { changePasswordInputDto: data});
  // }
  changepassword(data: IChangePassword) {
    return this.httpClient.post(AuthSlug.ChangePassword.api, data);
  }
}
