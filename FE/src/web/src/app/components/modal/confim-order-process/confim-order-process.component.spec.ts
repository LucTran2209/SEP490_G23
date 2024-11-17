import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimOrderProcessComponent } from './confim-order-process.component';

describe('ConfimOrderProcessComponent', () => {
  let component: ConfimOrderProcessComponent;
  let fixture: ComponentFixture<ConfimOrderProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfimOrderProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfimOrderProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
