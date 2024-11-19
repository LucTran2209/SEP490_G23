import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatisticComponent } from './order-statistic.component';

describe('OrderStatisticComponent', () => {
  let component: OrderStatisticComponent;
  let fixture: ComponentFixture<OrderStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderStatisticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
