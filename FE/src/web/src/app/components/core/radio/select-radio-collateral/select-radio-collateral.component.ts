import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionRadio } from '../../../../configs/anonymous.config';

@Component({
  selector: 'app-select-radio-collateral',
  templateUrl: './select-radio-collateral.component.html',
  styleUrl: './select-radio-collateral.component.scss',
})
export class SelectRadioCollateralComponent {
  @Input() options?: OptionRadio[] = mockRadioOption;
  @Input() selectedValue: string = "";
  
  @Output() selectedValueChange = new EventEmitter<string>();
  @Output() listFileCollateral = new EventEmitter<File[]>();

  uploadedFiles: File[] = [];
  filePreviews: string[] = [];

  onValueChange(value: string): void {
    this.selectedValue = value;
    this.selectedValueChange.emit(value);
  }

  onSelectedFile(files: File[]): void {
    this.uploadedFiles.push(...files); 
    this.generateFilePreviews(files); 
    this.listFileCollateral.emit(this.uploadedFiles); 
  }

  onRemoveAFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
    this.filePreviews.splice(index, 1); 
    this.listFileCollateral.emit(this.uploadedFiles);
  }

  private generateFilePreviews(files: File[]): void {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file); 
    });
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