import { Component } from '@angular/core';
import { OptionSelect } from '../../configs/anonymous.config';

@Component({
  selector: 'app-mega-filter',
  templateUrl: './mega-filter.component.html',
  styleUrl: './mega-filter.component.scss',
})
export class MegaFilterComponent {
  optionSelect = options;
  sortFields: Array<{ selectedField: string; order: string }> = [
    { selectedField: '', order: 'asc' },
  ];

  addField() {
    this.sortFields.push({ selectedField: '', order: 'asc' });
  }

  removeField(index: number) {
    console.log('index',index);
    this.sortFields.splice(index, 1);
  }

  onFilter() {
    console.log('Filer working!');
  }
}

const options: OptionSelect[] = [
  { label: 'Tên sản phẩm', value: 'productName' },
  { label: 'Số lượng', value: 'quantity' },
  { label: 'Giá thuê', value: 'rentalPrice' },
  { label: 'Giá cọc', value: 'depositPrice' },
];
