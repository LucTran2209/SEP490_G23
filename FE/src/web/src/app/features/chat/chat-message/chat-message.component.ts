import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageResponseService } from '../../../services/message-response.service';
import { FormControl } from '@angular/forms';
import { IChatFireBase, IMessageFireBase, IUserFireBase } from '../../../interfaces/Chat.interface';
import { ChatFireStoreService } from '../../../services/chat-fire-store.service';
import { UserFireStoreService } from '../../../services/user-fire-store.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent implements OnInit, OnChanges {
  sideMessage: boolean = false;
  isSending: boolean = false;
  userGetCurrent$: Observable<IUserFireBase | undefined> = of(undefined);
  messages$?: Observable<IMessageFireBase[]>;
  @Input() currentUserChat?: IChatFireBase;
  textBoxChat = new FormControl<string>('');

  async sendChat() {
    this.isSending = true;
    const message = this.textBoxChat.value;
    if (message && this.currentUserChat) {
      this.chatFireStore
        .addChatMessage(this.currentUserChat.id, message)
        .subscribe({
          next: () => {
            this.textBoxChat.reset();
          },
          error: () => {
            this.isSending = false;
          },
          complete: () => {
            this.isSending = false;
          },
        });
    }
  }

  showPreventAccess() {
    this.messageResponseMS.showPreventAccess('Tính năng đang phát triển', '');
  }

  constructor(
    private messageResponseMS: MessageResponseService,
    private chatFireStore: ChatFireStoreService,
    private userFireStoreService: UserFireStoreService
  ) {}

  ngOnInit(): void {
    this.userGetCurrent$ = this.userFireStoreService.getUserIdInFireStore();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['currentUserChat'] && this.currentUserChat){
      this.messages$ = this.chatFireStore.getChatMessages(this.currentUserChat.id);
    }
  }
}
