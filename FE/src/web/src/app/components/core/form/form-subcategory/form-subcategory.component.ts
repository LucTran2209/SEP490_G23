import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryOutputDto, SubcategoryInputDto } from '../../../../interfaces/category.interface';
import { MessageResponseService } from '../../../../services/message-response.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NzFormLayoutType } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-form-subcategory',
  templateUrl: './form-subcategory.component.html',
  styleUrl: './form-subcategory.component.scss'
})
export class FormSubcategoryComponent {
  formSubcategory!: FormGroup;
  @Input() subcategory?: SubcategoryInputDto;
  @Input() categories: CategoryOutputDto[] = [];
  @Output() saveSubcategory = new EventEmitter<SubcategoryInputDto>();
  @Output() updateSubcategory = new EventEmitter<SubcategoryInputDto>();
  labelButton: string = '';
  formLayout: NzFormLayoutType = 'inline';
  constructor(private fb: FormBuilder, private messageService: MessageResponseService, private breakpointObserver: BreakpointObserver) {}
  ngOnInit() {
    if (this.subcategory) {
      this.initForm(this.subcategory);
    } else {
      this.initForm({
        id: '',
        categoryId: '',
        subCategoryName: '',
        description: '',
      });
    }
    this.labelButton = this.subcategory ? 'Cập Nhật' : 'Tạo Mới';
  }
  private initForm(subcategory: SubcategoryInputDto) {
    this.formSubcategory = new FormGroup({
      categoryId: new FormControl(subcategory.categoryId || '', [Validators.required]),
      subCategoryName: new FormControl(subcategory.subCategoryName || '', [Validators.required]),
      description: new FormControl(subcategory.description || ''),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subcategory'] && changes['subcategory'].currentValue) {
      this.initForm(this.subcategory!);
      this.labelButton = 'Cập Nhật';
    } else if (!changes['subcategory'].currentValue) {
      this.labelButton = 'Tạo Mới';
    }
  }

  onSubmit(): void {
    if (this.formSubcategory.valid) {
      if (this.subcategory) {
        const data: SubcategoryInputDto = this.formSubcategory.value;
        data.id = this.subcategory.id;
        this.updateSubcategory.emit(data);
        this.resetForm();
      } else {
        const data: SubcategoryInputDto = this.formSubcategory.value;
        data.id = null;
        this.saveSubcategory.emit(data);
        this.resetForm();
      }
    } else {
      this.messageService.handleError("Vui Lòng điền đầy đủ thông tin!");
    }
  }
  resetForm() {
    this.formSubcategory.reset({
      categoryId: '',
      subCategoryName: '',
      description: '',
    });
    this.labelButton = 'Tạo Mới';
    this.subcategory = undefined;
  }
}
