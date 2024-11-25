import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVoucherAvailableComponent } from './detail-voucher-available.component';

describe('DetailVoucherAvailableComponent', () => {
  let component: DetailVoucherAvailableComponent;
  let fixture: ComponentFixture<DetailVoucherAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailVoucherAvailableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailVoucherAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
