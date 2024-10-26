import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerTimerComponent } from './picker-timer.component';

describe('PickerTimerComponent', () => {
  let component: PickerTimerComponent;
  let fixture: ComponentFixture<PickerTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PickerTimerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickerTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
