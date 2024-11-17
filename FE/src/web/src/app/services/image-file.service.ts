import { Injectable } from '@angular/core';
import { NzUploadFile, UploadFileStatus } from 'ng-zorro-antd/upload';

@Injectable({
  providedIn: 'root'
})
export class ImageFileService {

  constructor() { }
  async fetchImagesAsFiles(images: (string | File)[]): Promise<File[]> {
    return Promise.all(
      images.map(async (image, index) => {
        if (typeof image === 'string') {
          // Fetch and convert the URL to a File object
          const response = await fetch(image);
          const blob = await response.blob();
          return new File([blob], `image-${index}.jpg`, { type: blob.type });
        }
        // Return the File object as-is
        return image;
      })
    );
  }

  processImageList(images: (string | File)[]): NzUploadFile[] {
    return images.map((image, index) => {
      if (typeof image === 'string') {
        return {
          uid: `${index}`,
          name: `image-${index}.jpg`,
          status: 'done', // Explicitly cast as UploadFileStatus
          url: image
        };
      } else {
        const url = URL.createObjectURL(image);
        return {
          uid: `${index}`,
          name: image.name,
          status: 'done', // Explicitly cast as UploadFileStatus
          originFileObj: image,
          url: url
        };
      }
    });
  }
}
