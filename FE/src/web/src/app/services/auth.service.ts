import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { IChangePassword, ILoginRequest, ResultService } from '../interfaces/account.interface';
import { AuthSlug } from '../configs/api.configs';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { getCookie, replaceCookie } from '../utils/cookie.helper';
import { STRING, USER_ROLE } from '../utils/constant';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FeatureAppState } from '../store/featureApp.state';
import { RouteData } from '../configs/anonymous.config';
import { selectDataUser, selectRole } from '../features/users/state/user.feature';

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

  //test
  role$: Observable<string> = this.store.select(selectRole);

  //test
  constructor(
    private httpClient: AppHttpClientService,
    private router: Router,
    private store: Store<FeatureAppState>
  ) { 

    this.store.select(selectDataUser).subscribe((d) => console.log(d));
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
    return combineLatest([this.isLoggedIn$, this.role$]).pipe(
      map(([isAuthenticated, userRole]) => {
        if (isAuthenticated) {
          if (data.expectedRole && !data.expectedRole.includes(userRole)) {
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
    );
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
    );
    //test api
  }





  logout() {

  }

  forgotPassWord() {

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
  startSession({ token, refreshToken }: any): void {
    replaceCookie(STRING.ACCESS_TOKEN, token, null);
    replaceCookie(STRING.REFRESH_TOKEN, refreshToken, null);

    this.isLoggedSubject.next(true);
  }


  redirectToPageAfter(){
    this.routerLinkRedirectURL$.subscribe((toUrl) => {
      const redirectUrl = toUrl ? this.router.parseUrl(toUrl) : '/test';
      this.router.navigateByUrl(redirectUrl);
    })
  }
  //test
  changepassword(data: IChangePassword): Observable<ResultService>{
    return this.httpClient.post(AuthSlug.ChangePassWord.api, { changePasswordInputDto: data});
  }

}
