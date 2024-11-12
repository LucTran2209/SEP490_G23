import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatFireStoreService } from '../../../services/chat-fire-store.service';
import { UserFireStoreService } from '../../../services/user-fire-store.service';
import { Observable } from 'rxjs';
import { IChatFireBase } from '../../../interfaces/Chat.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent implements OnInit {
  listChatMember$: Observable<IChatFireBase[]> =
    this.userFireStoreService.getListMemberChat();
  @Output() chooseChatRoom = new EventEmitter<IChatFireBase>();

  chooseChatItem(val: IChatFireBase) {
    this.chooseChatRoom.emit(val);
  }
  constructor(
    private chatFireStore: ChatFireStoreService,
    private userFireStoreService: UserFireStoreService
  ) {}

  ngOnInit(): void {}
}

// const mockData = [
//   {
//     avatar: "assets/images/6306486.jpg",
//     displayName: "Samsung",
//     lastMessage: "Nice. I don't know why people get all worked up about hawaiian pizza. I ..."
//   },
//   {
//     avatar: "assets/images/6306486.jpg",
//     displayName: "Amazon",
//     lastMessage: "Nice. I don't know why people get all worked up about hawaiian pizza. I ..."
//   },
//   {
//     avatar: "assets/images/6306486.jpg",
//     displayName: "Dribble",
//     lastMessage: "Nice. I don't know why people get all worked up about hawaiian pizza. I ..."
//   },
//   {
//     avatar: "assets/images/6306486.jpg",
//     displayName: "Harman",
//     lastMessage: "Nice. I don't know why people get all worked up about hawaiian pizza. I ..."
//   },
//   {
//     avatar: "assets/images/6306486.jpg",
//     displayName: "TCS",
//     lastMessage: "Nice. I don't know why people get all worked up about hawaiian pizza. I ..."
//   },
//   {
//     avatar: "assets/images/6306486.jpg",
//     displayName: "Google",
//     lastMessage: "Nice. I don't know why people get all worked up about hawaiian pizza. I ..."
//   },
//   {
//     avatar: "assets/images/6306486.jpg",
//     displayName: "Google",
//     lastMessage: "Nice. I don't know why people get all worked up about hawaiian pizza. I ..."
//   },
//   {
//     avatar: "assets/images/6306486.jpg",
//     displayName: "Google",
//     lastMessage: "Nice. I don't know why people get all worked up about hawaiian pizza. I ..."
//   },
//   {
//     avatar: "assets/images/6306486.jpg",
//     displayName: "Google",
//     lastMessage: "Nice. I don't know why people get all worked up about hawaiian pizza. I ..."
//   },
//   {
//     avatar: "assets/images/6306486.jpg",
//     displayName: "Google",
//     lastMessage: "Nice. I don't know why people get all worked up about hawaiian pizza. I ..."
//   },
// ]
