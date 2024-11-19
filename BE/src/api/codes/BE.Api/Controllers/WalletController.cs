using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Wallets.WalletServiceInputDto;
using BE.Infrastructure.VnPaySandbox.Models;
using Microsoft.AspNetCore.Mvc;

namespace BE.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WalletController : BaseController
    {
        private readonly IWalletService _walletService;

        public WalletController(IWalletService walletService)
        {
            _walletService = walletService;
        }

        [HttpPost("recharge")]
        public async Task<IActionResult> CreatePaymentUrl([FromBody] RechargeMoneyInputDto input)
        {
            var result = await _walletService.RechargeMoneyAsync(input, HttpContext);

            return ReturnFollowStatusCode(result);
        }

        [HttpGet("Recharge/PaymentCallback")]
        public IActionResult PaymentCallback([FromQuery] VnpayResponse query)
        {
            var result = _walletService.PaymentExecuteAsync(Request.Query);

            return ReturnFollowStatusCode(result);
        }
    }
}
