import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionRadio } from '../../../../configs/anonymous.config';

@Component({
  selector: 'app-select-radio-collateral',
  templateUrl: './select-radio-collateral.component.html',
  styleUrl: './select-radio-collateral.component.scss',
})
export class SelectRadioCollateralComponent {
  @Input() options?: OptionRadio[] = mockRadioOption;
  @Input() selectedValue: string = "";
  @Output() selectionChange = new EventEmitter<string>();
  uploadedFiles: File[] = [];


  onValueChange(value: string): void {
    this.selectionChange.emit(value);
  }

  onSelectedFile(files: File[]){
    this.uploadedFiles.push(...files);
  }

  onRemoveAFile(index: number){
    this.uploadedFiles.splice(index, 1);
  }
}

const mockRadioOption: OptionRadio[] = [
  {
    label: 'Giấy tờ tùy thân (thẻ căn cước)',
    value: '0',
    icon: 'file-protect',
  },
  {
    label: 'Bằng lái xe ',
    value: '1',
    icon: 'idcard',
  },
]