import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepIdentifyComponent } from './step-identify.component';

describe('StepIdentifyComponent', () => {
  let component: StepIdentifyComponent;
  let fixture: ComponentFixture<StepIdentifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepIdentifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepIdentifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
