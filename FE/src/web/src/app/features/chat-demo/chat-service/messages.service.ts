import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, scan } from 'rxjs';
import { IMessage } from '../../../interfaces/Chat.interface';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private afs: AngularFirestore) {}

  getRoomMessages(roomId: string): Observable<Record<string, IMessage>> {
    return this.afs
      .collection<IMessage>(`chatRoom/${roomId}/messages`, (ref) =>
        ref.limit(100).orderBy('dateCreated', 'asc')
      )
      .snapshotChanges()
      .pipe(
        map((values) => {
          return values.reduce((obj, v) => {
            const message = {
              ...v.payload.doc.data(),
              id: v.payload.doc.id,
            } as IMessage;
            obj[message.id] = message;
            return obj;
          }, {} as { [key: string]: IMessage });
        }),
        scan((messages, addMessages) => {
          return {
            ...messages,
            ...addMessages
          } as Record<string, IMessage>
        })
      );
  }

  async sendMessage(roomId: string, message: IMessage): Promise<void> {
    await this.afs.collection<IMessage>(`chatRoom/${roomId}/messages`).add(message);
  }
}
