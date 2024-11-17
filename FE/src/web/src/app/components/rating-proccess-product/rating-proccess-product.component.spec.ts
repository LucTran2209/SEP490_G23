import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingProccessProductComponent } from './rating-proccess-product.component';

describe('RatingProccessProductComponent', () => {
  let component: RatingProccessProductComponent;
  let fixture: ComponentFixture<RatingProccessProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingProccessProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RatingProccessProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
