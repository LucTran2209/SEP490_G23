import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRentalListComponent } from './shop-rental-list.component';

describe('ShopRentalListComponent', () => {
  let component: ShopRentalListComponent;
  let fixture: ComponentFixture<ShopRentalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopRentalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopRentalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
