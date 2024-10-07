import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTaxComponent } from './step-tax.component';

describe('StepTaxComponent', () => {
  let component: StepTaxComponent;
  let fixture: ComponentFixture<StepTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepTaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
