import { Component, EventEmitter, Input, Output } from '@angular/core';
import { timePeriodSelect } from '../../../configs/timer.config';
import { RentalTimerService } from '../../../services/rental-timer.service';

@Component({
  selector: 'app-picker-timer',
  templateUrl: './picker-timer.component.html',
  styleUrl: './picker-timer.component.scss',
})
export class PickerTimerComponent {
  timeChooseStart = timePeriodSelect;
  timeChooseEnd = timePeriodSelect;
  constructor(private rentalTimerService: RentalTimerService) {}

  onDateRangeChange(dates: Date[]): void {
    this.rentalTimerService.setRangePickerTime(dates);
  }

  onChangeTimeStart(value: any): void {
    this.rentalTimerService.setTimeStart(value);
  }

  onChangeTimeEnd(value: any): void {
    this.rentalTimerService.setTimeEnd(value);
  }
  // onDatePickerChange(dates: Date): void {
  //   console.log('Ngày đã chọn thue theo gio:', dates);
  // }

  chooseOption1() {}
}
