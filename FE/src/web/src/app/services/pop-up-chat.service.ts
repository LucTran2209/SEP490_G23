import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopUpChatService {
  private popUpChat = new BehaviorSubject<boolean>(false);
  popUpChatObservable$ = this.popUpChat.asObservable();

  tooglePopUp(val: boolean) {
    this.popUpChat.next(val);
  }
}
