import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRentalProductComponent } from './form-rental-product.component';

describe('FormRentalProductComponent', () => {
  let component: FormRentalProductComponent;
  let fixture: ComponentFixture<FormRentalProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRentalProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRentalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
