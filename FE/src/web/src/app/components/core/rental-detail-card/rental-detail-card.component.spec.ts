import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalDetailCardComponent } from './rental-detail-card.component';

describe('RentalDetailCardComponent', () => {
  let component: RentalDetailCardComponent;
  let fixture: ComponentFixture<RentalDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalDetailCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
