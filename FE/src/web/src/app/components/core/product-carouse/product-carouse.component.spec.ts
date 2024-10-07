import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCarouseComponent } from './product-carouse.component';

describe('ProductCarouseComponent', () => {
  let component: ProductCarouseComponent;
  let fixture: ComponentFixture<ProductCarouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCarouseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductCarouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
