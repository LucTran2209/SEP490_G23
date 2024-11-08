import { Timestamp } from "rxjs";

export interface IChatRoom {
  id: string;
  name: string;
  dateCreated: number;
  lastMessage: string;
}

export interface IMember {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface IUserFireBase {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface IChatFireBase {
  id: string;
  lastMessageDate?: Date | any;
  lastMessage?: string;
  userIds: string[];
  users: IUserFireBase[];

  chatPic?: string;
  chatName?: string;
}

export interface IMessageFireBase {
  text: string;
  senderId: string;
  sentDate: Date | any;
}

export interface IMessage {
  id: string;
  message: string;
  dateCreated: number;
  user: Pick<IMember, 'firstName' | 'lastName' | 'username'>;
}
