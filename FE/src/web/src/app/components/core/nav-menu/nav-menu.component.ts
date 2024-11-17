import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CategoryOutputDto, CategoryResultService, Subcategory, SubcategoryOutputDto, SubCategoryResultService } from '../../../interfaces/category.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit{
  @Output() getClassName: EventEmitter<void> = new EventEmitter<void>();
  categoryList: CategoryOutputDto[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
      this.loadCategory();
  }

  onNavigate(val: SubcategoryOutputDto){
    this.router.navigate(['/common/product-list',val.subCategoryName,'caid',val.id]);
  }
  loadCategory(){
    this.categoryService.listCategory().subscribe((res : CategoryResultService) =>{
      this.categoryList = res.data;
    });
  }

}
