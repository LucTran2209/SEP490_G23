import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLatestComponent } from './order-latest.component';

describe('OrderLatestComponent', () => {
  let component: OrderLatestComponent;
  let fixture: ComponentFixture<OrderLatestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderLatestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
