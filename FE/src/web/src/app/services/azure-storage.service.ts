import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AzureStorageService {
  private blobServiceClient: BlobServiceClient;
  private containerClient;
  private UrlBlobServiceClient = environment.azureConfig.sasService;
  constructor() {
    this.blobServiceClient = new BlobServiceClient(this.UrlBlobServiceClient);
    this.containerClient = this.blobServiceClient.getContainerClient(
      environment.azureConfig.containerName
    );
  }

  // upload file
  async uploadFileAzure(file: File[]): Promise<string[]> {
    const urlRes= [];
    for (const f of file) {
      const blobClient = this.containerClient.getBlockBlobClient(f.name);
     await blobClient.uploadData(f);
      urlRes.push(blobClient.url);
    }
    return urlRes;
  }
  // lists file
 async listFileAzure(): Promise<string[]> {
  const fileUrls = [];
  for await (const blob of this.containerClient.listBlobsFlat()) {
    const blobClient = this.containerClient.getBlobClient(blob.name);
    fileUrls.push(blobClient.url);
  }
  return fileUrls;
 }
  //
}
