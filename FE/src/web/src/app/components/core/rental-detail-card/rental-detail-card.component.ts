import { Component } from '@angular/core';

@Component({
  selector: 'app-rental-detail-card',
  templateUrl: './rental-detail-card.component.html',
  styleUrl: './rental-detail-card.component.scss'
})
export class RentalDetailCardComponent {

  selectedTimeOption: string = 'day'; 
  dateRange: Date[] = [];
  month: Date | null = null;
  year: Date | null = null;
}
