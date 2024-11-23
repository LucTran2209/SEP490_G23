import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAboutWeComponent } from './feedback-about-we.component';

describe('FeedbackAboutWeComponent', () => {
  let component: FeedbackAboutWeComponent;
  let fixture: ComponentFixture<FeedbackAboutWeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackAboutWeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackAboutWeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
