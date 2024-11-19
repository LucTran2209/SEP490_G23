import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:FE/src/web/src/app/features/common/components/my-wallet/my-wallet.component.spec.ts
import { MyWalletComponent } from './my-wallet.component';

describe('MyWalletComponent', () => {
  let component: MyWalletComponent;
  let fixture: ComponentFixture<MyWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyWalletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyWalletComponent);
========
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
>>>>>>>> 33e8bd0 (update UI dashboard):FE/src/web/src/app/features/lessor/components/overview/order-latest/order-latest.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
