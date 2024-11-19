import {
  Component,
  OnInit
} from '@angular/core';
import { SubCategoryStatisticComponent } from './statistics/sub-category-statistic/sub-category-statistic.component';
import { RevenueStatisticComponent } from './statistics/revenue-statistic/revenue-statistic.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
  components = [RevenueStatisticComponent, SubCategoryStatisticComponent];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    arrows: false
  };
  constructor() {}

  ngOnInit(): void {}
}
