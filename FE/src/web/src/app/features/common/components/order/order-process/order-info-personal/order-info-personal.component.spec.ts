import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderInfoPersonalComponent } from './order-info-personal.component';

describe('OrderInfoPersonalComponent', () => {
  let component: OrderInfoPersonalComponent;
  let fixture: ComponentFixture<OrderInfoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderInfoPersonalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderInfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
