import { Component } from '@angular/core';
import { MessageResponseService } from '../../services/message-response.service';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrl: './anonymous.component.scss',
})
export class AnonymousComponent {
  constructor(readonly toastMessage: MessageResponseService) {}

  showSuccess() {
    this.toastMessage.showSuccess('Thành công!');
  }

  showError() {
    this.toastMessage.handleError('',500);
  }

  showInfo() {
    this.toastMessage.showInfo('Đây là thông báo.');
  }
}
