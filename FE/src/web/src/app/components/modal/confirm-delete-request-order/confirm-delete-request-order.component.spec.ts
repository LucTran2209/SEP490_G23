import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteRequestOrderComponent } from './confirm-delete-request-order.component';

describe('ConfirmDeleteRequestOrderComponent', () => {
  let component: ConfirmDeleteRequestOrderComponent;
  let fixture: ComponentFixture<ConfirmDeleteRequestOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDeleteRequestOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmDeleteRequestOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
