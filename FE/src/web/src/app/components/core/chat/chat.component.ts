import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  isChatOpen = false;
    // open Modal Chat
    openChat(): void {
      this.isChatOpen = true;
    }
  
    // close Modal Chat
    closeChat(): void {
      this.isChatOpen = false;
    }
}
