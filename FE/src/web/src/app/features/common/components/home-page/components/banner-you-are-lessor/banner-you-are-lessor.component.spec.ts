import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerYouAreLessorComponent } from './banner-you-are-lessor.component';

describe('BannerYouAreLessorComponent', () => {
  let component: BannerYouAreLessorComponent;
  let fixture: ComponentFixture<BannerYouAreLessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerYouAreLessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerYouAreLessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
