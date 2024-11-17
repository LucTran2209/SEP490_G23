import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyOrderComponent } from './list-my-order.component';

describe('ListMyOrderComponent', () => {
  let component: ListMyOrderComponent;
  let fixture: ComponentFixture<ListMyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMyOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
