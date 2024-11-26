
using BE.Application.Services.Wallets.WalletServiceInputDto;
using BE.Infrastructure.VnPaySandbox;
using BE.Infrastructure.VnPaySandbox.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace BE.Application.Services.Wallets
{
    public class WalletService : BaseService, IWalletService
    {
        private readonly IVnPaySandboxService _vnPaySandboxService;
        private readonly IValidator<DepoitMoneyInputDto> _depoitMoneyValidator;
        private readonly IMapper _mapper;

        public WalletService(IUnitOfWork unitOfWork, IUser user,
                             IVnPaySandboxService vnPaySandboxService,
                             IValidator<DepoitMoneyInputDto> depoitMoneyValidator,
                             IMapper mapper
            ) : base(unitOfWork, user)
        {
            _vnPaySandboxService = vnPaySandboxService;
            _depoitMoneyValidator = depoitMoneyValidator;
            _mapper = mapper;
        }

        public async Task<ResultService> RechargeMoneyAsync(RechargeMoneyInputDto inputDto, HttpContext context)
        {
            var paymentModel = _mapper.Map<PaymentInformationModel>(inputDto);

            paymentModel.Name = user.FullName;

            var rechargeHistory = new RechargeHistory()
            {
                UserId = user.Id ?? Guid.Empty,
                BeforeBalance = user.Balance,
                AmountRecharge = (decimal)inputDto.Amount,
                RechargeStatus = RechargeStatus.WaitingPayment,
            };

            paymentModel.Name = user.Id.ToString();
            paymentModel.OrderDescription = rechargeHistory.Id.ToString();

            var url = _vnPaySandboxService.CreatePaymentUrl(paymentModel, context);

            await unitOfWork.RechargeHistoryRepository.AddAsync(rechargeHistory);

            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                Datas = url,
                StatusCode = (int)HttpStatusCode.OK,
            };
        }

        public async Task<ResultService> PaymentExecuteAsync(IQueryCollection query)
        {
            var status = _vnPaySandboxService.PaymentExecute(query);

            List<string> words = new List<string>();

            if (query.TryGetValue("vnp_OrderInfo", out var orderInfor))
            {
                words = orderInfor.ToString().Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).ToList();
            }

            var currentUser = await unitOfWork.UserRepository.FindByIdAsync(Guid.Parse(words[0]));

            if (currentUser == null)
                return new ResultService()
                {
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    Message = "User is not existed!"
                };

            if (query.TryGetValue("vnp_Amount", out var value) && status.Success)
            {
                currentUser.Balance += Decimal.Parse(value!);
            }

            var rechargeHistory = await unitOfWork.RechargeHistoryRepository.FindByIdAsync(Guid.Parse(words[1]));

            if (rechargeHistory == null)
                return new ResultService()
                {
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    Message = "Recharge is not existed!"
                };

            rechargeHistory.RechargeStatus = status.Success ? RechargeStatus.Success : RechargeStatus.Failed;

            await unitOfWork.UserRepository.UpdateAsync(currentUser);
            await unitOfWork.RechargeHistoryRepository.UpdateAsync(rechargeHistory);

            await unitOfWork.SaveChangesAsync();


            return new ResultService()
            {
                Datas = status,
                StatusCode = (int)HttpStatusCode.OK,
            };
        }

        public async Task<ResultService> DepoitMoneyAsync(DepoitMoneyInputDto inputDto)
        {
            await _depoitMoneyValidator.ValidateAndThrowAsync(inputDto);

            // Update Balance Renter
            var userDepoit = await unitOfWork.UserRepository.FindByIdAsync((Guid)user.Id!);
            if (userDepoit == null) return new ResultService()
            {
                StatusCode = (int)HttpStatusCode.Unauthorized,
            };
            userDepoit.Balance -= inputDto.DepoitAmount;
            await unitOfWork.UserRepository.UpdateAsync(userDepoit);

            // Update Balance Losser
            var ownerRentalShop = await unitOfWork.UserRepository.FindByRentalShopIdAsync(inputDto.RentalShopId);
            ownerRentalShop!.Balance += inputDto.DepoitAmount;
            await unitOfWork.UserRepository.UpdateAsync(ownerRentalShop!);

            // Update Status Order
            var orderStatus = new OrderStatus
            {
                OrderId = inputDto.OrderId,
                Status = RequestStatus.PAYMENTED,
            };

            // Update History
            //TODO:

            await unitOfWork.OrderStatusRepository.AddAsync(orderStatus);

            await unitOfWork.SaveChangesAsync();

            return new ResultService()
            {
                StatusCode = (int)HttpStatusCode.OK,
            };
        }

        public Task<ResultService> TransmitHistoryAsync(TransmitHistoryInputDto inputDto)
        {
            throw new NotImplementedException();
        }
    }
}
