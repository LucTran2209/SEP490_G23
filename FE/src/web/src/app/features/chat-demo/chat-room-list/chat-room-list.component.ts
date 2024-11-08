import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from '../chat-service/chat-room.service';
import { MembersService } from '../chat-service/members.service';
import { Observable } from 'rxjs';
import { IChatRoom, IMember } from '../../../interfaces/Chat.interface';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
interface Message {
  content: string;
  sender: string;
  timestamp: Date;
}
@Component({
  selector: 'app-chat-room-list',
  templateUrl: './chat-room-list.component.html',
  styleUrl: './chat-room-list.component.scss'
})
export class ChatRoomListComponent implements OnInit { 

//   constructor(protected chatRoomService: ChatRoomService, protected memberService: MembersService) {  }
//   username = new FormControl('');
//   currentMemember$: Observable<IMember | undefined> = this.memberService.currentMember$;
//   chatRoom$: Observable<IChatRoom[] | undefined> = this.chatRoomService.chatRoom$;

//   setCurrentMember(): void {
//     if(this.username.value){
//       this.memberService.setCurrentMember(this.username.value);
//     }
//   }



  messagesCollection: AngularFirestoreCollection<Message>;
  messages: Observable<Message[]>;
  newMessage: string = '';

  constructor(private afs: AngularFirestore) {
    this.messagesCollection = this.afs.collection<Message>('messages');
    this.messages = this.messagesCollection.valueChanges();
  }

  ngOnInit(): void {
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const message: Message = {
        content: this.newMessage,
        sender: 'You', 
        timestamp: new Date()
      };
      this.messagesCollection.add(message);
      this.newMessage = '';
    }
  }
}
