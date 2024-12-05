import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryInputDto } from '../../../../interfaces/category.interface';
import { MessageResponseService } from '../../../../services/message-response.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrl: './form-category.component.scss'
})
export class FormCategoryComponent {
  formCategory!: FormGroup;
  @Output() saveCategory = new EventEmitter<CategoryInputDto>();

  constructor(private fb: FormBuilder, private messageService: MessageResponseService,) {
    // Tạo form chỉ với field categoryName
    this.formCategory = this.fb.group({
      categoryName: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.formCategory.valid) {
      const data: CategoryInputDto = this.formCategory.value;
      data.id = null;
      console.log(data);
      this.saveCategory.emit(data);
    } else {
      this.messageService.handleError("Vui Lòng điền tên danh mục!");
    }
    this.formCategory.reset({
      categoryName: '',
    });
  }
}
