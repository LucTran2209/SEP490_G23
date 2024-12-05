import { Component, OnInit } from '@angular/core';
import { Category, CategoryInputDto, CategoryOutputDto, CategoryResultService, Subcategory, SubcategoryInputDto, SubCategoryResultService } from '../../../../interfaces/category.interface';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { MessageResponseService } from '../../../../services/message-response.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit {
  subcategoryList: Subcategory[] = [];
  categoryList: CategoryOutputDto[] = [];
  loading$?: Observable<StatusProcess>;
  isloading = false;
  searchText: string = '';
  isVisible : boolean = false;
  id: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private loadingService: LoadingService,
    private messageService: MessageResponseService,
  ) {
    this.loading$ = this.loadingService.status$;
  }
  ngOnInit(): void {
    this.loadSucategory();
    this.loadCategory();
  }
  loadSucategory(){
    this.isloading = true;
    this.categoryService.listSubCategory().subscribe((res : SubCategoryResultService) =>{
      this.subcategoryList = res.data;
      this.isloading = false;
      this.loadingService.setOtherLoading('loaded');
    });
  }
  loadCategory(){
    this.isloading = true;
    this.categoryService.listCategory().subscribe((res : CategoryResultService) =>{
      this.categoryList = res.data;
      this.isloading = false;
      this.loadingService.setOtherLoading('loaded');
    });
  }
  getCategoryName(category: Category | string | null): string {
    if (!category) return "[CHƯA CÓ]";
    if (typeof category === 'string') return category;
    return category.categoryName || "[CHƯA CÓ]";
  }
  createCategory(data: CategoryInputDto){
    this.categoryService.createCategory(data).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Thêm Một Danh Mục Chính Mới Thành Công!');
        this.loadSucategory();
        this.loadCategory();
      },
      error: (error) => {
        this.messageService.handleError('Thêm Một Danh Mục Chính Mới Thất Bại!');
      }
    });
  }
  createSubcategory(data: SubcategoryInputDto){
    this.categoryService.createSubcategory(data).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Thêm Một Danh Mục Phụ Mới Thành Công!');
        this.loadSucategory();
        this.loadCategory();
      },
      error: (error) => {
        this.messageService.handleError('Thêm Một Danh Mục Phụ Mới Thất Bại!');
      }
    });
  }
}
