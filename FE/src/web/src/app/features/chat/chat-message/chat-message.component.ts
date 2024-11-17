import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MessageResponseService } from '../../../services/message-response.service';
import { FormControl } from '@angular/forms';
import {
  IChatFireBase,
  IMessageFireBase,
  IUserFireBase,
} from '../../../interfaces/Chat.interface';
import { ChatFireStoreService } from '../../../services/chat-fire-store.service';
import { UserFireStoreService } from '../../../services/user-fire-store.service';
import { Observable, of, tap } from 'rxjs';
import { AzureStorageService } from '../../../services/azure-storage.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent
  implements AfterViewChecked, OnInit, OnChanges
{
  sideMessage: boolean = false;
  isSending: boolean = false;
  userGetCurrent$: Observable<IUserFireBase | undefined> = of(undefined);
  messages$?: Observable<IMessageFireBase[]>;
  @Input() currentUserChat?: IChatFireBase;
  textBoxChat = new FormControl<string>('');
  @ViewChild('endOfChat') endOfChat!: ElementRef;

  async onFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = input.files[0];
      // const resUrl = await this.azureStorageService.uploadFileAzure(files);
      // console.log('resUrl', resUrl);
    }
  }

  private scrollToBottom(): void {
    if (this.endOfChat) {
      this.endOfChat.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }

  async sendChat() {
    this.isSending = true;
    const message = this.textBoxChat.value;
    if (message && this.currentUserChat) {
      this.chatFireStore
        .addChatMessage(this.currentUserChat.id, message)
        .subscribe({
          next: () => {
            this.textBoxChat.setValue('');
            this.scrollToBottom();
          },
          error: () => {
            this.isSending = false;
          },
          complete: () => {
            this.isSending = false;
          },
        });
    } else {
      this.isSending = false;
    }
  }

  showPreventAccess() {
    this.messageResponseMS.showPreventAccess('Tính năng đang phát triển', '');
  }

  constructor(
    private messageResponseMS: MessageResponseService,
    private chatFireStore: ChatFireStoreService,
    private userFireStoreService: UserFireStoreService,
    private azureStorageService: AzureStorageService
  ) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.userGetCurrent$ = this.userFireStoreService.getUserIdInFireStore();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentUserChat'] && this.currentUserChat) {
      this.messages$ = this.chatFireStore
        .getChatMessages(this.currentUserChat.id)
        .pipe(
          tap(() => {
            this.scrollToBottom();
          })
        );
    }
  }
}
