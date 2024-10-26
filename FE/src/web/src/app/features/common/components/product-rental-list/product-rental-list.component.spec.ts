import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRentalListComponent } from './product-rental-list.component';

describe('ProductRentalListComponent', () => {
  let component: ProductRentalListComponent;
  let fixture: ComponentFixture<ProductRentalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductRentalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductRentalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
