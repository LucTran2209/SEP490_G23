import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, Subscription, take, tap } from 'rxjs';
import { timePeriodSelect } from '../../../configs/timer.config';
import { setNumberOfDays } from '../../../features/common/state/rental/rental.actions';
import { OrderState } from '../../../features/common/state/rental/rental.reducers';
import { selectAllProductRental } from '../../../features/common/state/rental/rental.selectors';
import { RentalTimerService } from '../../../services/rental-timer.service';
import { FeatureAppState } from '../../../store/app.state';

@Component({
  selector: 'app-picker-timer',
  templateUrl: './picker-timer.component.html',
  styleUrl: './picker-timer.component.scss',
})
export class PickerTimerComponent implements OnInit, OnDestroy {
  timeChooseStart = timePeriodSelect;
  timeChooseEnd = timePeriodSelect;
  rangeDatePicker?: Date[];
  timePickerTo: any = { label: '00:00', value: '00:00' };
  timePickerEnd: any = { label: '23:30', value: '23:30' };
  selectAllProductRental$?: Observable<OrderState[]>;
  //date time
  rangePickerTime$?: Observable<Date[]>;
  selectedTimeStart$?: Observable<any>;
  selectedTimeEnd$?: Observable<any>;
  rentalDays$?: Observable<number>;
  //date time
  //subscription
  private pickerTimeSubscription?: Subscription;
  //subscription
  constructor(
    private rentalTimerService: RentalTimerService,
    private store: Store<FeatureAppState>,
    private modalRef: NzModalRef
  ) {
    console.log(this.timeChooseStart,'timeChooseStart');
  }

  ngOnInit(): void {
    this.selectAllProductRental$ = this.store.select(selectAllProductRental);
  }
  ngOnDestroy(): void {
    if (this.pickerTimeSubscription) {
      this.pickerTimeSubscription.unsubscribe();
    }
  }

  isDisabled(): boolean {
    return (
      this.rangeDatePicker &&
      this.rangeDatePicker.length === 2 &&
      this.timePickerEnd &&
      this.timePickerTo
    );
  }

  handleOkPickTime(): void {
    if (
      this.rangeDatePicker &&
      this.rangeDatePicker.length === 2 &&
      this.timePickerEnd &&
      this.timePickerTo
    ) {
      this.rangeDatePicker[0] = this.rentalTimerService.setTimeForDate(
        this.rangeDatePicker[0],
        this.timePickerTo.label
      );
      this.rangeDatePicker[1] = this.rentalTimerService.setTimeForDate(
        this.rangeDatePicker[1],
        this.timePickerEnd.label
      );
      console.log('this.rangeDatePicker', this.rangeDatePicker); 
      console.log('this.rangeDatePicker 1', this.rangeDatePicker[0].toISOString()); 
      console.log('this.rangeDatePicker 2', this.rangeDatePicker[1].toISOString()); 
      const diffInDays = this.rentalTimerService.convertRentalDays(
        this.rangeDatePicker
      );

      this.pickerTimeSubscription = this.selectAllProductRental$
        ?.pipe(
          take(1)
        )
        .subscribe((orders) => {
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
      this.rentalTimerService.setRangePickerTime(this.rangeDatePicker);
      this.rentalTimerService.setTimeStart(this.timePickerTo);
      this.rentalTimerService.setTimeEnd(this.timePickerEnd);
    }
    this.modalRef.triggerOk();
  }

  disabledDate = (current: Date): boolean => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return current && current.getTime() < tomorrow.getTime();
  };
}
