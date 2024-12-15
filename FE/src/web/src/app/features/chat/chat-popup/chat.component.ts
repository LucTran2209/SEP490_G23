import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IChatFireBase } from '../../../interfaces/Chat.interface';
import { ChatState, selectIsResized } from '../state/chat.reducer';
import { PopUpChatService } from '../../../services/pop-up-chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  currentUserChat?: IChatFireBase;
  isChatOpen$ = this.popupService.popUpChatObservable$;
  resizeChat$: Observable<boolean> = of(false);
  // open Modal Chat
  openChat(): void {
    this.popupService.tooglePopUp(true);
  }

  // close Modal Chat
  closeChat(): void {
    this.popupService.tooglePopUp(false);
  }

  selectUserChatRoom(val: IChatFireBase) {
    console.log('IChatFireBase',val);
    this.currentUserChat = val;
  }

  constructor(
    private store: Store<{ chat: ChatState }>,
    private popupService: PopUpChatService
  ) {}

  ngOnInit(): void {
    this.resizeChat$ = this.store.select(selectIsResized);
  }
}
