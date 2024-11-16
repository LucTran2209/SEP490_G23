import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestShopCardComponent } from './request-shop-card.component';

describe('RequestShopCardComponent', () => {
  let component: RequestShopCardComponent;
  let fixture: ComponentFixture<RequestShopCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestShopCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestShopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
