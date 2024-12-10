import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subcategory, SubCategoryResultService } from '../../../../interfaces/category.interface';
import { ProductInputDto, UpdateProductInputDto } from '../../../../interfaces/product.interface';
import { CategoryService } from '../../../../services/category.service';
import { ImageFileService } from '../../../../services/image-file.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent {
  productForm: FormGroup;
  @Input() product: ProductInputDto = {
    productName: "",
    description: "",
    quantity: 0,
    subCategoryId: "",
    rentalShopId: "",
    rentalPrice: 0,
    depositPrice: 0,
    rentalLimitDays: 0,
    evaluate: 0,
    images: []
  };
  @Input() productUpdate!: UpdateProductInputDto;
  imageList: NzUploadFile[] = [];
  @Input() isEditMode: boolean = false;
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Input() showAlert: boolean = false;
  @Input() alertMessage: string = '';
  @Input() rentalShopId: string = '';
  @Input() alertType: 'success' | 'error' = 'success';
  @Output() saveProduct = new EventEmitter<FormData>();
  @Output() updateProduct = new EventEmitter<FormData>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() listOfControl: Array<{ id: number; controlInstance: string }> = [];
  categories: Subcategory[] = [];

  constructor(
    private msg: NzMessageService, 
    private categoryService: CategoryService, 
    private imageFileService: ImageFileService,
    private cdRef: ChangeDetectorRef,
  ) {
      this.productForm = new FormGroup({
        productName: new FormControl(this.product.productName, [Validators.required, Validators.maxLength(100)]),
        description: new FormControl(this.product.description, [Validators.required, Validators.maxLength(1000)]),
        quantity: new FormControl(this.product.quantity, [Validators.required, Validators.min(1), Validators.max(50)]),
        subCategoryId: new FormControl(this.product.subCategoryId, [Validators.required]),
        rentalPrice: new FormControl(this.product.rentalPrice, [Validators.required, Validators.min(1)]),
        depositPrice: new FormControl(this.product.depositPrice, [Validators.min(1)]),
        rentalLimitDays: new FormControl(this.product.rentalLimitDays, [Validators.required, Validators.min(1), Validators.max(60)]),
        evaluate: new FormControl(0), // Rating between 0-5
        images: new FormControl(this.product.images, [Validators.required])
      });
    }
  handleOk(): void {
    this.isVisible = false;
    this.closeModal.emit();
    this.imageList = [];
    this.resetForm();
  }
  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
    this.imageList = [];
    this.resetForm();
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
      this.msg.error('Bạn chỉ được tải lên những ảnh có đuôi JPG/PNG thôi!');
    }
    return isJPG;
  };

  ngOnInit(): void {
    this.loadSubCategories();
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productUpdate'] && this.productUpdate) {
      this.isEditMode = true;
      this.populateForm();
    }
  }
  loadSubCategories(){
    this.categoryService.listSubCategory().subscribe((res: SubCategoryResultService) => {
      this.categories = res.data;
    });
  }
  handleImageChange({ fileList }: { fileList: NzUploadFile[] }) {
    this.imageList = fileList;
    const imageFiles = fileList.map((file) => file.originFileObj).filter(Boolean);
    this.productForm.get('images')?.setValue(imageFiles);
    this.productForm.get('images')?.markAsTouched();
  }
  populateForm(): void {
    this.productForm.patchValue({
      productName: this.productUpdate.productName,
      description: this.productUpdate.description,
      quantity: this.productUpdate.quantity,
      rentalPrice: this.productUpdate.rentalPrice,
      depositPrice: this.productUpdate.depositPrice,
      rentalLimitDays: this.productUpdate.rentalLimitDays,
      evaluate: this.productUpdate.evaluate,
      images: this.productUpdate.images,
    });
    
    if (this.productUpdate.images && this.productUpdate.images.length) {
      this.imageList = this.imageFileService.processImageList(this.productUpdate.images);
    }
     // Đảm bảo trạng thái FormControl được cập nhật
    Object.values(this.productForm.controls).forEach(control => {
    control.markAsTouched();
    control.updateValueAndValidity();
    if (this.isEditMode) {
      // Remove unnecessary controls for edit mode
      this.productForm.removeControl('subCategoryId');
      this.productForm.removeControl('rentalShopId');
    }
  });
  }
  get imagesControl(): AbstractControl<any> {
    return this.productForm.get('images') as AbstractControl<any>;
  }
  submitForm(){
    
    let formData = new FormData();
    console.log('Form status:', this.productForm.status); // Kiểm tra trạng thái form
    console.log('Form value:', this.productForm.value); // Kiểm tra giá trị hiện tại
  
    if (this.productForm.invalid) {
      this.msg.error("Vui lòng điền đầy đủ thông tin trong biểu mẫu.");
      return;
    }
    if (this.isEditMode) {
      const formValue = this.productForm.value;
      Object.entries(formValue).forEach(([key, value]) => {
        // Capitalize the key
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
    
        if (capitalizedKey === 'Images' && value) {
          this.imageList.forEach((file: NzUploadFile) => {
            if (file.originFileObj) {
              formData.append('Images', file.originFileObj as Blob);
            }
          });
        } else if (capitalizedKey !== 'SubCategoryId' && capitalizedKey !== 'RentalShopId') {
          // Append other fields, excluding 'SubCategoryId' and 'RentalShopId'
          formData.append(capitalizedKey, value as string);
        }
      });
      this.updateProduct.emit(formData);
    }else{

      
      formData.append('ProductName', this.productForm.value.productName);
      formData.append('Description', this.productForm.value.description);
      formData.append('Quantity', this.productForm.value.quantity.toString());
      formData.append('RentalPrice', this.productForm.value.rentalPrice.toString());
      formData.append('DepositPrice', this.productForm.value.depositPrice.toString());
      formData.append('RentalLimitDays', this.productForm.value.rentalLimitDays.toString());
      formData.append('SubCategoryId', this.productForm.value.subCategoryId);
      formData.append('RentalShopId', this.rentalShopId);
      this.imageList.forEach((file: NzUploadFile) => {
        if (file.originFileObj) {
            formData.append('images', file.originFileObj);
        }
    });
        this.saveProduct.emit(formData);
      }
      this.resetForm();
      this.cdRef.detectChanges();  
  }
  resetForm() {
    this.productForm.reset({
      productName: '',
      description: '',
      quantity: 1, // Giá trị mặc định hợp lệ
      subCategoryId: '',
      rentalShopId: '',
      rentalPrice: 1, // Giá trị mặc định hợp lệ
      depositPrice: 1,
      rentalLimitDays: 1, // Giá trị mặc định hợp lệ
      evaluate: 0,
      images: []
    });
    this.imageList = [];
  }
  formatCurrency = (value: number | string): string => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
  };
  
  parseCurrency = (value: string): string => {
    return value.replace(/[^0-9.]/g, '');
  };
}
  