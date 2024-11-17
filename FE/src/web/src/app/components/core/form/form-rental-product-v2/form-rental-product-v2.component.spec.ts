import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRentalProductV2Component } from './form-rental-product-v2.component';

describe('FormRentalProductV2Component', () => {
  let component: FormRentalProductV2Component;
  let fixture: ComponentFixture<FormRentalProductV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRentalProductV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRentalProductV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
