import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturePostsComponent } from './feature-posts.component';

describe('FeaturePostsComponent', () => {
  let component: FeaturePostsComponent;
  let fixture: ComponentFixture<FeaturePostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturePostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
