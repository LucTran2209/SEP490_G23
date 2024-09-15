import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { IForgotPassword, ILoginRequest } from '../interfaces/account.interface';
import { AuthSlug } from '../configs/api.configs';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable, tap } from 'rxjs';
import { getCookie, replaceCookie } from '../utils/cookie.helper';
import { LocalStorageKey, STRING, USER_ROLE } from '../utils/constant';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FeatureAppState } from '../store/featureApp.state';
import { RouteData } from '../configs/anonymous.config';
import { selectDataUser, selectRole } from '../features/users/state/user.feature';
import { jwtDecode } from 'jwt-decode';
import { UserProfileService } from './user-profile.service';

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
    private router: Router,
    private store: Store<FeatureAppState>,
    private userProfileService : UserProfileService
  ) { 

  }


  private checkInitialLoginStatus(): boolean {
    return !!getCookie(STRING.ACCESS_TOKEN) && !!getCookie(STRING.REFRESH_TOKEN);
  }


  get token(){
    return getCookie(STRING.ACCESS_TOKEN);
  }

  checkUserLogin$(route: ActivatedRouteSnapshot, url: any): Observable<boolean>{
    //check isLoggedIn$ && data user 
    const data = route.data as RouteData;
    //  const user = this.userProfileService.currentUser ?? 
    const user = {role: 'admin'};  //fixed: cứng admin test
    console.log('line 56:',user);
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
 * @param token 
 * @returns 
 */
  decodedTokenToGiveInfo(token: string): any{
    let decoded  = jwtDecode(token);
    console.log(decoded);
    return decoded;
  }

  /**
   * 
   * @param token 
   */
  isTokenExpired(token: string): boolean{
    const expiry = jwtDecode(token).exp;
    if(expiry){
      return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
    }
    return false;
  }


  /**
   * 
   * @param data 
   */
  login(data: ILoginRequest): Observable<any> {
    // return this.httpClient.post<any>(AuthSlug.Login.api, data);

    //test api
    return this.httpClient.post<any>(this.BASE_URL + '/login',
      { username: 'emilys', password: 'emilyspass', expiresInMins: 2 }
    ).pipe(
      map(response => {
        const {token, refreshToken} = response;
        const decodedToken = this.decodedTokenToGiveInfo(token);
        return {token, refreshToken, decodedToken};
      })
    );
    //test api
  }


  logout() {

  }

  forgotPassWord(data: IForgotPassword): Observable<any> {
    return this.httpClient.post<any>(AuthSlug.ForgotPassWord.api, data);
  }

  // startSession({ accessToken, refreshToken, user }: any): void {
  //   replaceCookie(STRING.ACCESS_TOKEN, accessToken, null);
  //   replaceCookie(STRING.REFRESH_TOKEN, refreshToken, null);

  //   this.isLoggedSubject.next(true);
  //   this.routerLinkRedirectURL$.subscribe((toUrl) => {
  //     const redirectUrl = toUrl ? this.router.parseUrl(toUrl) : '/test';
  //     this.router.navigateByUrl(redirectUrl);
  //   })

  // }


  //test
  startSession({ token, refreshToken,decodedToken }: any): void {
    replaceCookie(STRING.ACCESS_TOKEN, token, null);
    replaceCookie(STRING.REFRESH_TOKEN, refreshToken, null);

    this.isLoggedSubject.next(true);

    this.redirectToPageAfter();
  }


  redirectToPageAfter(){
    this.routerLinkRedirectURL$.subscribe((toUrl) => {
      const redirectUrl = toUrl ? this.router.parseUrl(toUrl) : '/test';
      this.router.navigateByUrl(redirectUrl);
    })
  }
  //test

}
