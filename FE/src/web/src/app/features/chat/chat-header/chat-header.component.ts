import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserFireStoreService } from '../../../services/user-fire-store.service';
import { Observable, tap } from 'rxjs';
import { IChatFireBase } from '../../../interfaces/Chat.interface';
import { Store } from '@ngrx/store';
import { ChatState, selectIsResized } from '../state/chat.reducer';
import { resizeChat } from '../state/chat.actions';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent implements OnInit {
  listChatMember$?: Observable<IChatFireBase[]>;
  resizeChat$?: Observable<boolean>;
  @Output() closeChat = new EventEmitter();
  onCloseChat() {
    this.closeChat.emit();
  }

  onResizeChat() {
    this.store.dispatch(resizeChat({isResized: false}))
  }

  constructor(
    private userFireStoreService: UserFireStoreService,
    private store: Store<{ chat: ChatState }>
  ) {}

  ngOnInit(): void {
    this.listChatMember$ = this.userFireStoreService.getListMemberChat();
    this.resizeChat$ = this.store.select(selectIsResized);
  }
}
