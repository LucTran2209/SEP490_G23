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
    const roleCheck: string[] = ([] as string[]).concat(
      this.userProfileService.roleCurrentUser ?? []
    );
   const expectedRole = Array.isArray(data.expectedRole) ? data.expectedRole : [];
   const hasExpectedRole =  expectedRole.length === roleCheck?.length && expectedRole.every((val, index) => val === roleCheck[index]);
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
   * @param token
   * @returns
   * @description
   */
  decodedTokenToGiveInfo(token: string) {
    let decoded = jwtDecode<IPayLoad>(token);
    return decoded;
  }

  isTokenExpired(): boolean {
    if (!this.token) {
      return true; 
    }
    try {
      const { exp } = jwtDecode(this.token);
      if (exp) {
        const currentTime = Math.floor(new Date().getTime() / 1000); 
        return currentTime >= exp;
      }
      return true; 
    } catch (error) {
      console.error('Invalid token:', error); 
      return true; 
    }
  }

  startSession(accessToken: string, refreshToken: string): void {
    const userPayLoad = this.decodedTokenToGiveInfo(accessToken);

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

  //test
  // changepassword(data: IChangePassword): Observable<ResultService>{
  //   return this.httpClient.post(AuthSlug.ChangePassWord.api, { changePasswordInputDto: data});
  // }
  changepassword(data: IChangePassword) {
    return this.httpClient.post(AuthSlug.ChangePassword.api, data);
  }
}
