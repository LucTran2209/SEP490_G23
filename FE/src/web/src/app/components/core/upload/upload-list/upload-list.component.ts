import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrl: './upload-list.component.scss'
})
export class UploadListComponent {
  uploadedFiles: File[] = [];
  @Output() listFiles = new EventEmitter<File[]>();
  @Output() removeAFile = new EventEmitter<any>();
  @Input() boundTypeFile?: string;
  @Input() title?: string;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.uploadedFiles = Array.from(input.files);
    }
    this.listFiles.emit(this.uploadedFiles);
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
    this.removeAFile.emit(index);
  }
}
