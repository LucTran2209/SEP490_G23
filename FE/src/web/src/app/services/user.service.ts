import { Injectable } from '@angular/core';
import { AppHttpClientService } from './app-http-client.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserSlug } from '../configs/api.configs';
import { ActiveUserInputDto, ListUserOutputDto, UserInputDto, UserResultService } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
    return this.httpClient.get<UserResultService>(UserSlug.ListUser.api);
  }
  searchUser(): Observable<UserResultService>{
    return this.httpClient.get<UserResultService>(UserSlug.FilterUser.api);
  }
  viewProfile(userName: string){
    return this.httpClient.get(UserSlug.GetUser.api + userName);
  }
  updateProfile(data : UserInputDto){
    return this.httpClient.post(UserSlug.UpdateUser.api, { updateProfileInputDto: data});
  }
  addUser(data : UserInputDto){
    return this.httpClient.put(UserSlug.AddUser.api, { addNewUserInputDto: data});
  }
  activeUser(data : ActiveUserInputDto){
    return this.httpClient.post(UserSlug.ActiveUser.api, {activeUserInputDto : data})
  }
}
