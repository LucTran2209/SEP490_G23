import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShopsComponent } from './manage-shops.component';

describe('ManageShopsComponent', () => {
  let component: ManageShopsComponent;
  let fixture: ComponentFixture<ManageShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageShopsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
