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
  // private useList: UserResultService = {
  //   statusCode: "OK",
  //   message: "Success",
  //   data: {
  //     items: [
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e20",
  //         "fullName": "Nguyễn Văn A",
  //         "userName": "nguyenvana",
  //         "email": "nguyenvana@example.com",
  //         "phoneNumber": "0123456789",
  //         "address": "Hà Nội",
  //         "gender": true,
  //         "dateOfBirth": "1990-01-01T00:00:00.000",
  //         "isActive": true,
  //         "listRole": []
  //       },
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e26",
  //         "fullName": "Trần Thị B",
  //         "userName": "tranthib",
  //         "email": "tranthib@example.com",
  //         "phoneNumber": "0987654321",
  //         "address": "Hồ Chí Minh",
  //         "gender": false,
  //         "dateOfBirth": "1995-05-05T00:00:00.000",
  //         "isActive": false,
  //         "listRole": []
  //       },
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e26",
  //         "fullName": "Trần Thị B",
  //         "userName": "tranthib",
  //         "email": "tranthib@example.com",
  //         "phoneNumber": "0987654321",
  //         "address": "Hồ Chí Minh",
  //         "gender": false,
  //         "dateOfBirth": "1995-05-05T00:00:00.000",
  //         "isActive": false,
  //         "listRole": []
  //       },
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e20",
  //         "fullName": "Nguyễn Văn A",
  //         "userName": "nguyenvana",
  //         "email": "nguyenvana@example.com",
  //         "phoneNumber": "0123456789",
  //         "address": "Hà Nội",
  //         "gender": true,
  //         "dateOfBirth": "1990-01-01T00:00:00.000",
  //         "isActive": true,
  //         "listRole": []
  //       },
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e26",
  //         "fullName": "Trần Thị B",
  //         "userName": "tranthib",
  //         "email": "tranthib@example.com",
  //         "phoneNumber": "0987654321",
  //         "address": "Hồ Chí Minh",
  //         "gender": false,
  //         "dateOfBirth": "1995-05-05T00:00:00.000",
  //         "isActive": false,
  //         "listRole": []
  //       },
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e26",
  //         "fullName": "Trần Thị B",
  //         "userName": "tranthib",
  //         "email": "tranthib@example.com",
  //         "phoneNumber": "0987654321",
  //         "address": "Hồ Chí Minh",
  //         "gender": false,
  //         "dateOfBirth": "1995-05-05T00:00:00.000",
  //         "isActive": false,
  //         "listRole": []
  //       },
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e20",
  //         "fullName": "Nguyễn Văn A",
  //         "userName": "nguyenvana",
  //         "email": "nguyenvana@example.com",
  //         "phoneNumber": "0123456789",
  //         "address": "Hà Nội",
  //         "gender": true,
  //         "dateOfBirth": "1990-01-01T00:00:00.000",
  //         "isActive": true,
  //         "listRole": []
  //       },
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e26",
  //         "fullName": "Trần Thị B",
  //         "userName": "tranthib",
  //         "email": "tranthib@example.com",
  //         "phoneNumber": "0987654321",
  //         "address": "Hồ Chí Minh",
  //         "gender": false,
  //         "dateOfBirth": "1995-05-05T00:00:00.000",
  //         "isActive": false,
  //         "listRole": []
  //       },
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e26",
  //         "fullName": "Trần Thị B",
  //         "userName": "tranthib",
  //         "email": "tranthib@example.com",
  //         "phoneNumber": "0987654321",
  //         "address": "Hồ Chí Minh",
  //         "gender": false,
  //         "dateOfBirth": "1995-05-05T00:00:00.000",
  //         "isActive": false,
  //         "listRole": []
  //       },
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e20",
  //         "fullName": "Nguyễn Văn A",
  //         "userName": "nguyenvana",
  //         "email": "nguyenvana@example.com",
  //         "phoneNumber": "0123456789",
  //         "address": "Hà Nội",
  //         "gender": true,
  //         "dateOfBirth": "1990-01-01T00:00:00.000",
  //         "isActive": true,
  //         "listRole": []
  //       },
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e26",
  //         "fullName": "Trần Thị B",
  //         "userName": "tranthib",
  //         "email": "tranthib@example.com",
  //         "phoneNumber": "0987654321",
  //         "address": "Hồ Chí Minh",
  //         "gender": false,
  //         "dateOfBirth": "1995-05-05T00:00:00.000",
  //         "isActive": false,
  //         "listRole": []
  //       },
  //       {
  //         "id": "ca26a6d1-1d9d-4e59-9f2f-2ca5a24c8e26",
  //         "fullName": "Trần Thị B",
  //         "userName": "tranthib",
  //         "email": "tranthib@example.com",
  //         "phoneNumber": "0987654321",
  //         "address": "Hồ Chí Minh",
  //         "gender": false,
  //         "dateOfBirth": "1995-05-05T00:00:00.000",
  //         "isActive": false,
  //         "listRole": []
  //       }
  //     ],
  //     pageSize: 10,
  //     pageIndex: 1,
  //     totalCount: 2
  //   }
  // };


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
  searchUser(): Observable<UserResultService>{
    // const params = {
    //   PageSize: pageSize.toString(),
    //   PageIndex: pageIndex.toString(),
    // };
    return this.httpClient.get<UserResultService>(UserSlug.FilterUser.api);
  }
  viewProfile(userName: string): Observable<ProfileResultService>{
    return this.httpClient.get<ProfileResultService>(UserSlug.GetUser.api + userName);
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
