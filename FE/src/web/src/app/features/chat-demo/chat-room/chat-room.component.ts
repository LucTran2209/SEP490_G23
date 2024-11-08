import { Component } from '@angular/core';
import { ChatRoomService } from '../chat-service/chat-room.service';
import { MessagesService } from '../chat-service/messages.service';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, switchMap } from 'rxjs';
import { IChatRoom, IMember, IMessage } from '../../../interfaces/Chat.interface';
import { MembersService } from '../chat-service/members.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent {
//   constructor(
//     public chatRoomService: ChatRoomService,
//     public messageService: MessagesService,
//     public memberService: MembersService,
//     public route: ActivatedRoute
//   ) {}

//   message = new FormControl('');
// currentRoomId$: Observable<string> = this.route.params.pipe(
//   map(paramMap => paramMap["chatroomid"]),
//   filter(param => param !== undefined),
//   distinctUntilChanged()
// )

// chatRoom$: Observable<IChatRoom | undefined> = this.currentRoomId$.pipe(
//   switchMap(roomId => {
//     return this.chatRoomService.chatRoom$.pipe(
//       map(rooms => rooms.find(r => r.id.includes(roomId)))
//     )
//   })
// )

// messages$: Observable<IMessage[]> = this.currentRoomId$.pipe(
//   switchMap(roomId => {
//     return this.messageService.getRoomMessages(roomId).pipe(
//       map(messages => {
//         return Object.values(messages);
//       })
//     )
//   })
// )

// member$: Observable<IMember | undefined> = this.memberService.currentMember$;

// async sendMessage(roomId: string, member: IMember): Promise<void> {
//   if (!this.message.value) {
//     return Promise.resolve(); // Explicitly return a Promise<void> here
//   }
//   this.message.disable();

//   await this.messageService.sendMessage(roomId, {
//     message: this.message.value,
//     dateCreated: new Date().getTime(),
//     user: {
//       firstName: member.firstName,
//       lastName: member.lastName,
//       username: member.username
//     }
//   } as IMessage);
  
//   this.message.reset();
//   this.message.enable();
// }


}
