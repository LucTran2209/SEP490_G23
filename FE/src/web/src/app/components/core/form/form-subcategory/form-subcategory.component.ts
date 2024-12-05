import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryOutputDto, SubcategoryInputDto } from '../../../../interfaces/category.interface';
import { MessageResponseService } from '../../../../services/message-response.service';

@Component({
  selector: 'app-form-subcategory',
  templateUrl: './form-subcategory.component.html',
  styleUrl: './form-subcategory.component.scss'
})
export class FormSubcategoryComponent {
  formSubcategory!: FormGroup;
  @Input() categories: CategoryOutputDto[] = [];
  @Output() saveSubcategory = new EventEmitter<SubcategoryInputDto>();

  constructor(private fb: FormBuilder, private messageService: MessageResponseService,) {
    // Tạo form chỉ với field categoryName
    this.formSubcategory = this.fb.group({
      categoryId: ['', [Validators.required]],
      subCategoryName: ['', [Validators.required]],
      description: ['', [Validators.required]],

    });
  }
  onSubmit(): void {
    if (this.formSubcategory.valid) {
      const data: SubcategoryInputDto = this.formSubcategory.value;
      data.id = null;
      this.saveSubcategory.emit(data);
    } else {
      this.messageService.handleError("Vui Lòng điền đầy đủ thông tin!");
    }
    this.formSubcategory.reset({
      categoryId: '',
      subCategoryName: '',
      description: '',
    });
  }
}
