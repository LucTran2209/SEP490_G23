
using BE.Application.Common.Dtos;
using BE.Application.Services.Wallets.WalletServiceInputDto;
using BE.Infrastructure.VnPaySandbox;
using BE.Infrastructure.VnPaySandbox.Models;
using Microsoft.AspNetCore.Http;

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
                RechargeType = RechargeType.Recharge,
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
                currentUser.Balance += Decimal.Parse(value!)/100    ;
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

            var order = await unitOfWork.OrderRepository.GetDetailOrderAsync(inputDto.OrderId);            

            // Update Balance Renter
            var userDepoit = await unitOfWork.UserRepository.FindByIdAsync((Guid)user.Id!);
            if (userDepoit == null) return new ResultService()
            {
                StatusCode = (int)HttpStatusCode.Unauthorized,
            };

            if (userDepoit.Balance < inputDto.DepoitAmount) return new ResultService()
            {
                StatusCode = (int)HttpStatusCode.BadRequest,
                Message = "Số dư không đủ"
            };

            await ChangeBalance(userDepoit.Id, inputDto.DepoitAmount, false);

            // Update Balance Losser
            var ownerRentalShop = await unitOfWork.UserRepository.FindByRentalShopIdAsync(inputDto.RentalShopId);
            await ChangeBalance(ownerRentalShop!.Id, inputDto.DepoitAmount, true);

            // Update Status Order
            var orderStatus = new OrderStatus
            {
                OrderId = inputDto.OrderId,
                Status = RequestStatus.PAYMENTED,
            };

            await unitOfWork.OrderStatusRepository.AddAsync(orderStatus);

            await unitOfWork.SaveChangesAsync();

            return new ResultService()
            {
                StatusCode = (int)HttpStatusCode.OK,
            };
        }

        public async Task ChangeBalance(Guid userId, decimal amount, bool isAdding)
        {
            var user = await unitOfWork.UserRepository.FindByIdAsync(userId);

            if (user == null) return;

            if (isAdding)
            {
                user.Balance += amount;
            }
            else
            {
                user.Balance -= amount;
            }

            await AddHistory(userId, user.Balance, amount, RechargeStatus.Success, isAdding ? RechargeType.Recieve : RechargeType.Depoited);

            await unitOfWork.UserRepository.UpdateAsync(user);
        }

        public async Task<ResultService> GetListHistoryAsync(TransmitHistoryInputDto inputDto)
        {
            var histories = await unitOfWork.RechargeHistoryRepository.GetListHistory(user.Id)
                .Filter(inputDto.From.ToString(), x => x.CreatedDate >= inputDto.From.Value.AddHours(-12))
                .Filter(inputDto.To.ToString(), x => x.CreatedDate <= inputDto.To.Value.AddHours(12))
                .ToListAsync();

            return new ResultService()
            { 
                StatusCode = (int)HttpStatusCode.OK,
                Datas = _mapper.Map<List<RechargeHistoryDto>>(histories)
            };
        }

        public async Task AddHistory(Guid userId, decimal? beforeBalance, decimal? amountRecharge, RechargeStatus rechargeStatus, RechargeType rechargeType)
        {
            var history = new RechargeHistory()
            {
                UserId = userId,
                BeforeBalance = beforeBalance,
                AmountRecharge = amountRecharge,
                RechargeStatus = rechargeStatus,
                RechargeType = rechargeType
            };

            await unitOfWork.RechargeHistoryRepository.AddAsync(history);
        }
    }
}
