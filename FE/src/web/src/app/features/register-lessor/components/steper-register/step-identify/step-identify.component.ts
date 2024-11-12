import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { FeatureAppState } from '../../../../../store/app.state';
import { stepInfoCard } from '../../../state/register_lessor.actions';
import {
  selectImageBack,
  selectImageFileBack,
  selectImageFileFront,
  selectImageFront,
} from '../../../state/register_lessor.reducer';

@Component({
  selector: 'app-step-identify',
  templateUrl: './step-identify.component.html',
  styleUrl: './step-identify.component.scss',
})
export class StepIdentifyComponent implements OnInit, OnDestroy {
  frontImageFile: File | null = null;
  backImageFile: File | null = null;
  frontImagePreview: string | null = null;
  backImagePreview: string | null = null;

  @Output() nextStep = new EventEmitter<void>();
  @Output() prevStep = new EventEmitter<void>();

  subscription?: Subscription;

  isValidUploadImage(): boolean {
    if (this.frontImageFile && this.backImageFile) return true;
    return false;
  }
  onFileSelect(e: Event, typeImage: string) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Tạo URL tạm thời từ file
      const fileURL = URL.createObjectURL(file);
  
      if (typeImage === 'front') {
        this.frontImageFile = file;
        this.frontImagePreview = fileURL;  // Gán URL tạm thời cho frontImagePreview
      } else {
        this.backImageFile = file;
        this.backImagePreview = fileURL;  // Gán URL tạm thời cho backImagePreview
      }
    }
   
  }

  onSubmit() {
    if (!this.frontImageFile || !this.backImageFile) {
      alert('Vui lòng chọn cả ảnh mặt trước và mặt sau.');
      return;
    }
    if (this.frontImageFile && this.backImageFile && this.frontImagePreview && this.backImagePreview) {
      this.store.dispatch(
        stepInfoCard({
          content: {
            imageFront: this.frontImagePreview,
            imageBack: this.backImagePreview,
            imageFileBack: this.backImageFile,
            imageFileFront: this.frontImageFile
          },
        })
      );
      this.nextStep.emit();
    } 
  }

  goBack(): void {
    this.prevStep.emit();
  }

  constructor(private store: Store<FeatureAppState>, private cdRef: ChangeDetectorRef) {}

  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.subscription = combineLatest([
      this.store.select(selectImageFront),
      this.store.select(selectImageBack),
      this.store.select(selectImageFileFront),
      this.store.select(selectImageFileBack),
    ]).subscribe(([val1, val2, val3, val4]) => {
      this.frontImagePreview = val1;
      this.backImagePreview = val2;
      this.frontImageFile = val3;
      this.backImageFile = val4;
    });
  }
}
