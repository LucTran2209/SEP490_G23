import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductInputDto, ProductOutputDto, ProductResultService, UpdateProductInputDto } from '../../../../interfaces/product.interface';

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
  @Input() alertType: 'success' | 'error' = 'success';
  @Output() saveProduct = new EventEmitter<FormData>();
  @Output() updateProduct = new EventEmitter<UpdateProductInputDto>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() listOfControl: Array<{ id: number; controlInstance: string }> = [];

  constructor(private msg: NzMessageService) {
      this.productForm = new FormGroup({
        productName: new FormControl(this.product.productName, [Validators.required]),
        description: new FormControl(this.product.description, [Validators.required]),
        quantity: new FormControl(this.product.quantity, [Validators.required, Validators.min(1)]),
        subCategoryId: new FormControl(this.product.subCategoryId, [Validators.required]),
        rentalShopId: new FormControl(this.product.rentalShopId, [Validators.required]),
        rentalPrice: new FormControl(this.product.rentalPrice, [Validators.required, Validators.min(1)]),
        depositPrice: new FormControl(this.product.depositPrice, [Validators.min(0)]),
        rentalLimitDays: new FormControl(this.product.rentalLimitDays, [Validators.required, Validators.min(1)]),
        evaluate: new FormControl(0), // Rating between 0-5
        images: new FormControl(this.product.images, [Validators.required])
      });
    }
  handleOk(): void {
    this.isVisible = false;
    this.closeModal.emit();
    this.imageList = [];

  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
    this.imageList = [];
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
      this.msg.error('You can only upload JPG/PNG files!');
    }
    return isJPG;
  };

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.productUpdate);
    if (changes['productUpdate'] && this.productUpdate) {
      this.isEditMode = true;
      this.populateForm();
    }
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
      this.imageList = this.productUpdate.images.map((image: string | File, index: number) => {
        if (typeof image === 'string') {
          return {
            uid: `${index}`,
            name: `image-${index}.jpg`,
            status: 'done',
            url: image, // URL from the server
          };
        } else {
          return {
            uid: `${index}`,
            name: image.name,
            status: 'done',
            originFileObj: image,
            url: URL.createObjectURL(image) // Generate a Blob URL for the uploaded file
          };
        }
      });
    }
  }
  submitForm(){
    if (this.isEditMode) {
      const formValue = this.productForm.value;
      const updatedData: UpdateProductInputDto = {
        productName: formValue.productName,
        description: formValue.description,
        quantity: formValue.quantity,
        rentalPrice: formValue.rentalPrice,
        depositPrice: formValue.depositPrice,
        rentalLimitDays: formValue.rentalLimitDays,
        evaluate: formValue.evaluate,
        images: this.productUpdate.images
      };
      this.updateProduct.emit(updatedData);
    }else{

      const formData = new FormData();
      formData.append('productName', this.productForm.value.productName);
      formData.append('description', this.productForm.value.description);
      formData.append('quantity', this.productForm.value.quantity.toString());
      formData.append('rentalPrice', this.productForm.value.rentalPrice.toString());
      formData.append('depositPrice', this.productForm.value.depositPrice.toString());
      formData.append('rentalLimitDays', this.productForm.value.rentalLimitDays.toString());
      formData.append('evaluate', this.productForm.value.evaluate.toString());   
      if(!this.isEditMode){
        formData.append('subCategoryId', this.productForm.value.subCategoryId);
      } 
      this.imageList.forEach((file: NzUploadFile) => {
        if (file.originFileObj) {
            formData.append('images', file.originFileObj);
        }
    });
        this.saveProduct.emit(formData);
    }
      
      this.resetForm();
  }
  resetForm() {
    this.productForm.reset({
      productName: '',
      description: '',
      quantity: 0,
      subCategoryId: '',
      rentalShopId: '',
      rentalPrice: 0,
      depositPrice: 0,
      rentalLimitDays: 0,
      evaluate: 0,
      images: []
    });
    this.imageList = [];
  }
}
