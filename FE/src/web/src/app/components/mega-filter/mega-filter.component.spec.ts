import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaFilterComponent } from './mega-filter.component';

describe('MegaFilterComponent', () => {
  let component: MegaFilterComponent;
  let fixture: ComponentFixture<MegaFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MegaFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MegaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
