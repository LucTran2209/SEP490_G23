import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:FE/src/web/src/app/features/register-lessor/components/steper-register/step-finish/step-finish.component.spec.ts
import { StepFinishComponent } from './step-finish.component';

describe('StepFinishComponent', () => {
  let component: StepFinishComponent;
  let fixture: ComponentFixture<StepFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepFinishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepFinishComponent);
========
import { ManagePostComponent } from './manage-post.component';

describe('ManagePostComponent', () => {
  let component: ManagePostComponent;
  let fixture: ComponentFixture<ManagePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagePostComponent);
>>>>>>>> dev/fe/base-source:FE/src/web/src/app/features/lessor/components/manage-post/manage-post.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
