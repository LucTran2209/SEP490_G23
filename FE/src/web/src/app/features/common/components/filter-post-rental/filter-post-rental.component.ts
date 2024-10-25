import { Component } from '@angular/core';
import { IITemListNav } from '../../../../configs/anonymous.config';
import { rateStar } from '../../../../configs/post.config';
import {
  categoryOptions,
  selectBranch,
  selectLocationOptions,
  selectProductStatus,
} from '../../../../mock/post';
import { convertCurrency } from '../../../../utils/anonymous.helper';

@Component({
  selector: 'app-filter-product-rental',
  templateUrl: './filter-post-rental.component.html',
  styleUrl: './filter-post-rental.component.scss',
})
export class FilterProductRentalComponent {
  selectLocationOptions = selectLocationOptions;
  categoryOptions = categoryOptions;
  rateStar = rateStar;
  selectBranch = selectBranch;
  selectProductStatus = selectProductStatus;
  rentalPriceRange: number[] = [100000, 5000000];

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
}
