import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatDemoRoutingModule } from './chat-demo-routing.module';
import { ChatRoomListComponent } from './chat-room-list/chat-room-list.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { SharedModule } from '../../components/shared/shared.module';
import { ChatDemoLayoutComponent } from './chat-demo-layout/chat-demo-layout.component';

@NgModule({
  declarations: [
    ChatRoomListComponent,
    ChatRoomComponent,
    ChatDemoLayoutComponent,
  ],
  imports: [SharedModule, CommonModule, ChatDemoRoutingModule],
})
export class ChatDemoModule {}
