import { Component } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import { PostOutputDto, PostResultService } from '../../../../interfaces/post.interface';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {
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
