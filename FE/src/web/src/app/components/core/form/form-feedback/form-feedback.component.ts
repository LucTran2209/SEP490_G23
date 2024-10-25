import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-feedback',
  templateUrl: './form-feedback.component.html',
  styleUrl: './form-feedback.component.scss'
})
export class FormFeedbackComponent {
  ratingValue = 3;
  reviewText = '';
  ratingName = ['Tệ', 'Không Hài Lòng', 'Bình Thường', 'Hài Lòng', 'Tuyệt Vời'];
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  onRatingChange() {
    console.log('Rating changed to:', this.ratingValue);
  }
  handleOk(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }

}
