import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RentalTimerService } from '../../../../services/rental-timer.service';
import { filter, Subscription } from 'rxjs';
interface IProductShortSearch {
  id: string | number;
  productName: string;
  rentalPrice: number;
  depositPrice: number;
  rentalLimitDays: number;
  images: string;
}

@Component({
  selector: 'app-form-rental-product',
  templateUrl: './form-rental-product.component.html',
  styleUrl: './form-rental-product.component.scss',
})
export class FormRentalProductComponent implements OnInit, OnDestroy {
  isConfirmLoading = false;
  isVisible = false;
  currentRoute?: string;
  inputValue?: string;
  options: Array<IProductShortSearch> = [];
  tags: IProductShortSearch[] = [];

  //date time
  rangePickerTime: Date[] = [];
  selectedTimeStart: any;
  selectedTimeEnd: any;
  rentalDays: number = 0;
  private routeSubscription?: Subscription;
  //date time

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  handleCloseTag(removedTag: {}): void {
    this.tags = this.tags.filter((tag) => tag !== removedTag);
  }

  onSearchProductShort(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.options = new Array(this.getRandomInt(5, 15))
      .join('.')
      .split('.')
      .map((_item, idx) => ({
        id: idx + 1,
        productName: `${value}${idx}`,
        depositPrice: 20000,
        images:
          'https://cdn.tgdd.vn/Files/2014/12/06/586947/y-nghia-cua-toc-do-quay-vat-tren-may-giat-6.jpg',
        rentalLimitDays: 12,
        rentalPrice: 30000,
      }));
  }

  onSelectProduct(e: IProductShortSearch) {
    this.tags.push(e);
  }

  private getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handlePickerTimer() {}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalTimerService: RentalTimerService
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.url[0].path;

    //datetime
    this.rentalTimerService.rangePickerTime$.subscribe((dates) => {
      this.rangePickerTime = dates;
    });

    this.rentalTimerService.timeStart$.subscribe((time) => {
      this.selectedTimeStart = time;
      console.log('object timeStart',time);
    });

    this.rentalTimerService.timeEnd$.subscribe((time) => {
      this.selectedTimeEnd = time;
      console.log('object timeEnd',time);
    });

    this.rentalTimerService.rentalDays$.subscribe((days) => {
      this.rentalDays = days;
    });
    //datetime

    //unsubscrib
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.rentalTimerService.clearState(); 
      });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
