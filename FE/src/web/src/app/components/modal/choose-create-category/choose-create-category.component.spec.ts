import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCreateCategoryComponent } from './choose-create-category.component';

describe('ChooseCreateCategoryComponent', () => {
  let component: ChooseCreateCategoryComponent;
  let fixture: ComponentFixture<ChooseCreateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseCreateCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseCreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
