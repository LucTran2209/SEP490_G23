import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges } from '@angular/core';
import { MyOrderDetailDto } from '../../../../interfaces/order.interface';
import { FeedBackInputDto } from '../../../../interfaces/feedback.interface';

@Component({
  selector: 'app-form-feedback',
  templateUrl: './form-feedback.component.html',
  styleUrl: './form-feedback.component.scss'
})
export class FormFeedbackComponent implements OnInit{
  @Input() order!: MyOrderDetailDto;
  feedBackList: FeedBackInputDto[] = [];
  ratingValue = 3;
  reviewText = '';
  ratingName = ['Tệ', 'Không Hài Lòng', 'Bình Thường', 'Hài Lòng', 'Tuyệt Vời'];
  @Input() isVisible: boolean = false;
  @Input() title: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveFeedBack = new EventEmitter<FeedBackInputDto>();

  ngOnInit() {
    // Đảm bảo rằng feedBack được khởi tạo khi order và orderDetails có sẵn
    this.initializeFeedback();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'] && this.order && this.order.orderDetails) {
      this.initializeFeedback();
    }
  }

  // Hàm khởi tạo mảng feedback
  initializeFeedback() {
    if (this.order && this.order.orderDetails) {
      this.feedBackList = this.order.orderDetails.map(detail => ({
        productId: detail.product.id,
        userId: this.order.userId, // Hoặc lấy tên người dùng nếu có
        rating: 3,             // Giá trị mặc định cho đánh giá
        comment: ''            // Chuỗi nhận xét trống ban đầu
      }));
      console.log('Feedback initialized:', this.feedBackList); // Kiểm tra dữ liệu
    } else {
      console.error('Order details are not available');
    }
  }
   // Cập nhật giá trị rating
   onRatingChange(index: number, value: number) {
    this.feedBackList[index].rating = value;
    console.log(`Rating for product ${index} changed to:`, value);
  }

  // Cập nhật giá trị comment
  onCommentChange(index: number, value: string) {
    this.feedBackList[index].comment = value;
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
    this.feedBackList.forEach(fb => {
      console.log("FeedBack: ",fb);
      this.saveFeedBack.emit(fb);
    });
  }
  setMessage(message: string, index: number): void {
      this.feedBackList[index].comment = message;
  }
}
