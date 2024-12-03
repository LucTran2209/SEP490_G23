import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-select-date-range',
  templateUrl: './select-date-range.component.html',
  styleUrl: './select-date-range.component.scss',
})
export class SelectDateRangeComponent {
  today = new Date();
  selectedDateRange: Date[] = this.getCurrentAndLast12MonthsDate();
  isPickerOpen = false;
  @Input() nzMode: 'date' | 'week' | 'month' | 'quarter' | 'year' = 'date';
  @Input() nzSize: 'large' | 'small' | 'default' = 'large';
  @Output() onFilterDate = new EventEmitter<Date[]>();

  onDateChange(dates: Date[]) {
    this.onFilterDate.emit(dates);
  }

  getCurrentAndLast12MonthsDate() {
    const currentDate = new Date(); 
    const last12MonthsDate = new Date(); 
    last12MonthsDate.setMonth(last12MonthsDate.getMonth() - 12); 

    return [last12MonthsDate, currentDate];
}
  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) > 0;

  constructor() {
    this.getCurrentAndLast12MonthsDate();
  }
}
