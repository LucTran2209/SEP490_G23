import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRetailListComponent } from './post-retail-list.component';

describe('PostRetailListComponent', () => {
  let component: PostRetailListComponent;
  let fixture: ComponentFixture<PostRetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostRetailListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostRetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
