import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:FE/src/web/src/app/features/lessor/components/overview/order-latest/order-latest.component.spec.ts
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
========
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
>>>>>>>> 33e8bd0 (update UI dashboard):FE/src/web/src/app/features/lessor/components/overview/statistics/order-statistic/order-statistic.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
