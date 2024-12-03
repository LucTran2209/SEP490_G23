import { Component, Input } from '@angular/core';
import { formatDistance } from 'date-fns';
import { FeedbackOutputDto } from '../../interfaces/feedback.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment!: FeedbackOutputDto;
  time = formatDistance(new Date(), new Date());

  calculateTime(inputTime: string | undefined): string {
    if (!inputTime) {
      return 'Không có ngày tạo';
    }
  
    const inputDate = new Date(inputTime);
    const currentDate = new Date();
  
    if (isNaN(inputDate.getTime())) {
      return 'Ngày không hợp lệ';
    }
  
    const diffInMilliseconds = currentDate.getTime() - inputDate.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;
    const daysInMonth = 30;
    const monthsInYear = 12;
  
    const diffInDays = Math.floor(diffInSeconds / (secondsInMinute * minutesInHour * hoursInDay));
  
    if (diffInDays > daysInMonth * monthsInYear) {
      const years = Math.floor(diffInDays / (daysInMonth * monthsInYear));
      return `${years} năm trước`;
    } else if (diffInDays > daysInMonth) {
      const months = Math.floor(diffInDays / daysInMonth);
      return `${months} tháng trước`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ngày trước`;
    } else {
      const diffInHours = Math.floor(diffInSeconds / (secondsInMinute * minutesInHour));
      if (diffInHours > 0) {
        return `${diffInHours} giờ trước`;
      }
  
      const diffInMinutes = Math.floor(diffInSeconds / secondsInMinute);
      if (diffInMinutes > 0) {
        return `${diffInMinutes} phút trước`;
      }
  
      return `${diffInSeconds} giây trước`;
    }
  }
}
