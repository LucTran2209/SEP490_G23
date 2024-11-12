import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent {
  @Output() closeChat = new EventEmitter();
  @Output() resizeChat = new EventEmitter();

  onCloseChat() {
    this.closeChat.emit();
  }

  onResizeChat() {
    this.resizeChat.emit();
  }
}
