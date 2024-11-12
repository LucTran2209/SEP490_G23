import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IChatFireBase } from '../../../interfaces/Chat.interface';
import { IPayLoad } from '../../../interfaces/account.interface';
import { ChatFireStoreService } from '../../../services/chat-fire-store.service';
import { UserFireStoreService } from '../../../services/user-fire-store.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  currentUserChat?: IChatFireBase;
  isChatOpen = false;
  resizeChat = false;
  // open Modal Chat
  openChat(): void {
    this.isChatOpen = true;
  }

  // close Modal Chat
  closeChat(): void {
    this.isChatOpen = false;
  }

  onResizeChat() {
    this.resizeChat = !this.resizeChat;
  }

  selectUserChatRoom(val: IChatFireBase){
    this.currentUserChat = val;
  }

  constructor(
    private chatFireStore: ChatFireStoreService,
    private userFireStoreService: UserFireStoreService
  ) {}

  ngOnInit(): void {
    console.log('currentUserChat',this.currentUserChat);
  }
}

// const currentUserChat = {
//   avatar: 'assets/images/6306486.jpg',
//   displayName: 'Amazon',
// };
