import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatDemoLayoutComponent } from './chat-demo-layout/chat-demo-layout.component';

const routes: Routes = [
  {
    path: 'chatroom',
    component: ChatDemoLayoutComponent,
    children: [
      {
        path: ':chatroomid',
        component: ChatRoomComponent,
      },
    ],
  },
  {
    path: '', redirectTo: 'chatroom', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatDemoRoutingModule {}
