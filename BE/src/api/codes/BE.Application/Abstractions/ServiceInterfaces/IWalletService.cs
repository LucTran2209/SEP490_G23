using BE.Application.Services.Wallets.WalletServiceInputDto;
using Microsoft.AspNetCore.Http;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IWalletService
    {
        Task<ResultService> RechargeMoneyAsync(RechargeMoneyInputDto inputDto, HttpContext context);
        Task<ResultService> PaymentExecuteAsync(IQueryCollection query);
        Task<ResultService> DepoitMoneyAsync(DepoitMoneyInputDto inputDto);
        Task<ResultService> GetListHistoryAsync(TransmitHistoryInputDto inputDto);

        Task AddHistory(Guid userId, decimal? BeforeBalance, decimal? AmountRecharge, RechargeStatus RechargeStatus, RechargeType RechargeType);
        Task ChangeBalance(Guid userId, decimal amount, bool isAdding);
    }
}
