import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeBringComponent } from './we-bring.component';

describe('WeBringComponent', () => {
  let component: WeBringComponent;
  let fixture: ComponentFixture<WeBringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeBringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeBringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
