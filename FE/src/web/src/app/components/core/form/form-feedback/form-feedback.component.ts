import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MyOrderDetailDto } from '../../../../interfaces/order.interface';
import { FeedBackInputDto } from '../../../../interfaces/feedback.interface';

@Component({
  selector: 'app-form-feedback',
  templateUrl: './form-feedback.component.html',
  styleUrl: './form-feedback.component.scss'
})
export class FormFeedbackComponent implements OnInit{
  @Input() order!: MyOrderDetailDto;
  feedBack!: FeedBackInputDto[];
  ratingValue = 3;
  reviewText = '';
  ratingName = ['Tệ', 'Không Hài Lòng', 'Bình Thường', 'Hài Lòng', 'Tuyệt Vời'];
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveFeedBack = new EventEmitter<FeedBackInputDto>();

  ngOnInit() {
    // Khởi tạo feedBack với các giá trị mặc định (rating = 3, comment = '')
    this.feedBack = this.order.orderDetails.map((pro) => ({
      productId: pro.productId,
      userName: this.order.user.userName,
      rating: 3, // Giá trị mặc định của rating
      comment: '' // Mặc định nhận xét trống
    }));
  }

  // Cập nhật giá trị rating
  onRatingChange(index: number) {
    console.log(`Rating changed for product ${index + 1}:`, this.feedBack[index].rating);
  }
  handleOk(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.closeModal.emit();
  }
  onSave(){
    // this.saveFeedBack.emit();
    console.log(this.feedBack);
  }
}
