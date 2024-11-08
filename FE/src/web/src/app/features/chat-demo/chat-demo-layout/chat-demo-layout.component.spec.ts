import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDemoLayoutComponent } from './chat-demo-layout.component';

describe('ChatDemoLayoutComponent', () => {
  let component: ChatDemoLayoutComponent;
  let fixture: ComponentFixture<ChatDemoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatDemoLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatDemoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
