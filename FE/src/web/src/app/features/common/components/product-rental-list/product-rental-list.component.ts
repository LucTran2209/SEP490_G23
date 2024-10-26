import { Component } from '@angular/core';
import { PostOutputDto, PostResultService } from '../../../../interfaces/post.interface';
import { OptionSelect } from '../../../../configs/anonymous.config';
import { PostService } from '../../../../services/post.service';
import { selectSortByOrder } from '../../../../configs/post.config';

@Component({
  selector: 'app-product-rental-list',
  templateUrl: './product-rental-list.component.html',
  styleUrl: './product-rental-list.component.scss'
})
export class ProductRentalListComponent {
  selectedValue = null;
  postList: PostOutputDto[] = [];
  groupOptionFilterSelect: OptionSelect[] = selectSortByOrder;
  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.loadPosts();
  }
  loadPosts() {
    this.postService.listPost().subscribe((res: PostResultService) => {
      this.postList = res.datas.list;
    });
  }
}
