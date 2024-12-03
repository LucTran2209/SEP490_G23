import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeactiveShopComponent } from './form-deactive-shop.component';

describe('FormDeactiveShopComponent', () => {
  let component: FormDeactiveShopComponent;
  let fixture: ComponentFixture<FormDeactiveShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDeactiveShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDeactiveShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
