import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowitorderComponent } from './howitorder.component';

describe('HowitorderComponent', () => {
  let component: HowitorderComponent;
  let fixture: ComponentFixture<HowitorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowitorderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HowitorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
