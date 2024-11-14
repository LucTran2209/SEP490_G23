using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Vouchers.VoucherServiceInputDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BE.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VoucherController : BaseController
    {
        private readonly ILogger<VoucherController> _logger;
        private readonly IVoucherService _voucherService;

        public VoucherController(ILogger<VoucherController> logger, IVoucherService voucherService)
        {
            _logger = logger;
            _voucherService = voucherService;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAllVouchersAsync()
        {
            var output = await _voucherService.GetAllVouchersAsync();
            return ReturnFollowStatusCode(output);
        }

        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetVoucherByIdAsync(Guid id)
        {
            var output = await _voucherService.GetVoucherByIdAsync(id);
            return ReturnFollowStatusCode(output);
        }

        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> AddAsync([FromBody] CreateVoucherInputDto inputDto)
        {
            var output = await _voucherService.CreateVoucherAsync(inputDto);
            return ReturnFollowStatusCode(output);
        }

        [HttpPut("{id}")]
        //[Authorize]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] UpdateVoucherInputDto inputDto)
        {
            var output = await _voucherService.UpdateVoucherAsync(inputDto, id);
            return ReturnFollowStatusCode(output);
        }

        [HttpDelete("{id}")]
        //[Authorize]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var output = await _voucherService.DeleteVoucherAsync(id);
            return ReturnFollowStatusCode(output);
        }
    }
}
