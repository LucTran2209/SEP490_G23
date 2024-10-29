import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CategoryOutputDto, CategoryResultService } from '../../../interfaces/category.interface';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit{
  @Output() getClassName: EventEmitter<void> = new EventEmitter<void>();
  categoryList: CategoryOutputDto[] = [];
  handlegetClassName() {
    // console.log(e.target.id, e.target.className);
    this.getClassName.emit();
  }
  constructor(
    private categoryService: CategoryService,
  ) {}
  
  ngOnInit(): void {
      this.loadCategory();
  }
  loadCategory(){
    this.categoryService.listCategory().subscribe((res : CategoryResultService) =>{
      this.categoryList = res.data;
    });
  }
}
