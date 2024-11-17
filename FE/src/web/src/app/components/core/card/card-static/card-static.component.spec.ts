import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStaticComponent } from './card-static.component';

describe('CardStaticComponent', () => {
  let component: CardStaticComponent;
  let fixture: ComponentFixture<CardStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
