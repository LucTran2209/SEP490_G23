import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IITemListNav } from '../../../../configs/anonymous.config';
import { rateStar } from '../../../../configs/post.config';
import {
  categoryOptions,
  selectBranch,
  selectLocationOptions,
  selectProductStatus,
} from '../../../../mock/post';
import { convertCurrency } from '../../../../utils/anonymous.helper';
import { CategoryService } from '../../../../services/category.service';
import { Subcategory, SubCategoryResultService } from '../../../../interfaces/category.interface';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-filter-product-rental',
  templateUrl: './filter-post-rental.component.html',
  styleUrl: './filter-post-rental.component.scss',
})
export class FilterProductRentalComponent implements OnInit, OnDestroy {
  @Output() locationNames = new EventEmitter<string[]>();
  @Output() SubCategorySelected = new EventEmitter<string>();
  @Output() PriceRangeSelected = new EventEmitter<number[]>();
  selectLocationOptions = selectLocationOptions;
  categoryOptions : IITemListNav[] = [];
  subCategory: Subcategory[] = [];
  locations: any[] = [];
  rateStar = rateStar;
  selectBranch = selectBranch;
  selectProductStatus = selectProductStatus;
  rentalPriceRange: number[] = [10000, 1000000];
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ){

  }

  onSliderChange(value: number[]): void {
    console.log('Selected rental price range: ', value);
    this.rentalPriceRange = value;
    this.PriceRangeSelected.emit(this.rentalPriceRange);
  }

  onCategory(item: IITemListNav) {
    console.log('Location changed:', item);
  }

  onLoadMore(e: boolean) {}

  onConvertPrice(value: number): string {
    return convertCurrency(value);
  }

  ngOnInit(): void {
    this.loadSubCategory();  // Load subcategories on component init

  }
  ngOnDestroy(): void {
    this.resetLocationCheckbox();
  }

  resetLocationCheckbox(): void {
    this.selectLocationOptions.forEach(option => {
      option.checked = false;
    });
  }

  loadSubCategory(): void {
    this.categoryService.listSubCategory().subscribe((res: SubCategoryResultService) => {
      this.subCategory = res.data;
      this.categoryOptions = this.subCategory.map(subcategory => ({
        label: subcategory.subCategoryName,
        href: `/common/product-list/${subcategory.subCategoryName}/caid/${subcategory.id}`
      }));
      console.log('Mapped Category Options: ', this.categoryOptions);  // Log the mapped category options
    });
  }
  onCheckboxChange(item: any) {
    if (item.checked) {
      this.locations.push(item.label); // Add to the list if selected
    } else {
      this.locations = this.locations.filter(location => location !== item.label); // Remove if unselected
    }
    this.locationNames.emit(this.locations);
  }
  onSelectSubCategory(subcategoryName: string) {
    // Tìm subcategory dựa trên subcategoryName
    const selectedSubCategory = this.subCategory.find(
      (subcategory) => subcategory.subCategoryName === subcategoryName
    );
  
    if (selectedSubCategory) {
      // Phát id của subcategory nếu tìm thấy
      this.SubCategorySelected.emit(selectedSubCategory.id);
    } 
  }
}
