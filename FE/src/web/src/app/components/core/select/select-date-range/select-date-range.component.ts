import { Component, Input } from '@angular/core';
import { FormatDate } from '../../../../utils/constant';

@Component({
  selector: 'app-select-date-range',
  templateUrl: './select-date-range.component.html',
  styleUrl: './select-date-range.component.scss'
})
export class SelectDateRangeComponent {
  @Input() nzMode: 'date' | 'week' | 'month' | 'quarter' | 'year' = 'date';
  @Input() formatDate: string = FormatDate.DDMMYYYY;
  @Input() nzSize: 'large' | 'small' | 'default' = 'large'
}
