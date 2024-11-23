import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefProcedureRentalComponent } from './brief-procedure-rental.component';

describe('BriefProcedureRentalComponent', () => {
  let component: BriefProcedureRentalComponent;
  let fixture: ComponentFixture<BriefProcedureRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BriefProcedureRentalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BriefProcedureRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
