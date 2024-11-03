import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRadioCollateralComponent } from './select-radio-collateral.component';

describe('SelectRadioCollateralComponent', () => {
  let component: SelectRadioCollateralComponent;
  let fixture: ComponentFixture<SelectRadioCollateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectRadioCollateralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectRadioCollateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
