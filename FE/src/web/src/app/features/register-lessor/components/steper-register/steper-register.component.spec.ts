import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteperRegisterComponent } from './steper-register.component';

describe('SteperRegisterComponent', () => {
  let component: SteperRegisterComponent;
  let fixture: ComponentFixture<SteperRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SteperRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SteperRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
