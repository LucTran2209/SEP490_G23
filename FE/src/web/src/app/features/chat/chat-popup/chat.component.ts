import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IChatFireBase } from '../../../interfaces/Chat.interface';
import { ChatState, selectIsResized } from '../state/chat.reducer';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  currentUserChat?: IChatFireBase;
  isChatOpen = false;
  resizeChat$: Observable<boolean> = of(false);
  // open Modal Chat
  openChat(): void {
    this.isChatOpen = true;
  }

  // close Modal Chat
  closeChat(): void {
    this.isChatOpen = false;
  }

  selectUserChatRoom(val: IChatFireBase) {
    this.currentUserChat = val;
  }

  constructor(
    private store: Store<{ chat: ChatState }>,
  ) {}

  ngOnInit(): void {
    this.resizeChat$ = this.store.select(selectIsResized);
  }
}
