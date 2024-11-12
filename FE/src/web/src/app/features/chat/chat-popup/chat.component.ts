import { Component, OnInit } from '@angular/core';
import { IChatFireBase } from '../../../interfaces/Chat.interface';
import { ChatFireStoreService } from '../../../services/chat-fire-store.service';
import { MessageResponseService } from '../../../services/message-response.service';
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
    if(this.currentUserChat){
      this.resizeChat = !this.resizeChat;
    }else{
      this.messageResponseMS.showInfo('chọn cuộc hội thoại đi!')
    }
  }

  selectUserChatRoom(val: IChatFireBase){
    this.currentUserChat = val;
  }

  constructor(
    private chatFireStore: ChatFireStoreService,
    private userFireStoreService: UserFireStoreService,
    private messageResponseMS: MessageResponseService
  ) {}

  ngOnInit(): void {
    console.log('currentUserChat',this.currentUserChat);
  }
}
