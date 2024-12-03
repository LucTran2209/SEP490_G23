import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchVoucherComponent } from './form-search-voucher.component';

describe('FormSearchVoucherComponent', () => {
  let component: FormSearchVoucherComponent;
  let fixture: ComponentFixture<FormSearchVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSearchVoucherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSearchVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
