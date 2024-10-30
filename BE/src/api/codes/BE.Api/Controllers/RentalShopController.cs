using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.RentalShops.RentalShopServiceInputDto;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RentalShopController : ControllerBase
    {
        private readonly ILogger<RentalShopController> _logger;
        private readonly IRentalShopService rentalShopService;

        public RentalShopController(ILogger<RentalShopController> logger, IRentalShopService rentalShopService)
        {
            _logger = logger;
            this.rentalShopService = rentalShopService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromForm] CreateRentalShopInputDto inputDto)
        {
            var output = await rentalShopService.CreateAsync(inputDto);
            return Created(output.StatusCode, output);
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetListAsync([FromQuery] GetListRentalShopInputDto inputDto)
        {
            var output = await rentalShopService.GetListRentalShopAsync(inputDto);
            return Ok(output);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRentalShopDetailByIdAsync(Guid id)
        {
            var output = await rentalShopService.GetRentalShopDetailByIdAsync(id);
            return Ok(output);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] UpdateRentalShopInputDto inputDto)
        {
            var output = await rentalShopService.UpdateAsync(inputDto, id);
            return Ok(output);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var output = await rentalShopService.DeleteAsync(id);
            return Ok(output);
        }
    }
}