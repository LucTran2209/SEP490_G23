import { Component, OnInit } from '@angular/core';
import { PostOutputDto, PostResultService } from '../../../../interfaces/post.interface';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  backgroundImageUrl: string = 'assets/images/header-home.png';
  items = [1, 2, 3, 4, 5];
  postList: PostOutputDto[] = [];
  constructor(private postService: PostService) {}
  ngOnInit(): void{
    this.loadPosts();
  }
  loadPosts(){
    this.postService.listPost().subscribe((res: PostResultService) =>{
      this.postList = res.datas.list;
    });
  }
}
