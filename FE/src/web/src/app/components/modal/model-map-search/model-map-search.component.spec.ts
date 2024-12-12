import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMapSearchComponent } from './model-map-search.component';

describe('ModelMapSearchComponent', () => {
  let component: ModelMapSearchComponent;
  let fixture: ComponentFixture<ModelMapSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelMapSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelMapSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
