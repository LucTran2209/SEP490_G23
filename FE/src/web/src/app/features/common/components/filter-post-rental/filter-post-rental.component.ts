import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-filter-product-rental',
  templateUrl: './filter-post-rental.component.html',
  styleUrl: './filter-post-rental.component.scss',
})
export class FilterProductRentalComponent implements OnInit {
  @Input() isSubcategoryPage: boolean = false;
  @Output() locationNames = new EventEmitter<string[]>();
  selectLocationOptions = selectLocationOptions;
  categoryOptions : IITemListNav[] = [];
  subCategory: Subcategory[] = [];
  locations: any[] = [];
  rateStar = rateStar;
  selectBranch = selectBranch;
  selectProductStatus = selectProductStatus;
  rentalPriceRange: number[] = [100000, 5000000];
  constructor(
    private categoryService: CategoryService,
  ){

  }

  onSliderChange(value: number[]): void {
    console.log('Selected rental price range: ', value);
    this.rentalPriceRange = value;
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
    if (item.selected) {
      this.locations.push(item.label); // Add to the list if selected
    } else {
      this.locations = this.locations.filter(location => location !== item.label); // Remove if unselected
    }
    this.locationNames.emit(this.locations);
  }
}
