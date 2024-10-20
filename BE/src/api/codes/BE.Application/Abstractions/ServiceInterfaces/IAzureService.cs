using Microsoft.AspNetCore.Http;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IAzureService
    {
        Task<string> UpLoadFileAsync(IFormFile file);

        Task<List<string>> UpLoadFileAsync(List<IFormFile> files);
    }
}
