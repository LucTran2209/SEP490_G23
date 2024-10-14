import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPostRentalComponent } from './filter-post-rental.component';

describe('FilterPostRentalComponent', () => {
  let component: FilterPostRentalComponent;
  let fixture: ComponentFixture<FilterPostRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterPostRentalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterPostRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
