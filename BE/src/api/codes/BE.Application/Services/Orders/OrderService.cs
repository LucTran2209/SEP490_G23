﻿using BE.Application.Services.Orders.OrderServiceInputDto;
using BE.Application.Services.Orders.OrderServiceOutputDto;
using Newtonsoft.Json;

namespace BE.Application.Services.Orders
{
    public class OrderService : BaseService, IOrderService
    {
        private readonly IValidator<CreateOrderInputDto> createOrderValidator;
        private readonly IValidator<GetOrderDetailInputDto> _getOrderDetailInputDto;
        private readonly IMapper _mapper;
        private readonly IAzureService _azureService;
        private readonly IWalletService _walletService;

        public OrderService(IUnitOfWork unitOfWork, IUser user,
            IMapper mapper,
            IValidator<CreateOrderInputDto> createOrderValidator,
            IValidator<GetOrderDetailInputDto> getOrderDetailInputDto,
            IWalletService walletService,
            IAzureService azureService) : base(unitOfWork, user)
        {
            this.createOrderValidator = createOrderValidator;
            _getOrderDetailInputDto = getOrderDetailInputDto;
            _mapper = mapper;
            _azureService = azureService;
            _walletService = walletService;
        }

        public async Task<ResultService> CreateAsync(CreateOrderInputDto inputDto)
        {
            await createOrderValidator.ValidateAndThrowAsync(inputDto);

            inputDto.StartDate = inputDto.StartDate.CurrentTimeZone();
            inputDto.EndDate = inputDto.EndDate.CurrentTimeZone();

            inputDto.OrderDetails = JsonConvert.DeserializeObject<List<ProductOrder>>(inputDto.OrderDetailsJson!);

            var order = _mapper.Map<Order>(inputDto);

            order.Code = DateTime.Now.Ticks.ToString() + "E";

            order.MortgagePaperImageFont = await _azureService.UpLoadFileAsync(inputDto.MortgagePaperImageFont);
            order.MortgagePaperImageBack = await _azureService.UpLoadFileAsync(inputDto.MortgagePaperImageBack);

            var orderStatus = new OrderStatus()
            {
                OrderId = order.Id,
                Message = string.Empty,
                Status = RequestStatus.PENDING_APPROVAL,
                FileAttach = null
            };

            order.OrderStatuses = new List<OrderStatus>();

            order.OrderStatuses.Add(orderStatus);

            await unitOfWork.OrderRepository.AddAsync(order);

            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.Created,
                Message = "created successfully."
            };
        }

