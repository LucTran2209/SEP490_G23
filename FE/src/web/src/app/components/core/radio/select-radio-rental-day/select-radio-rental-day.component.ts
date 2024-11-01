import { Component } from '@angular/core';
import { OptionRadio } from '../../../../configs/anonymous.config';

@Component({
  selector: 'app-select-radio-rental-day',
  templateUrl: './select-radio-rental-day.component.html',
  styleUrl: './select-radio-rental-day.component.scss'
})
export class SelectRadioRentalDayComponent {
 groupOption: OptionRadio[] = mockData;


 onChooseDayAvaiable(val: any){

 }
}

const mockData: OptionRadio[] = [
  {
    icon:"",
    label: "1 ngày",
    value: "1"
  },
  {
    icon:"",
    label: "2 ngày",
    value: "2"
  },
  {
    icon:"",
    label: "3 ngày",
    value: "3"
  },
  {
    icon:"",
    label: "5 ngày",
    value: "4"
  },
  {
    icon:"",
    label: "7 ngày",
    value: "5"
  },
  {
    icon:"",
    label: "10 ngày",
    value: "6"
  },
  {
    icon:"",
    label: "14 ngày",
    value: "7"
  },
]

