import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavbarHeaderComponent } from './user-navbar-header.component';

describe('UserNavbarHeaderComponent', () => {
  let component: UserNavbarHeaderComponent;
  let fixture: ComponentFixture<UserNavbarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserNavbarHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserNavbarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