        public async Task<ResultService> CreateOrderStatusAsync(CreateOrderStatusInputDto inputDto)
        {
            var file = string.Empty;

            if (inputDto.FileAttach != null)
            {
                file = await _azureService.UpLoadFileAsync(inputDto.FileAttach);
            }

            var order = await unitOfWork.OrderRepository.GetDetailOrderAsync(inputDto.OrderId);
            var currentOrderStatus = await unitOfWork.OrderStatusRepository.GetCurrentStatusAsync(order!.Id);
            var userDepoit = await unitOfWork.UserRepository.FindByIdAsync((Guid)user.Id!);
            Guid rentalShopId = order!.OrderDetails!.Select(o => o.Product.RentalShopId).FirstOrDefault();
            var ownerRentalShop = await unitOfWork.UserRepository.FindByRentalShopIdAsync(rentalShopId);

            // amount return
            var returnAmount = ApplyVoucher(order.Voucher, order.TotalRentPrice);
           
            if (inputDto.Status == RequestStatus.CANCEL && currentOrderStatus!.Status == RequestStatus.PAYMENTED)
            {
                returnAmount = returnAmount < order.TotalDepositPrice ? order.TotalDepositPrice : order.TotalDepositPrice + returnAmount;

                // Nếu Status đang là 0, 1, 2 -> Cancel bình thường
                await _walletService.ChangeBalance((Guid)user.Id, returnAmount, true);

                await _walletService.ChangeBalance(ownerRentalShop!.Id, returnAmount, false);
            }

            if (inputDto.Status == RequestStatus.REFUND)
            {
                // Return tiền cọc còn lại sau khi đã trừ tiền thu

                // Nếu Status đang là 3 -> Cancel = -10%
            }

            if (inputDto.Status == RequestStatus.COMPLETE)
            {
                returnAmount = returnAmount < order.TotalDepositPrice ? order.TotalDepositPrice - returnAmount : order.TotalDepositPrice;

                // Return tiền cọc còn lại sau khi đã trừ tiền thu
                await _walletService.ChangeBalance((Guid)user.Id, returnAmount, true);

                await _walletService.ChangeBalance(ownerRentalShop!.Id, returnAmount, false);
            }

            var orderStatus = OrderExtention.CreateOrderStatus(inputDto, file);

            await unitOfWork.OrderStatusRepository.AddAsync(orderStatus);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.Created,
                Message = "created successfully."
            };
        }

        private decimal ApplyVoucher(Voucher? voucher, decimal totalRentPrice)
        {
            if (voucher == null)
                return totalRentPrice;

            if (voucher.DiscountType == DiscountType.Percentage)
            {
                return totalRentPrice - totalRentPrice * voucher.DiscountValue;
            }
            else
            {
                return totalRentPrice - voucher.DiscountValue;
            }
        }

        public async Task<ResultService> ListOrderAsync(GetListOrderByUserInputDto inputDto)
        {
            var orders = unitOfWork.OrderRepository.GetAll();

            var query = orders
                .Filter(inputDto.Address, o => o.RecipientAddress!.Contains(inputDto.Address ?? string.Empty));
            if (inputDto.OrderId.ToString() != Guid.Empty.ToString())
            {
                query = query.Filter(inputDto.OrderId.ToString(), o => o.Id == inputDto.OrderId);
            }
            if (inputDto.StartDate != DateTime.MinValue)
            {
                query = query.Filter(inputDto.StartDate.ToString(), o => o.StartDate >= inputDto.StartDate);
            }
            if (inputDto.EndDate != DateTime.MinValue)
            {
                query = query.Filter(inputDto.EndDate.ToString(), o => o.EndDate <= inputDto.EndDate);
            }
            if (inputDto.UserId.ToString() != Guid.Empty.ToString())
            {
                query = query.Filter(inputDto.UserId.ToString(), o => o.UserId == inputDto.UserId);
            }
            if (inputDto.OrderId.ToString() != Guid.Empty.ToString())
            {
                query = query.Filter(inputDto.OrderId.ToString(), o => o.Id == inputDto.OrderId);
            }
            if (inputDto.RentalShopId.ToString() != Guid.Empty.ToString())
            {
                query = query.Filter(inputDto.RentalShopId.ToString(), o => o.OrderDetails
                .Any(od => od.Product.RentalShopId == inputDto.RentalShopId));
            }
            if (inputDto.ProductId.ToString() != Guid.Empty.ToString())
            {
                query = query.Filter(inputDto.ProductId.ToString(), o => o.OrderDetails
                .Any(od => od.ProductId == inputDto.ProductId));
            }
            if (inputDto.OrderStatuts.ToString() != Guid.Empty.ToString())
            {
                query = query.Filter(inputDto.OrderStatuts.ToString(), o => o.OrderStatuses
                .Any(os => os.Id == inputDto.OrderStatuts));
            }
            var res = await query.OrderBy(inputDto.OrderBy, inputDto.OrderByDesc)
                                 .ThenBy(inputDto.ThenBy, inputDto.ThenByDesc)
                                 .ToPageList(inputDto)
                                 .ToPageResult(await query.CountAsync(), inputDto,
                                 o => _mapper.Map<GetListOrderByUserOutputDto>(o));

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = res
            };
        }

        public async Task<ResultService> GetListMyOrderAsync(GetListMyOrderInputDto inputDto)
        {
            var myOrders = unitOfWork.OrderRepository.GetMyOrder(user.Id);

            myOrders = myOrders.Filter(inputDto.Search, o => o.Code!.Contains(inputDto.Search)
                                                            || o.OrderDetails!.Any(od => od.Product.ProductName!.Contains(inputDto.Search)));
            //.Filter(inputDto.NearDays.ToString(), o => o.)

            var result = await myOrders.ToPageList(inputDto)
                                       .ToPageResult(await myOrders.CountAsync(), inputDto,
                                                    o => _mapper.Map<GetListMyOrderOutputDto>(o));

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = result
            };
        }

        public async Task<ResultService> GetListRentalShopOrderAsync(GetListRentalShopOrderInputDto inputDto)
        {
            var myOrders = unitOfWork.OrderRepository.GetRentalShopOrder((Guid)user.RentalShopId!);

            myOrders = myOrders.Filter(inputDto.OrderCode, o => o.Code!.Contains(inputDto.OrderCode ?? string.Empty))
                               .Filter(inputDto.Status.ToString(), o => o.OrderStatuses!.Any(os => os.Status == inputDto.Status))
                               .Filter(inputDto.RenterName, o => o.User!.FullName!.Contains(inputDto.RenterName ?? string.Empty))
                               .Filter(inputDto.PhoneNumber, o => o.RecipientPhoneNumber!.Contains(inputDto.PhoneNumber ?? string.Empty))
                               .Filter(inputDto.StartDate.ToString(), o => o.StartDate >= inputDto.StartDate)
                               .Filter(inputDto.EndDate.ToString(), o => o.EndDate <= inputDto.EndDate);


            var result = await myOrders.ToPageList(inputDto)
                                       .ToPageResult(await myOrders.CountAsync(), inputDto,
                                                    o => _mapper.Map<GetListRentalShopOrderOutputDto>(o));

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = result
            };
        }

        public async Task<ResultService> GetDetailOrderAsync(GetOrderDetailInputDto inputDto)
        {
            await _getOrderDetailInputDto.ValidateAndThrowAsync(inputDto);

            var order = await unitOfWork.OrderRepository.GetDetailOrderAsync(inputDto.OrderId);

            var result = _mapper.Map<GetListRentalShopOrderOutputDto>(order);

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Datas = result
            };
        }
    }
}