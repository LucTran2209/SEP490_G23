import { Component } from '@angular/core';
import { PostService } from '../../../../services/post.service';
import {
  PostOutputDto,
  PostResultService,
} from '../../../../interfaces/post.interface';
import { selectSortByOrder } from '../../../../configs/post.config';
import { OptionSelect } from '../../../../configs/anonymous.config';

@Component({
  selector: 'app-post-retail-list',
  templateUrl: './post-retail-list.component.html',
  styleUrl: './post-retail-list.component.scss',
})
export class PostRetailListComponent {
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
