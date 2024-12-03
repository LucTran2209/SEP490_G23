import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusOrderComponent } from './change-status-order.component';

describe('ChangeStatusOrderComponent', () => {
  let component: ChangeStatusOrderComponent;
  let fixture: ComponentFixture<ChangeStatusOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeStatusOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeStatusOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
