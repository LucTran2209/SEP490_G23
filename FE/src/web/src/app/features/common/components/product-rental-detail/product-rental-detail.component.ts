import { Component } from '@angular/core';
import { PostOutputDto, PostResultService } from '../../../../interfaces/post.interface';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-product-rental-detail',
  templateUrl: './product-rental-detail.component.html',
  styleUrl: './product-rental-detail.component.scss'
})
export class ProductRentalDetailComponent {
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
