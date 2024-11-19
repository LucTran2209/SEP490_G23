using BE.Application.Abstractions.ServiceInterfaces;
using BE.Infrastructure.VnPaySandbox;
using BE.Infrastructure.VnPaySandbox.Models;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestAzureServiceController : ControllerBase
    {
        private readonly IAzureService _azureService;
        private readonly IVnPaySandboxService _vnPaySandboxService;

        public TestAzureServiceController(IAzureService azureService, IVnPaySandboxService vnPaySandboxService)
        {
            _azureService = azureService;
            _vnPaySandboxService = vnPaySandboxService;
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

        [HttpPost("create/url")]
        public IActionResult CreatePaymentUrl([FromBody] PaymentInformationModel model)
        {
            var url = _vnPaySandboxService.CreatePaymentUrl(model, HttpContext);

            return Ok(url);
        }

        [HttpGet("/Home/PaymentCallback")]
        public IActionResult PaymentCallback([FromQuery] VnpayResponse query)
        {
            var response = _vnPaySandboxService.PaymentExecute(Request.Query);

            return Ok(response);
        }
    }
}