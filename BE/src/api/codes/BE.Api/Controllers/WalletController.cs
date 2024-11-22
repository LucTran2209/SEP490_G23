using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Wallets.WalletServiceInputDto;
using BE.Infrastructure.VnPaySandbox.Models;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize]
        [HttpPost("recharge")]
        public async Task<IActionResult> CreatePaymentUrl([FromBody] RechargeMoneyInputDto input)
        {
            var result = await _walletService.RechargeMoneyAsync(input, HttpContext);

            return ReturnFollowStatusCode(result);
        }
        
        [HttpGet("Recharge/PaymentCallback")]
        public async Task<IActionResult> PaymentCallback([FromQuery] VnpayResponse query)
        {
            var result = await _walletService.PaymentExecuteAsync(Request.Query);

            //return ReturnFollowStatusCode(result);
            return Redirect("http://localhost:4200/common/user/payment/my-wallet");
        }

        [HttpPost("deposit")]
        [Authorize]
        public async Task<IActionResult> DepositAsync([FromBody] DepoitMoneyInputDto inputDto)
        {
            var result = await _walletService.DepoitMoneyAsync(inputDto);

            return ReturnFollowStatusCode(result);
        }
        

    }
}
