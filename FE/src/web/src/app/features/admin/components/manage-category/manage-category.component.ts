import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  Category,
  CategoryInputDto,
  CategoryOutputDto,
  CategoryResultService,
  Subcategory,
  SubcategoryInputDto,
  SubCategoryResultService,
} from '../../../../interfaces/category.interface';
import { StatusProcess } from '../../../../interfaces/anonymous.interface';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../services/loading.service';
import { MessageResponseService } from '../../../../services/message-response.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ChooseCreateCategoryComponent } from '../../../../components/modal/choose-create-category/choose-create-category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss',
})
export class ManageCategoryComponent implements OnInit {
  categoryInformation!: CategoryInputDto;
  subcategoryInformation!: SubcategoryInputDto;
  categoryTilte: string = '';
  subcategoryTitle: string = '';
  subcategoryList: Subcategory[] = [];
  categoryList: CategoryOutputDto[] = [];
  chooseCreateCategoryRef: NzModalRef | null = null;
  loading$?: Observable<StatusProcess>;
  isloading = false;
  searchText: string = '';
  isVisibleMain: boolean = false;
  isVisibleSecondary: boolean = false;
  id: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private loadingService: LoadingService,
    private messageService: MessageResponseService,
    private nzModalService: NzModalService
  ) {
    this.loading$ = this.loadingService.status$;
  }
  ngOnInit(): void {
    this.loadSucategory();
    this.loadCategory();
    this.categoryTilte = "Tạo danh mục chính";
    this.subcategoryTitle = "Tạo danh mục phụ";
  }
  loadSucategory() {
    this.isloading = true;
    this.categoryService
      .listSubCategory()
      .subscribe((res: SubCategoryResultService) => {
        this.subcategoryList = res.data;
        this.isloading = false;
        this.loadingService.setOtherLoading('loaded');
      });
  }
  loadCategory() {
    this.isloading = true;
    this.categoryService
      .listCategory()
      .subscribe((res: CategoryResultService) => {
        this.categoryList = res.data;
        this.isloading = false;
        this.loadingService.setOtherLoading('loaded');
      });
  }
  getCategoryName(category: Category | string | null): string {
    if (!category) return '[CHƯA CÓ]';
    if (typeof category === 'string') return category;
    return category.categoryName || '[CHƯA CÓ]';
  }
  getCategoryById(subcategory : Subcategory){
    if (subcategory.category && typeof subcategory.category !== "string") {
      this.isVisibleMain = true;
      this.categoryInformation = {
        id: subcategory.category.id,
        categoryName: subcategory.category.categoryName,
      };
      this.categoryTilte = "Cập nhật danh mục chính";
    }
  }
  getSubcategoryById(subcategory : Subcategory){
    if (subcategory.category && typeof subcategory.category !== "string") {
      this.isVisibleSecondary = true;
      this.subcategoryInformation = {
        id: subcategory.id,
        categoryId: subcategory.category.id,
        subCategoryName: subcategory.subCategoryName,
        description: subcategory.description,
      };
      this.subcategoryTitle = "Cập nhật danh mục phụ";
    }
  }
  createCategory(data: CategoryInputDto){
    this.categoryService.createCategory(data).subscribe({
      next: (response) => {
        this.messageService.showSuccess(
          'Thêm Một Danh Mục Chính Mới Thành Công!'
        );
        this.loadSucategory();
        this.loadCategory();
        this.onToggleEndModal();
      },
      error: (error) => {
        this.messageService.handleError(
          'Thêm Một Danh Mục Chính Mới Thất Bại!'
        );
        this.onToggleEndModal();
      },
    });
    this.onToggleEndModal();
  }
  updateCategory(data: CategoryInputDto){

    this.categoryService.updateCategory(data).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Cập Nhật Danh Mục Chính Thành Công!');
        this.loadSucategory();
        this.loadCategory();
        this.onToggleEndModal();
      },
      error: (error) => {
        this.messageService.handleError('Cập Nhật Danh Mục ChínhThất Bại!');
        this.onToggleEndModal();
      }
    });
  }
  createSubcategory(data: SubcategoryInputDto){
    this.categoryService.createSubcategory(data).subscribe({
      next: (response) => {
        this.messageService.showSuccess(
          'Thêm Một Danh Mục Phụ Mới Thành Công!'
        );
        this.loadSucategory();
        this.loadCategory();
        this.onToggleEndModal();
      },
      error: (error) => {
        this.messageService.handleError('Thêm Một Danh Mục Phụ Mới Thất Bại!');
        this.onToggleEndModal();
      },
    });
    
  }

 
  updateSubcategory(data: SubcategoryInputDto){
    this.categoryService.updateSubcategory(data).subscribe({
      next: (response) => {
        this.messageService.showSuccess('Cập Nhật Danh Mục Phụ Thành Công!');
        this.loadSucategory();
        this.loadCategory();
        this.onToggleEndModal();
      },
      error: (error) => {
        this.messageService.handleError('Cập Nhật Danh Mục Phụ Thất Bại!');
        this.onToggleEndModal();
      }
    });
    
  }

   // namnh come here
   chooseOptionCreateCategory() {
    this.chooseCreateCategoryRef = this.nzModalService.create({
      nzTitle: 'Chọn tạo loại danh mục',
      nzFooter: null,
      nzCloseIcon: '',
      nzWidth: 700,
      nzContent: ChooseCreateCategoryComponent,
    });
    const instance = this.chooseCreateCategoryRef.getContentComponent();
    if (instance) {
      instance.typeCreateCateogry.subscribe((selectedCategory: number) => {
        if (selectedCategory === 1) {
          this.isVisibleSecondary = true;
        } else if (selectedCategory === 0) {
          this.isVisibleMain = true;
        }
        this.cdRef.detectChanges();
        if (this.chooseCreateCategoryRef) {
          this.chooseCreateCategoryRef.close();
        }
      });
    }
   
  }
  onToggleEndModal(): void {
    this.isVisibleMain = false;
    this.isVisibleSecondary = false;
    this.categoryTilte = "Tạo danh mục chính";
    this.subcategoryTitle = "Tạo danh mục phụ";
  }
}
