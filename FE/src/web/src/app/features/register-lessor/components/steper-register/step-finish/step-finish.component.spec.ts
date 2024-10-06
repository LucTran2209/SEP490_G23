import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFinishComponent } from './step-finish.component';

describe('StepFinishComponent', () => {
  let component: StepFinishComponent;
  let fixture: ComponentFixture<StepFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepFinishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
