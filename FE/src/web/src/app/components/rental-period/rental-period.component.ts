import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rental-period',
  templateUrl: './rental-period.component.html',
  styleUrl: './rental-period.component.scss'
})
export class RentalPeriodComponent {
@Output() handleOpenPeriod = new EventEmitter<any>();
  openSetPeriod(){
    this.handleOpenPeriod.emit();
  }
}
