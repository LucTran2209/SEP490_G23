import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectViewStatisticComponent } from './select-view-statistic.component';

describe('SelectViewStatisticComponent', () => {
  let component: SelectViewStatisticComponent;
  let fixture: ComponentFixture<SelectViewStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectViewStatisticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectViewStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
