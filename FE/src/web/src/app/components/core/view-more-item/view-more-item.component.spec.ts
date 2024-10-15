import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreItemComponent } from './view-more-item.component';

describe('ViewMoreItemComponent', () => {
  let component: ViewMoreItemComponent;
  let fixture: ComponentFixture<ViewMoreItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewMoreItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMoreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
