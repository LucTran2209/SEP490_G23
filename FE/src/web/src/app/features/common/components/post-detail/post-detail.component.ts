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
  isVisible : boolean = false;
  title: string = 'Biểu Mẫu Đăng Ký Cho Thuê';
  
  constructor(private postService: PostService) {}
  ngOnInit(): void{
    this.loadPosts();
  }
  loadPosts(){
    this.postService.listPost().subscribe((res: PostResultService) =>{
      this.postList = res.datas.list;
    });
  }
  ShowRentalForm(){
    this.isVisible = true;
  }
  handleCloseModal(){
    this.isVisible = false;
  }

}
