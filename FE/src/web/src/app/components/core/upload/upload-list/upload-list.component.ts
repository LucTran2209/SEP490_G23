import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrl: './upload-list.component.scss',
})
export class UploadListComponent {
  uploadedFiles: File[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef;
  @Output() listFiles = new EventEmitter<File[]>();
  @Output() removeAFile = new EventEmitter<any>();
  @Input() boundTypeFile?: string;
  @Input() title?: string;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files); 
    this.uploadedFiles.push(...newFiles); 
    this.listFiles.emit(newFiles);
    }
    // Reset file input to allow re-upload of the same file
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
    this.removeAFile.emit(index);
  }

  constructor() {}
}
