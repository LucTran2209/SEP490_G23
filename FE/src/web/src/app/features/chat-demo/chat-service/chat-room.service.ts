import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { concatMap, map, Observable, take } from 'rxjs';
import {
  IChatFireBase,
  IMessageFireBase,
  IUserFireBase,
} from '../../../interfaces/Chat.interface';
import { MembersService } from './members.service';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomService {
  // private collection = this.afs.collection<IChatRoom>("chatRoom");
  // chatRoom$: Observable<IChatRoom[]> = this.collection.get().pipe(
  //   map(values => {
  //     return values.docs.map(doc => {
  //       return {
  //         ...doc.data(),
  //         id: doc.id,
  //       }
  //     })
  //   })
  // )
  constructor(
    private firestore: Firestore,
    private memberService: MembersService,
    private afs: AngularFirestore
  ) {}

  createChat(otherUser: IUserFireBase): Observable<any> {
    const ref = collection(this.firestore, 'chats');
    return this.memberService.getUserById('evptWiwPEL1R1iTfHov4').pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          userIds: [user.uid, otherUser.uid],
          users: [
            {
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            {
              displayName: otherUser.displayName,
              photoURL: otherUser.photoURL,
            },
          ],
        })
      ),
      map((ref) => ref.id)
    );
  }

  get myChats$(): Observable<IChatFireBase[]> {
    const ref = collection(this.firestore, 'chats');
    return this.memberService.getUserById('evptWiwPEL1R1iTfHov4').pipe(
      concatMap((user) => {
        const myQuery = query(
          ref,
          where('userIds', 'array-contains', user.uid)
        );
        return collectionData(myQuery, { idField: 'id' }).pipe(
          map((chats) =>
            this.addChatNameAndPic(user.uid, chats as IChatFireBase[])
          )
        ) as Observable<IChatFireBase[]>;
      })
    );
  }

  addChatNameAndPic(
    currentUserId: string,
    chats: IChatFireBase[]
  ): IChatFireBase[] {
    chats.forEach((chat) => {
      const otherIndex = chat.userIds.indexOf(currentUserId) === 0 ? 1 : 0;
      const { displayName, photoURL } = chat.users[otherIndex];
      chat.chatName = displayName;
      chat.chatPic = photoURL;
    });

    return chats;
  }

  isExisingChat(otherUserId: string): Observable<IChatFireBase | null> {
    return this.myChats$.pipe(
      take(1),
      map((chats) => {
        for (let index = 0; index < chats.length; index++) {
          const element = chats[index];
          if (element.userIds.includes(otherUserId)) {
            return element
          }
        }
        return null;
      })
    );
  }

  addChatMessage(chatId: string, message: string): Observable<any> {
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    const chatRef = doc(this.firestore, 'chats', chatId);
    const today = Timestamp.fromDate(new Date());
    return this.memberService.getUserById('evptWiwPEL1R1iTfHov4').pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          text: message,
          senderId: user.uid,
          sentDate: today,
        })
      ),
      concatMap(() =>
        updateDoc(chatRef, { lastMessage: message, lastMessageDate: today })
      )
    );
  }

  getChatMessage$(chatId: string): Observable<IMessageFireBase[]> {
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<IMessageFireBase[]>;
  }
}
