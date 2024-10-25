import { Component } from '@angular/core';
import { timePeriodSelect } from '../../../configs/timer.config';

@Component({
  selector: 'app-picker-timer',
  templateUrl: './picker-timer.component.html',
  styleUrl: './picker-timer.component.scss',
 
})
export class PickerTimerComponent {
  timeChooseStart = timePeriodSelect;
  timeChooseEnd = timePeriodSelect;
  selectedTimeStart = { label: '00:00', value: '00:00' };
  selectedTimeEnd = { label: '00:00', value: '00:00' };

  onChangeTimeStart(value: any) {
    
  }
  onChangeTimeEnd(value: any) {
    
  }
}
