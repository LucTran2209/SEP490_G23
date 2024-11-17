import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRentalRegistrationComponent } from './form-rental-registration.component';

describe('FormRentalRegistrationComponent', () => {
  let component: FormRentalRegistrationComponent;
  let fixture: ComponentFixture<FormRentalRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRentalRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRentalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
