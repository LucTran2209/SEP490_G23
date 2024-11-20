import { Component, Input } from '@angular/core';
import {
  FeedBackInputDto,
  FeedbackOutputDto,
} from '../../../../interfaces/feedback.interface';

@Component({
  selector: 'app-feelback-card',
  templateUrl: './feelback-card.component.html',
  styleUrl: './feelback-card.component.scss',
})
export class FeelbackCardComponent {
  @Input() feedBackDetail: FeedbackOutputDto = feedbackData;
}

const feedbackData: FeedbackOutputDto = {
  id: '1',
  productId: 'SP001',
  userName: 'Nguyen Van A',
  rating: 5,
  comment: 'Sản phẩm rất tốt, tôi hài lòng.',
};
