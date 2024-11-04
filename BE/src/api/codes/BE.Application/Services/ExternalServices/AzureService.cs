using BE.Application.DependencyInjections;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace BE.Application.Services.ExternalServices
{
    public class AzureService : IAzureService
    {
        private readonly AzureConfig _azureConfig;

        private static CloudStorageAccount? storageAccount;
        private static CloudBlobClient? blobClient;
        private static CloudBlobContainer? blobContainer;

        public AzureService(IOptions<AzureConfig> azureConfig)
        {
            _azureConfig = azureConfig.Value;
            storageAccount = CloudStorageAccount.Parse(_azureConfig.ContainerConnectionString);
            blobClient = storageAccount.CreateCloudBlobClient();
            blobContainer = blobClient.GetContainerReference(_azureConfig.ContainerName);
            blobContainer!.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Blob });
        }

        public async Task<string> UpLoadFileAsync(IFormFile file)
        {
            if (file.Length <= 0) return string.Empty;

            CloudBlockBlob blob = blobContainer!.GetBlockBlobReference(GetRandomBlobName(file.FileName));
            using (var stream = file.OpenReadStream())
            {
                await blob.UploadFromStreamAsync(stream);
            }

            return blob.Uri.ToString();
        }

        public async Task<List<string>> UpLoadFileAsync(List<IFormFile> files)
        {
            if (files.Count == 0) return new List<string>();

            List<string> blobUris = new List<string>();

            foreach (var file in files)
            {
                // Create a reference to the blob and upload the file
                CloudBlockBlob blob = blobContainer!.GetBlockBlobReference(GetRandomBlobName(file.FileName));
                using (var stream = file.OpenReadStream())
                {
                    await blob.UploadFromStreamAsync(stream);
                }

                // Add the URI of the uploaded blob to the list
                blobUris.Add(blob.Uri.ToString());
            }

            return blobUris;
        }

        private string GetRandomBlobName(string fileName)
        {
            string text = Path.GetExtension(fileName);
            return string.Format("{0:10}_{1}{2}", DateTime.Now.Ticks, Guid.NewGuid(), text);
        }
    }
}