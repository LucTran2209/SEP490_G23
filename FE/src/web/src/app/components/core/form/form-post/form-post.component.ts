import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PostResultService } from '../../../../interfaces/post.interface';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrl: './form-post.component.scss'
})
export class FormPostComponent implements OnInit{
  showAlert: boolean = false;  // To control the visibility of the alert
  alertMessage: string = '';    // To hold the alert message
  uploading = false;
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Output() savePost = new EventEmitter<PostResultService>();
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
    this.addField();
  }

  addField(e?: MouseEvent): void {
    e?.preventDefault();

    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    const index = this.listOfControl.push(control);
    // this.validateForm.addControl(
    //   this.listOfControl[index - 1].controlInstance,
    //   this.fb.control('', Validators.required)
    // );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      // this.validateForm.removeControl(i.controlInstance);
    }
  }
}