import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHeadearComponent } from './navbar-headear.component';

describe('NavbarHeadearComponent', () => {
  let component: NavbarHeadearComponent;
  let fixture: ComponentFixture<NavbarHeadearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarHeadearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarHeadearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
