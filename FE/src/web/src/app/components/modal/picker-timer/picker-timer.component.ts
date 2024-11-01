import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timePeriodSelect } from '../../../configs/timer.config';
import { RentalTimerService } from '../../../services/rental-timer.service';
import { Store } from '@ngrx/store';
import { FeatureAppState } from '../../../store/app.state';
import {
  selectAllProductRental,
  selectRentalActualPriceById,
} from '../../../features/common/state/rental/rental.selectors';
import { map, Observable, startWith, take, tap } from 'rxjs';
import { OrderState } from '../../../features/common/state/rental/rental.reducers';
import { setNumberOfDays } from '../../../features/common/state/rental/rental.actions';

@Component({
  selector: 'app-picker-timer',
  templateUrl: './picker-timer.component.html',
  styleUrl: './picker-timer.component.scss',
})
export class PickerTimerComponent implements OnInit {
  timeChooseStart = timePeriodSelect;
  timeChooseEnd = timePeriodSelect;
  selectAllProductRental$?: Observable<OrderState[]>;

  constructor(
    private rentalTimerService: RentalTimerService,
    private store: Store<FeatureAppState>
  ) {}

  ngOnInit(): void {
    this.selectAllProductRental$ = this.store.select(selectAllProductRental);
  }

  onDateRangeChange(dates: Date[]): void {
    const diffInDays = this.rentalTimerService.convertRentalDays(dates);
    this.selectAllProductRental$?.pipe(
      tap((res) => { console.log('data', res); }),
      take(1) 
    ).subscribe((orders) => {
      orders.forEach((order) => {
        const productId = order.productId;
        if (productId) {
          this.store.dispatch(
            setNumberOfDays({
              days: diffInDays,
              pid: productId,
            })
          );
        }
      });
    });

    this.rentalTimerService.setRangePickerTime(dates);
  }

  onChangeTimeStart(value: any): void {
    this.rentalTimerService.setTimeStart(value);
  }

  onChangeTimeEnd(value: any): void {
    this.rentalTimerService.setTimeEnd(value);
  }

  disabledDate = (current: Date): boolean => {
    return current && current.getTime() < new Date().setHours(0, 0, 0, 0);
  };
}
