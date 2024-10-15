import { Component } from '@angular/core';
import { checkCategory, checkLocationOptions } from '../../../../mock/post';
import { CheckboxItem } from '../../../../components/core/view-more-item/view-more-item.component';

@Component({
  selector: 'app-filter-post-rental',
  templateUrl: './filter-post-rental.component.html',
  styleUrl: './filter-post-rental.component.scss',
})
export class FilterPostRentalComponent {
  checkOptionsOne = checkLocationOptions;
  checkOptionCategory = checkCategory;

  onCategory(item: CheckboxItem) {
    console.log('Location changed:', item);
  }
}
