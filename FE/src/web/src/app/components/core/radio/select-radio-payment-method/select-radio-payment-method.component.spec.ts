import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRadioPaymentMethodComponent } from './select-radio-payment-method.component';

describe('SelectRadioPaymentMethodComponent', () => {
  let component: SelectRadioPaymentMethodComponent;
  let fixture: ComponentFixture<SelectRadioPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectRadioPaymentMethodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectRadioPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
