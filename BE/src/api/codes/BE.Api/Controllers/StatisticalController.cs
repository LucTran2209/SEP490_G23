using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Statisticals.StatisticalServiceInputDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StatisticalController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IStatisticalService statisticalService;

        public StatisticalController(ILogger<UserController> logger, IStatisticalService statisticalService)
        {
            _logger = logger;
            this.statisticalService = statisticalService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserByUserIdAsync(StatisticalTop10ProductInputDto inputDto)
        {
            var output = await statisticalService.StatisticalTop10ProductAsync(inputDto);

            return Ok(output);
        }
    }
}
