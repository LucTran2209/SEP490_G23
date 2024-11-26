import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCancelOrderComponent } from './form-cancel-order.component';

describe('FormCancelOrderComponent', () => {
  let component: FormCancelOrderComponent;
  let fixture: ComponentFixture<FormCancelOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCancelOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCancelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
