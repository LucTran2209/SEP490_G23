import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { UserSlug } from '../configs/api.configs';
import { ActiveUserInputDto, UserOutputDto, UserInputDto, UserResultService, ProfileResultService, UserUpdateInputDto } from '../interfaces/user.interface';
import { BaseResponseApi } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //test
  private BASE_URL = 'https://dummyjson.com/auth';

  //test

  constructor(private http: HttpClient, private httpClient: AppHttpClientService) { }

  //test get data current user
  getCurrentUser(token: string): Observable<any> {
    const url = this.BASE_URL + '/me';
    return this.httpClient.get<any>(url, {
      headers: {
        'Authorization': token
      }
    });
  }
  //test
  listUser(pageIndex: number, pageSize: number, FullName?: string, Email?: string, PhoneNumber?: string, Address?: string, Gender?: string, DateOfBirth?: string): Observable<UserResultService>{
    let params: any = {
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    };
    if (FullName) params.FullName = FullName;
    if (Email) params.Email = Email;
    if (PhoneNumber) params.PhoneNumber = PhoneNumber;
    if (Address) params.Address = Address;
    if (Gender) params.Gender = Gender;
    if (DateOfBirth) params.DateOfBirth = DateOfBirth;

    return this.httpClient.get<UserResultService>(UserSlug.ListUser.api, params );
  }
  // searchUser(): Observable<UserResultService>{
    // const params = {
    //   PageSize: pageSize.toString(),
    //   PageIndex: pageIndex.toString(),
    // };
  //   return this.httpClient.get<UserResultService>(UserSlug.FilterUser.api);
  // }
  viewProfile(userId: string): Observable<ProfileResultService>{
    return this.httpClient.get<ProfileResultService>(UserSlug.GetUser.api + userId);
  }
  updateProfile(data : UserUpdateInputDto): Observable<BaseResponseApi<null>>{
    return this.httpClient.put<BaseResponseApi<null>>(UserSlug.UpdateUser.api,  data);
  }
  addUser(data : UserInputDto): Observable<BaseResponseApi<null>>{
    return this.httpClient.post<BaseResponseApi<null>>(UserSlug.AddUser.api, data);
  }
  activeUser(data : ActiveUserInputDto): Observable<BaseResponseApi<null>>{
    return this.httpClient.put<BaseResponseApi<null>>(UserSlug.ActiveUser.api, data)
  }
}
