import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeelbackCardComponent } from './feelback-card.component';

describe('FeelbackCardComponent', () => {
  let component: FeelbackCardComponent;
  let fixture: ComponentFixture<FeelbackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeelbackCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeelbackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
