import { Component } from '@angular/core';
import { contentCardProcessRental_renter, IItemProcessRental } from '../../../../static/howitorder/howitorder.component';

@Component({
  selector: 'app-brief-procedure-rental',
  templateUrl: './brief-procedure-rental.component.html',
  styleUrl: './brief-procedure-rental.component.scss'
})
export class BriefProcedureRentalComponent {
  commonProcessRental_renter: IItemProcessRental[] =
    contentCardProcessRental_renter;
}
