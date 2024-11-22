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
        [Authorize]
        public async Task<IActionResult> GetUserByUserIdAsync([FromQuery] StatisticalTop10ProductInputDto inputDto)
        {
            var output = await statisticalService.StatisticalTop10ProductAsync(inputDto);

            return Ok(output);
        }
        [HttpGet("table3")]

        public async Task<IActionResult> GetRequestStatusStatisticsByMonth(Guid rentalShopId)
        {
            var output = await statisticalService.GetRequestStatusStatisticsByMonthAsync(rentalShopId);

            return Ok(output);
        }
        [HttpGet("table2")]

        public async Task<IActionResult> GetStatistic12Month(Guid rentalShopId)
        {
            var output = await statisticalService.GetStatistic12MonthAsync(rentalShopId);

            return Ok(output);
        }
        [HttpGet("StatisticProduct")]

        public async Task<IActionResult> GetStatisticProduct([FromQuery] StatisticalTop10ProductInputDto inputDto)
        {
            var output = await statisticalService.GetStatisticProductAsync(inputDto);

            return Ok(output);
        }

    }
}
