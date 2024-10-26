import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PostOutputDto, PostResultService } from '../interfaces/post.interface';
import { Observable, of } from 'rxjs';
import { PostSlug } from '../configs/api.configs';
import { AppHttpClientService } from './app-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postList: PostResultService = {
    statusCode: "OK",
    message: "Success",
    datas: {
      list: [
        {
          postId: 1,
          postName: 'Máy giặt XQB30MJ102W',
          postImg: 'https://mi360.vn/wp-content/uploads/2023/06/may-giat-mini-3kg-xiaomi-mijia-xqb30mj102w-mi-360-6.jpg',
          authorName: 'Nguyễn Văn A',
          authorAddress: 'Hà Nội'
        },
        {
          postId: 2,
          postName: 'Máy giặt XQB30MJ102W',
          postImg: 'https://mi360.vn/wp-content/uploads/2023/06/may-giat-mini-3kg-xiaomi-mijia-xqb30mj102w-mi-360-6.jpg',
          authorName: 'Trần Thị B',
          authorAddress: 'Hồ Chí Minh'
        },
        {
          postId: 3,
          postName: 'Máy giặt XQB30MJ102W',
          postImg: 'https://mi360.vn/wp-content/uploads/2023/06/may-giat-mini-3kg-xiaomi-mijia-xqb30mj102w-mi-360-6.jpg',
          authorName: 'Trần Thị C',
          authorAddress: 'Hồ Chí Minh'
        },
        {
          postId: 4,
          postName: 'Máy giặt XQB30MJ102W',
          postImg: 'https://mi360.vn/wp-content/uploads/2023/06/may-giat-mini-3kg-xiaomi-mijia-xqb30mj102w-mi-360-6.jpg',
          authorName: 'Trần Thị C',
          authorAddress: 'Đà Nẵng'
        },
        // {
        //   postId: 5,
        //   postName: 'Máy giặt XQB30MJ102W',
        //   postImg: 'https://mi360.vn/wp-content/uploads/2023/06/may-giat-mini-3kg-xiaomi-mijia-xqb30mj102w-mi-360-6.jpg',
        //   authorName: 'Trần Thị C',
        //   authorAddress: 'Đà Nẵng'
        // },
      ]
    }
  };

  constructor(private http: HttpClient, private httpClient: AppHttpClientService) { }
  listPost(): Observable<PostResultService>{
    // return this.httpClient.get<PostResultService>(PostSlug.ListPost.api);
    return of(this.postList);
  }
}
