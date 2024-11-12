import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserFireStoreService } from '../../../services/user-fire-store.service';
import { Observable } from 'rxjs';
import { IChatFireBase } from '../../../interfaces/Chat.interface';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent implements OnInit{
  listChatMember$?: Observable<IChatFireBase[]>
    
  @Output() closeChat = new EventEmitter();
  @Output() resizeChat = new EventEmitter();

  onCloseChat() {
    this.closeChat.emit();
  }

  onResizeChat() {
    this.resizeChat.emit();
  }

  constructor(private userFireStoreService: UserFireStoreService) {}

  ngOnInit(): void {
    this.listChatMember$ = this.userFireStoreService.getListMemberChat();
  }
}
