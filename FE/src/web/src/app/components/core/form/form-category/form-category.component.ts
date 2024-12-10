import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryInputDto } from '../../../../interfaces/category.interface';
import { MessageResponseService } from '../../../../services/message-response.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrl: './form-category.component.scss'
})
export class FormCategoryComponent {
  formCategory!: FormGroup;
  @Input() category?: CategoryInputDto;
  @Output() saveCategory = new EventEmitter<CategoryInputDto>();
  @Output() updateCategory = new EventEmitter<CategoryInputDto>();
  labelButton: string = '';
  constructor(private fb: FormBuilder, private messageService: MessageResponseService,) {}
  ngOnInit() {
    if (this.category) {
      this.initForm(this.category);
    } else {
      this.initForm({
        id: '',
        categoryName: ''
      });
    }
    this.labelButton = this.category ? 'Cập Nhật' : 'Tạo Mới';
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && changes['category'].currentValue) {
      this.initForm(this.category!);
      this.labelButton = 'Cập Nhật';
    } else if (!changes['category'].currentValue) {
      this.labelButton = 'Tạo Mới';
    }
  }

  private initForm(category: CategoryInputDto) {
    this.formCategory = new FormGroup({
      categoryName: new FormControl(category.categoryName || '', [Validators.required]),
    });
  }
  onSubmit(): void {
    if (this.formCategory.valid) {
      if (this.category) {
        const data: CategoryInputDto = this.formCategory.value;
        data.id = this.category.id;
        this.updateCategory.emit(data);
        this.resetForm();
      } else {
        const data: CategoryInputDto = this.formCategory.value;
        data.id = null;
        this.saveCategory.emit(data);
        this.resetForm();
      }
    } else {
      this.messageService.handleError("Vui Lòng điền tên danh mục!");
    }

  }
  resetForm() {
    this.formCategory.reset({
      categoryName: '',
    });
    this.labelButton = 'Tạo Mới';
    this.category = undefined;
  }

}
