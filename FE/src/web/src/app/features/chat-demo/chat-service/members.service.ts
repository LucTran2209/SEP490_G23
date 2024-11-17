import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IMember, IUserFireBase } from '../../../interfaces/Chat.interface';
import { BehaviorSubject, concatMap, map, Observable, switchMap, take } from 'rxjs';
import { addDoc, collection, collectionData, doc, docData, Firestore, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private collection = this.afs.collection<IMember>("member");

  private username$ = new BehaviorSubject<string | null>(null);
  constructor(private firestore: Firestore,private afs: AngularFirestore) {}

  member$: Observable<IMember[]> = this.collection.get().pipe(
    map(values => {
      return values.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })
    })
  )

  // currentMember$: Observable<IMember | undefined> = this.username$.pipe(
  //   switchMap(username => {
  //     return this.member$.pipe(
  //       map(members => members.find(m => m.username === username))
  //     )
  //   })
  // )
  // setCurrentMember(username: string): void {
  //   this.username$.next(username);
  // }
// ------------------------------------------------------------------------------

  get allMembers$(): Observable<IUserFireBase[]> {
    const ref = collection(this.firestore,"users");
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<IUserFireBase[]>
  }

  getUserById(id: string): Observable<IUserFireBase> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef) as Observable<IUserFireBase>
    
  }

 

}
