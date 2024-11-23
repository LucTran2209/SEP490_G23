import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBringCategoryComponent } from './top-bring-category.component';

describe('TopBringCategoryComponent', () => {
  let component: TopBringCategoryComponent;
  let fixture: ComponentFixture<TopBringCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopBringCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopBringCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
