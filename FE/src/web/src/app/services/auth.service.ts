import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { IExternalLoginRequest, IForgotPassword, IForgotPasswordResponse, ILoginRequest, ILoginResponse } from '../interfaces/account.interface';
import { AuthSlug } from '../configs/api.configs';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, of, tap } from 'rxjs';
import { getCookie, removeAllCookies, removeCookie, replaceCookie } from '../utils/cookie.helper';
import { LocalStorageKey, STRING, USER_ROLE } from '../utils/constant';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FeatureAppState } from '../store/featureApp.state';
import { RouteData } from '../configs/anonymous.config';
import { selectDataUser, selectRole } from '../features/users/state/user.feature';
import { jwtDecode } from 'jwt-decode';
import { UserProfileService } from './user-profile.service';
import { BaseResponseApi } from '../interfaces/api.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { StorageService } from './storage.service';
import { decodeBase64 } from '../utils/anonymous.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //test
  private BASE_URL = 'https://dummyjson.com/auth';

  //test

  private isLoggedSubject = new BehaviorSubject<boolean>(this.checkInitialLoginStatus());
  public routerLinkRedirectURLSubject = new BehaviorSubject<string>('');

  isLoggedIn$: Observable<boolean> = this.isLoggedSubject.asObservable();
  routerLinkRedirectURL$: Observable<string> = this.routerLinkRedirectURLSubject.asObservable();


  constructor(
    private httpClient: AppHttpClientService,
    private http: HttpClient,
    private router: Router,
    private store: Store<FeatureAppState>,
    private userProfileService: UserProfileService,
    private storageService: StorageService
  ) {

  }


  private checkInitialLoginStatus(): boolean {
    return !!getCookie(STRING.ACCESS_TOKEN) && !!getCookie(STRING.REFRESH_TOKEN);
  }


  get token() {
    return getCookie(STRING.ACCESS_TOKEN);
  }

  checkUserLogin$(route: ActivatedRouteSnapshot, url: any): Observable<boolean> {
    //check isLoggedIn$ && data user 
    const data = route.data as RouteData;
    //  const user = this.userProfileService.currentUser ?? 
    const user = { role: 'admin' };  //fixed: cứng admin test
    console.log('line 56:', user);
    return this.isLoggedIn$.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          if (data.expectedRole && !data.expectedRole.includes(user.role)) {
            // Redirect to login or error page if role does not match
            this.router.navigate(['/auth/login']);
            return false;
          }
          return true;
        } else {
          // Redirect to login page if not authenticated
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
    )
  }


  /**
   * 
   * @param otpcode 
   */
  checkOtpCode(otpcode: string): Observable<boolean> {
    let savecodefirst = this.storageService.get(LocalStorageKey.otpCode);
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
  decodedTokenToGiveInfo(token: string): any {
    console.log(token);
    let decoded = jwtDecode(token);
    console.log(decoded);
    return decoded;
  }

  /**
   * 
   * @param token 
   */
  isTokenExpired(token: string): boolean {
    const expiry = jwtDecode(token).exp;
    if (expiry) {
      return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
    }
    return false;
  }



  //test
  startSession({ accesstoken, refreshToken }: any): void {
    replaceCookie(STRING.ACCESS_TOKEN, accesstoken, null);
    // replaceCookie(STRING.REFRESH_TOKEN, refreshToken, null);
    this.storageService.set(LocalStorageKey.currentUser, JSON.stringify(this.decodedTokenToGiveInfo(accesstoken)))
    this.isLoggedSubject.next(true);

    // this.redirectToPageAfter();
  }


  redirectToPageAfter() {
    this.routerLinkRedirectURL$.subscribe((toUrl) => {
      const redirectUrl = toUrl ? this.router.parseUrl(toUrl) : '/test';
      this.router.navigateByUrl(redirectUrl);
    })
  }

  //logout with user 
  endSession(): void {
    this.userProfileService.currentUser = null;
    removeAllCookies();
    this.router.navigate(['/auth/login']);
  }
  //test


  /**
 * 
 * @param data 
 */
  login(data: ILoginRequest): Observable<BaseResponseApi<ILoginResponse>> {
    return this.httpClient.post<BaseResponseApi<ILoginResponse>>(AuthSlug.Login.api, data);
  }


  loginwithGoogle(data: IExternalLoginRequest): Observable<BaseResponseApi<ILoginResponse>> {
    return this.httpClient.post<BaseResponseApi<ILoginResponse>>(AuthSlug.LoginOther.api, data);
  }


  logout(): Observable<any> {
    return this.httpClient.post<any>(AuthSlug.Logout.api);
  }

  forgotPassWord(data: IForgotPassword): Observable<BaseResponseApi<IForgotPasswordResponse>> {
    return this.httpClient.post<BaseResponseApi<IForgotPasswordResponse>>(AuthSlug.ForgotPassWord.api, data);
  }

  resetPassword(): Observable<BaseResponseApi<any>>{
    return this.httpClient.post<BaseResponseApi<any>>(AuthSlug.ResetPassWord.api);
  }

  register(){

  }
  
  renewToken(): Observable<BaseResponseApi<string>> {
    return this.httpClient.post(AuthSlug.RenewToken.api, {
      refreshToken: getCookie(STRING.REFRESH_TOKEN)
    })
  }



}
