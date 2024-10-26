import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRentalDetailComponent } from './product-rental-detail.component';

describe('ProductRentalDetailComponent', () => {
  let component: ProductRentalDetailComponent;
  let fixture: ComponentFixture<ProductRentalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductRentalDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductRentalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
