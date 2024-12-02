import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  getDocs,
  query,
  where
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { IChatFireBase, IUserFireBase } from '../interfaces/Chat.interface';
import { MessageResponseService } from './message-response.service';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserFireStoreService {
  constructor(
    private firestore: Firestore,
    private userProfileService: UserProfileService,
    private afs: AngularFirestore,
    private messageToastSerivce: MessageResponseService
  ) {}

  //add document user into cloud firestore
  async addUserInToFireStore(data: IUserFireBase) {
    const ref = collection(this.firestore, 'users');
    const myQuery = query(ref, where('uid', '==', data.uid));

    try {
      const querySnapshot = await getDocs(myQuery);
      if (!querySnapshot.empty) {
        // this.messageToastSerivce.showInfo('Người dùng thực sự đã tồn tại');
        console.warn('Người dùng thực sự đã tồn tại');
      } else {
        // this.messageToastSerivce.showSuccess(
        //   'Test: thêm người dùng vào cloud firestore'
        // );
        console.log('thêm người dùng vào cloud firestore');
        await addDoc(ref, data);
      }
    } catch (error) {
      console.error('Error checking/adding user: ', error);
    }
  }

  //get user id from cloud firestore
  getUserIdInFireStore(): Observable<IUserFireBase | undefined> {
    const currentUserId = this.userProfileService.UserId;
    const usersRef = collection(this.firestore, 'users');
    const userQuery = query(usersRef, where('uid', '==', currentUserId));
    return from(getDocs(userQuery)).pipe(
      map((snapshot) => {
        const users = snapshot.docs.map((doc) => doc.data() as IUserFireBase);
        return users.length > 0 ? users[0] : undefined;
      })
    );
  }

  getListMemberChat() {
    const currentUserId = this.userProfileService.UserId;
  
    if (!currentUserId) {
      throw new Error('UserId is undefined. Ensure the user is properly authenticated.');
    }
  
    const userRef = collection(this.firestore, 'chats');
    const myQuery = query(
      userRef,
      where('userIds', 'array-contains', currentUserId) 
    );
  
    return collectionData(myQuery, { idField: 'id' }).pipe(
      map((chats) =>
        this.addChatNameAndPic(currentUserId, chats as IChatFireBase[])
      )
    ) as Observable<IChatFireBase[]>;
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

}
