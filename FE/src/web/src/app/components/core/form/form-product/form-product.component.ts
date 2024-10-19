import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UserInputDto } from '../../../../interfaces/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductResultService } from '../../../../interfaces/product.interface';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent {
  showAlert: boolean = false;  // To control the visibility of the alert
  alertMessage: string = '';    // To hold the alert message
  uploading = false;
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Output() savePost = new EventEmitter<ProductResultService>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() listOfControl: Array<{ id: number; controlInstance: string }> = [];

  constructor(private msg: NzMessageService) {}
  handleOk(): void {
    this.isVisible = false;
    this.closeModal.emit();

  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }

  ngOnInit(): void {
    
  }
}
