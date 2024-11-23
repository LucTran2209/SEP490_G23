import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionSelect } from '../../../../configs/anonymous.config';

@Component({
  selector: 'app-select-view-statistic',
  templateUrl: './select-view-statistic.component.html',
  styleUrl: './select-view-statistic.component.scss',
})
export class SelectViewStatisticComponent {
  @Input() optionSelect: OptionSelect[] = [];
  @Input() defaultValue!: string;
  @Output() chooseItemOption = new EventEmitter<string | number>();
  selectedValue = this.defaultValue ?? 'month';
  chooseItem(val: string) {
    console.log('va',val);
    this.chooseItemOption.emit(val);
  }
}
