import { Component, Input } from '@angular/core';
import { IItemProcessRental } from '../../../../features/common/static/howitorder/howitorder.component';

@Component({
  selector: 'card-static',
  templateUrl: './card-static.component.html',
  styleUrl: './card-static.component.scss'
})
export class CardStaticComponent {
  @Input() obj?: IItemProcessRental;
}
