import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserSlug } from '../configs/api.configs';
import { ActiveUserInputDto, ListUserOutputDto, UserInputDto, UserResultService } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private useList: UserResultService = {
    statusCode: "OK",
    message: "Success",
    datas: {
      list: [
        {
          "fullName": "Nguyễn Văn A",
          "userName": "nguyenvana",
          "email": "nguyenvana@example.com",
          "phoneNumber": "0123456789",
          "address": "Hà Nội",
          "gender": true,
          "dateOfBirth": "1990-01-01T00:00:00.000",
          "isActive": true
        },
        {
          "fullName": "Trần Thị B",
          "userName": "tranthib",
          "email": "tranthib@example.com",
          "phoneNumber": "0987654321",
          "address": "Hồ Chí Minh",
          "gender": false,
          "dateOfBirth": "1995-05-05T00:00:00.000",
          "isActive": false
        }
      ]
    }
  };


  //test
  private BASE_URL = 'https://dummyjson.com/auth';

  //test

  constructor(private httpClient: HttpClient) { }

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
  listUser(): Observable<UserResultService>{
    // return this.httpClient.get<UserResultService>(UserSlug.ListUser.api);
    return of(this.useList);
  }
  searchUser(): Observable<UserResultService>{
    return this.httpClient.get<UserResultService>(UserSlug.FilterUser.api);
  }
  viewProfile(userName: string){
    return this.httpClient.get(UserSlug.GetUser.api + userName);
  }
  updateProfile(data : UserInputDto){
    return this.httpClient.post(UserSlug.UpdateUser.api,  data);
  }
  addUser(data : UserInputDto){
    return this.httpClient.put(UserSlug.AddUser.api, data);
  }
  activeUser(data : ActiveUserInputDto){
    return this.httpClient.post(UserSlug.ActiveUser.api, data)
  }
}
