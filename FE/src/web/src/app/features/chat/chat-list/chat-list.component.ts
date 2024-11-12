import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import {
  IChatFireBase,
  IUserFireBase,
} from '../../../interfaces/Chat.interface';
import { UserFireStoreService } from '../../../services/user-fire-store.service';
import { ChatState } from '../state/chat.reducer';
import { Store } from '@ngrx/store';
import { resizeChat } from '../state/chat.actions';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent implements OnInit {
  listChatMember$: Observable<IChatFireBase[]> =
    this.userFireStoreService.getListMemberChat();
  searchMembers$?: Observable<IChatFireBase[]>;
  @Output() chooseChatRoom = new EventEmitter<IChatFireBase>();
  isChatRoomSelect: string = '';
  private searchSubject = new Subject<string>();

  onInput(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  chooseChatItem(val: IChatFireBase) {
    this.chooseChatRoom.emit(val);
    this.isChatRoomSelect = val.id;
    this.store.dispatch(resizeChat({ isResized: true }));
  }
  constructor(
    private userFireStoreService: UserFireStoreService,
    private store: Store<{ chat: ChatState }>
  ) {}

  ngOnInit(): void {
    /**
     * search member chat
     */
    combineLatest([this.searchSubject, this.listChatMember$])
      .pipe(
        debounceTime(100),
        switchMap(([searchText, listMembers]) => {
          this.searchMembers$ = of(
            listMembers.filter((lm) =>
              lm.chatName?.toLowerCase().includes(searchText.toLowerCase())
            )
          );
          return of();
        })
      )
      .subscribe();
  }
}
