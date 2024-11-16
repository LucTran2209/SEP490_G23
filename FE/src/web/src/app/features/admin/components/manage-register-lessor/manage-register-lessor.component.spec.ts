import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRegisterLessorComponent } from './manage-register-lessor.component';

describe('ManageRegisterLessorComponent', () => {
  let component: ManageRegisterLessorComponent;
  let fixture: ComponentFixture<ManageRegisterLessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageRegisterLessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageRegisterLessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
