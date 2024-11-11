using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.RentalShops.RentalShopServiceInputDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RentalShopController : BaseController
    {
        private readonly ILogger<RentalShopController> _logger;
        private readonly IRentalShopService rentalShopService;

        public RentalShopController(ILogger<RentalShopController> logger, IRentalShopService rentalShopService)
        {
            _logger = logger;
            this.rentalShopService = rentalShopService;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetListAsync([FromQuery] GetListRentalShopInputDto inputDto)
        {
            var output = await rentalShopService.GetListRentalShopAsync(inputDto);
            return Ok(output);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRentalShopDetailAsync(Guid id)
        {
            var output = await rentalShopService.GetRentalShopDetailByIdAsync(id);
            return Ok(output);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateAsync([FromForm] CreateRentalShopInputDto inputDto)
        {
            var output = await rentalShopService.CreateAsync(inputDto);

            return ReturnFollowStatusCode(output);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] UpdateRentalShopInputDto inputDto)
        {
            var output = await rentalShopService.UpdateAsync(inputDto, id);

            return ReturnFollowStatusCode(output);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var output = await rentalShopService.DeleteAsync(id);

            return ReturnFollowStatusCode(output);
        }

        [HttpGet("AllRequestShop")]
        [Authorize]
        public async Task<IActionResult> GetAllRentalShopByNotActiveAsync([FromQuery] GetAllRentalShopByNotActiveInputDto inputDto)
        {
            var output = await rentalShopService.GetAllRentalShopByNotActiveAsync(inputDto);
            return ReturnFollowStatusCode(output);
        }
        [HttpGet("RequestShopById")]
        [Authorize]
        public async Task<IActionResult> GetRentalShopByNotActiveAsync(Guid id)
        {
            var output = await rentalShopService.GetRentalShopByNotActiveAsync(id);
            return ReturnFollowStatusCode(output);
        }
        [HttpPut("ActiveShopById")]
        [Authorize]
        public async Task<IActionResult> ActiveRentalShopAsync(ActiveRentalShopInputDto input)
        {
            var output = await rentalShopService.ActiveRentalShopAsync(input);
            return ReturnFollowStatusCode(output);
        }
        [HttpPut("ActivityShopById")]
        [Authorize]
        public async Task<IActionResult> ActivityRentalShopAsync(ActivityRentalShopInputDto input)
        {
            var output = await rentalShopService.ActivityRentalShopAsync(input);
            return ReturnFollowStatusCode(output);
        }
    }
}