import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductHorizontalComponent } from './card-product-horizontal.component';

describe('CardProductHorizontalComponent', () => {
  let component: CardProductHorizontalComponent;
  let fixture: ComponentFixture<CardProductHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardProductHorizontalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardProductHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
