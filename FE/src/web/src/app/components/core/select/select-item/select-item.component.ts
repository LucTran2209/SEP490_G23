import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NzSelectModeType } from 'ng-zorro-antd/select';
import { SELECTBUTTON } from '../../../../interfaces/anonymous.interface';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrl: './select-item.component.scss',
})
export class SelectItemComponent  {
  selectedValue?: string;
  @Input() placeholder: string = 'Lựa chọn';
  @Input() modeOption: NzSelectModeType = 'default'
  @Input() hasIcon: boolean = false;
  @Input() data?: SELECTBUTTON[];
  @Output() selectItem: EventEmitter<string> = new EventEmitter<string>;

  constructor() { }

  selectOption(val: string) {
    this.selectItem?.emit(val);
  }

  
}
