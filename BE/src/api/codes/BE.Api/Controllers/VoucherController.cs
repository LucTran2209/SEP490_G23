using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Vouchers.VoucherServiceInputDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VoucherController : BaseController
    {
        private readonly IVoucherService _voucherService;

        public VoucherController(IVoucherService voucherService)
        {
            _voucherService = voucherService;
        }

        [HttpGet("list")]
        [Authorize]
        public async Task<IActionResult> GetListVoucherAsync()
        {
            var result = await _voucherService.GetListVoucherAsync();
            return ReturnFollowStatusCode(result);
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> CreateVoucherAsync([FromBody] CreateVoucherInputDto inputDto)
        {
            var result = await _voucherService.CreateVoucherAsync(inputDto);
            return ReturnFollowStatusCode(result);
        }

        [HttpPut("{voucherId}")]
        [Authorize]
        public async Task<IActionResult> UpdateVoucherAsync(Guid voucherId, [FromBody] UpdateVoucherInputDto inputDto)
        {
            var result = await _voucherService.UpdateVoucherAsync(voucherId, inputDto);
            return ReturnFollowStatusCode(result);
        }


        [HttpPatch("{voucherId}/deactivate")]
        [Authorize]
        public async Task<IActionResult> DeactivateVoucherAsync(Guid voucherId)
        {
            var result = await _voucherService.DeactivateVoucherAsync(voucherId);
            return ReturnFollowStatusCode(result);
        }

        [HttpDelete("{voucherId}")]
        [Authorize]
        public async Task<IActionResult> DeleteVoucherAsync(Guid voucherId)
        {
            var result = await _voucherService.DeleteVoucherAsync(voucherId);
            return ReturnFollowStatusCode(result);
        }

        [HttpGet("{voucherId}")]
        [Authorize]
        public async Task<IActionResult> GetVoucherByIdAsync(Guid voucherId)
        {
            var result = await _voucherService.GetVoucherByIdAsync(voucherId);
            return StatusCode(result.StatusCode, result);
        }
    }
}
