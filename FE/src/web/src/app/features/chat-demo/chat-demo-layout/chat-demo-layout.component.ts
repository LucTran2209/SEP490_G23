import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MembersService } from '../chat-service/members.service';
import { combineLatest, filter, map, of, startWith, switchMap, tap } from 'rxjs';
import {
  IChatFireBase,
  IUserFireBase,
} from '../../../interfaces/Chat.interface';
import { ChatRoomService } from '../chat-service/chat-room.service';

@Component({
  selector: 'app-chat-demo-layout',
  templateUrl: './chat-demo-layout.component.html',
  styleUrl: './chat-demo-layout.component.scss',
})
export class ChatDemoLayoutComponent implements OnInit {
  @ViewChild("endOfChat") endOfChat?: ElementRef<HTMLDivElement>;
  userGetCurrent$ = this.membersService.getUserById('evptWiwPEL1R1iTfHov4');
  myChats$ = this.chatService.myChats$;
  searchControl = new FormControl('');
  chatListControl = new FormControl<IChatFireBase | null>(null);
  messageControl = new FormControl('');
  selectedChat$ = combineLatest([
    this.chatListControl.valueChanges,
    this.myChats$,
  ]).pipe(map(([value, chats]) => chats.find((c) => c.id === value?.id)));
  usersChat$ = combineLatest([
    this.membersService.allMembers$,
    this.userGetCurrent$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, user, searchString]) =>
      users.filter(
        (u) =>
          u.displayName
            .toLowerCase()
            .includes(searchString?.toLowerCase() || '') && u.uid !== user.uid
      )
    )
  );
  messages$ = this.chatListControl.valueChanges.pipe(
    map(value => value?.id),
    filter((charId): charId is string => charId !== undefined), 
    switchMap(charId => {
      return  this.chatService.getChatMessage$(charId)
    }),
    tap(() => {this.scrollToBottom()})
  );
  

  chooseChatItem(val: IChatFireBase) {
    if (val) {
      this.chatListControl.setValue(val);
    }
  }

  sendMessage(){
    const message =this.messageControl.value;
    const selectChat = this.chatListControl.value;
    if(message && selectChat){
      this.chatService.addChatMessage(selectChat.id, message).subscribe(() => {
        this.scrollToBottom();
      });
      this.messageControl.setValue("");
    }
  }

  scrollToBottom(){
   setTimeout(() => {
    if(this.endOfChat){
      this.endOfChat.nativeElement.scrollIntoView({behavior: 'smooth'});
    }
   },100);
  }

  onInput(event: Event): void {
  }

  onCreateChat(otherUser: IUserFireBase) {
    this.chatService.isExisingChat(otherUser.uid).pipe(
      switchMap(chat => {
        if(chat){
          return of(chat);
        }else{
          return this.chatService.createChat(otherUser);
        }
      })
    ).subscribe(chat => {
      this.chatListControl.setValue(chat);
    })
  }


  constructor(
    private membersService: MembersService,
    private chatService: ChatRoomService
  ) {}

  ngOnInit(): void {
    this.userGetCurrent$.subscribe((res) => {
      console.log('object', res);
    });

    this.messages$.subscribe((res) => {
      console.log('sdf>>> 74',res);
    })
  }
}
