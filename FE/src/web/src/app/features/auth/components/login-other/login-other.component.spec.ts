import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOtherComponent } from './login-other.component';

describe('LoginOtherComponent', () => {
  let component: LoginOtherComponent;
  let fixture: ComponentFixture<LoginOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginOtherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
