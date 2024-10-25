import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterItemComponent } from './renter-item.component';

describe('RenterItemComponent', () => {
  let component: RenterItemComponent;
  let fixture: ComponentFixture<RenterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenterItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
