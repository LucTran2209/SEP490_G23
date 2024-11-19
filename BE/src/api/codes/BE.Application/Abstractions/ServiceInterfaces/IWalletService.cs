using BE.Application.Services.Wallets.WalletServiceInputDto;
using Microsoft.AspNetCore.Http;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IWalletService
    {
        Task<ResultService> RechargeMoneyAsync(RechargeMoneyInputDto inputDto, HttpContext context);
    }
}
