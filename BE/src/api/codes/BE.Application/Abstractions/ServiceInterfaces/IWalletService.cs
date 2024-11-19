using BE.Application.Services.Wallets.WalletServiceInputDto;
using BE.Infrastructure.VnPaySandbox.Models;
using Microsoft.AspNetCore.Http;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IWalletService
    {
        Task<ResultService> RechargeMoneyAsync(RechargeMoneyInputDto inputDto, HttpContext context);
        ResultService PaymentExecuteAsync(IQueryCollection query);
    }
}
