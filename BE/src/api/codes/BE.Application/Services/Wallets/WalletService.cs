
using BE.Application.Services.Wallets.WalletServiceInputDto;
using BE.Infrastructure.VnPaySandbox;
using BE.Infrastructure.VnPaySandbox.Models;
using Microsoft.AspNetCore.Http;

namespace BE.Application.Services.Wallets
{
    public class WalletService : BaseService, IWalletService
    {
        private readonly IVnPaySandboxService _vnPaySandboxService;
        private readonly IMapper _mapper;

        public WalletService(IUnitOfWork unitOfWork, IUser user,
                             IVnPaySandboxService vnPaySandboxService,
                             IMapper mapper
            ) : base(unitOfWork, user)
        {
            _vnPaySandboxService = vnPaySandboxService;
            _mapper = mapper;
        }      

        public async Task<ResultService> RechargeMoneyAsync(RechargeMoneyInputDto inputDto, HttpContext context)
        {
            var paymentModel = _mapper.Map<PaymentInformationModel>(inputDto);

            paymentModel.Name = user.FullName;

            var url = _vnPaySandboxService.CreatePaymentUrl(paymentModel, context);

            var rechargeHistory = new RechargeHistory()
            {
                UserId = user.Id ?? Guid.Empty,
                BeforeBalance = user.Balance,
                AmountRecharge = (decimal)inputDto.Amount,
                RechargeStatus = RechargeStatus.WaitingPayment,
            };

            await unitOfWork.RechargeHistoryRepository.AddAsync(rechargeHistory);

            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                Datas = url,
                StatusCode = (int)HttpStatusCode.OK,
            };
        }

        public ResultService PaymentExecuteAsync(IQueryCollection query)
        {
            var status = _vnPaySandboxService.PaymentExecute(query);

            return new ResultService()
            {
                Datas = status,
                StatusCode = (int)HttpStatusCode.OK,
            };
        }
    }
}
