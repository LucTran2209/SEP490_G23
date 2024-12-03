import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifcationLatestComponent } from './notifcation-latest.component';

describe('NotifcationLatestComponent', () => {
  let component: NotifcationLatestComponent;
  let fixture: ComponentFixture<NotifcationLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotifcationLatestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifcationLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
