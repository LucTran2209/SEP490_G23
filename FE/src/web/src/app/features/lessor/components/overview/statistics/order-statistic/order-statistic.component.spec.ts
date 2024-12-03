import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:FE/src/web/src/app/features/lessor/components/overview/statistics/order-statistic/order-statistic.component.spec.ts
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
========
import { SelectDateRangeComponent } from './select-date-range.component';

describe('SelectDateRangeComponent', () => {
  let component: SelectDateRangeComponent;
  let fixture: ComponentFixture<SelectDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectDateRangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectDateRangeComponent);
>>>>>>>> 33e8bd0 (update UI dashboard):FE/src/web/src/app/components/core/select/select-date-range/select-date-range.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
