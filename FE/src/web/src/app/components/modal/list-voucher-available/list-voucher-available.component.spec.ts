import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVoucherAvailableComponent } from './list-voucher-available.component';

describe('ListVoucherAvailableComponent', () => {
  let component: ListVoucherAvailableComponent;
  let fixture: ComponentFixture<ListVoucherAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListVoucherAvailableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListVoucherAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
