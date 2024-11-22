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

        [HttpGet("table1")]

        public async Task<IActionResult> GetUserByUserIdAsync([FromQuery] StatisticalTop10ProductInputDto inputDto)
        {
            var output = await statisticalService.StatisticalTop10SubProductAsync(inputDto);

            return Ok(output);
        }
        [HttpGet("table3")]

        public async Task<IActionResult> GetRequestStatusStatisticsByMonth([FromQuery] StatisticalTop10ProductInputDto inputDto)
        {
            var output = await statisticalService.GetStatisticTable3Async(inputDto);

            return Ok(output);
        }
        [HttpGet("table2ByMonth")]

        public async Task<IActionResult> GetStatistic12Month([FromQuery] StatisticalTop10ProductInputDto inputDto)
        {
            var output = await statisticalService.GetStatisticTable2MAsync(inputDto);

            return Ok(output);
        }
        [HttpGet("table2ByWeek")]

        public async Task<IActionResult> GetStatistic12Week([FromQuery] StatisticalTop10ProductInputDto inputDto)
        {
            var output = await statisticalService.GetStatisticTable2WAsync(inputDto);

            return Ok(output);
        }
        [HttpGet("StatisticProduct")]
        [Authorize]
        public async Task<IActionResult> GetStatisticProduct([FromQuery] StatisticalTop10ProductInputDto inputDto)
        {
            var output = await statisticalService.GetStatisticProductAsync(inputDto);

            return Ok(output);
        }

    }
}
