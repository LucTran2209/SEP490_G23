import { Component, Input } from '@angular/core';
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
  isPickerOpen = false;
  submitDate() {
    this.isPickerOpen = true;

  }

  onOpenChange(open: boolean): void {
    this.isPickerOpen = open;
  }

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) > 0;
}
