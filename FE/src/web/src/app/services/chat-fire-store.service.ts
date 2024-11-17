import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { concatMap, Observable, of, take } from 'rxjs';
import {
  IChatFireBase,
  IMessageFireBase,
  IUserFireBase,
} from '../interfaces/Chat.interface';
import { UserFireStoreService } from './user-fire-store.service';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class ChatFireStoreService {
  constructor(
    private userProfileService: UserProfileService,
    private userFireStoreService: UserFireStoreService,
    private firestore: Firestore,
    private afs: AngularFirestore
  ) {}

  //create chat room
  async addChatRoom(uId: string) {
    const userRef = collection(this.firestore, 'users');
    const chatRef = collection(this.firestore, 'chats');
    const currentUserId = this.userProfileService.UserId;
    debugger;
    const myQueryUserInChat = query(
      chatRef,
      where('userIds', 'array-contains', currentUserId)
    );
    const chatSnapshot = await getDocs(myQueryUserInChat);

    let chatExists = false;
    chatSnapshot.forEach((doc) => {
      const data = doc.data() as IChatFireBase;
      if (data.userIds.includes(uId)) {
        chatExists = true;
      }
    });

    if (chatExists) {
      console.log('Chat room already exists between these users.');
      return;
    }

    const currentUserQuery = query(userRef, where('uid', '==', currentUserId));
    const otherUserQuery = query(userRef, where('uid', '==', uId));

    const [currentUserSnapshot, otherUserSnapshot] = await Promise.all([
      getDocs(currentUserQuery),
      getDocs(otherUserQuery),
    ]);

    if (currentUserSnapshot.empty || otherUserSnapshot.empty) {
      console.log('One or both users not found.');
      return;
    }

    const currentUserData = currentUserSnapshot.docs[0].data() as IUserFireBase;
    const otherUserData = otherUserSnapshot.docs[0].data() as IUserFireBase;

    return addDoc(chatRef, {
      userIds: [currentUserId, uId],
      lastMessage: '',
      lastMessageDate: new Date(),
      users: [
        {
          uid: currentUserData.uid,
          displayName: currentUserData.displayName,
          photoURL: currentUserData.photoURL,
        },
        {
          uid: otherUserData.uid,
          displayName: otherUserData.displayName,
          photoURL: otherUserData.photoURL,
        },
      ],
    });
  }

  //create chat message
  addChatMessage(chatId: string, message: string): Observable<any> {
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    const chatRef = doc(this.firestore, 'chats', chatId);
    const currentUserId = this.userProfileService.UserId;
    const today = Timestamp.fromDate(new Date());
    return of(currentUserId).pipe(
      take(1),
      concatMap((uid) =>
        addDoc(ref, {
          text: message,
          senderId: uid,
          sentDate: today,
        })
      ),
      concatMap(() =>
        updateDoc(chatRef, { lastMessage: message, lastMessageDate: today })
      )
    );
  }
  //get chat message
  getChatMessages(chatId: string): Observable<IMessageFireBase[]> {
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    // const queryAll = query(ref);
    const queryAll = query(ref, orderBy('sentDate', 'asc'));
    return collectionData(queryAll) as Observable<IMessageFireBase[]>;
  }
}
