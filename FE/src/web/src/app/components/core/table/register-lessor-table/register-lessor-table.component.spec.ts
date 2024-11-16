import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLessorTableComponent } from './register-lessor-table.component';

describe('RegisterLessorTableComponent', () => {
  let component: RegisterLessorTableComponent;
  let fixture: ComponentFixture<RegisterLessorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterLessorTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterLessorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
