import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-choose-create-category',
  templateUrl: './choose-create-category.component.html',
  styleUrl: './choose-create-category.component.scss',
})
export class ChooseCreateCategoryComponent {
  fieldMapping = fieldMapping;
  @Output() typeCreateCateogry = new EventEmitter<number>();
  handleChoose(val: number) {
    this.typeCreateCateogry.emit(val);
  }
}

const fieldMapping: any = [
  {
    label: 'Tạo danh mục chính',
    icon: 'sketch',
    backgroundColor: 'bg-[#ffeaea]',
    color: 'text-[#ff4d4f]',
    description:
      'Tạo danh mục chính để tổ chức nội dung chính một cách khoa học và dễ quản lý.',
  },
  {
    label: 'Tạo danh mục phụ',
    icon: 'star',
    backgroundColor: 'bg-[#ffe2b8]',
    color: 'text-[#e89b12]',
    description: 'Tạo danh mục phụ để bổ sung và hỗ trợ các danh mục chính.',
  },
];
