import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RentalTimerService } from '../../services/rental-timer.service';

@Component({
  selector: 'app-rental-period',
  templateUrl: './rental-period.component.html',
  styleUrl: './rental-period.component.scss',
})
export class RentalPeriodComponent {
@Output() handleOpenPeriod = new EventEmitter<any>();
  openSetPeriod(){
    this.handleOpenPeriod.emit();
  }

  rangePickerTime: Date[] = [];
  selectedTimeStart: any;
  selectedTimeEnd: any;

  constructor(private rentalTimerService: RentalTimerService) {}

  ngOnInit(): void {
    this.rentalTimerService.rangePickerTime$.subscribe((dates) => {
      this.rangePickerTime = dates;
    });

    this.rentalTimerService.timeStart$.subscribe((time) => {
      this.selectedTimeStart = time;
    });

    this.rentalTimerService.timeEnd$.subscribe((time) => {
      this.selectedTimeEnd = time;
    });

  }

}
