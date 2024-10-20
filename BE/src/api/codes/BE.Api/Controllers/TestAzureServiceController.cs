using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestAzureServiceController : ControllerBase
    {
        private readonly IAzureService _azureService;

        public TestAzureServiceController(IAzureService azureService)
        {
            _azureService = azureService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UpLoad([FromForm] IFormFile file)
        {
            var result = await _azureService.UpLoadFileAsync(file);

            return Ok(result);
        }

        [HttpPost("upload/multi")]
        public async Task<IActionResult> UpLoad([FromForm] List<IFormFile> files)
        {
            var result = await _azureService.UpLoadFileAsync(files);

            return Ok(result);
        }
    }
}
