import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRadioRentalDayComponent } from './select-radio-rental-day.component';

describe('SelectRadioRentalDayComponent', () => {
  let component: SelectRadioRentalDayComponent;
  let fixture: ComponentFixture<SelectRadioRentalDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectRadioRentalDayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectRadioRentalDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
