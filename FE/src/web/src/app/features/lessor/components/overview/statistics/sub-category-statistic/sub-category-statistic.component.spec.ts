import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryStatisticComponent } from './sub-category-statistic.component';

describe('SubCategoryStatisticComponent', () => {
  let component: SubCategoryStatisticComponent;
  let fixture: ComponentFixture<SubCategoryStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCategoryStatisticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubCategoryStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
