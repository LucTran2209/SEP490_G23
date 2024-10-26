import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPersonalComponent } from './shop-personal.component';

describe('ShopPersonalComponent', () => {
  let component: ShopPersonalComponent;
  let fixture: ComponentFixture<ShopPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopPersonalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
