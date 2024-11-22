import { Component, EventEmitter, Input, Output } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'app-select-date-range',
  templateUrl: './select-date-range.component.html',
  styleUrl: './select-date-range.component.scss',
})
export class SelectDateRangeComponent {
  today = new Date();
  @Input() nzMode: 'date' | 'week' | 'month' | 'quarter' | 'year' = 'date';
  @Input() nzSize: 'large' | 'small' | 'default' = 'large';
  @Output() onFilterDate = new EventEmitter<any>();
  submitDate(val: any) {
    this.onFilterDate.emit(val);
  }

 

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) > 0;
}
