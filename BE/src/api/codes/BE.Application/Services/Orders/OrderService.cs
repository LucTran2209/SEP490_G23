using BE.Application.Services.Orders.OrderServiceInputDto;
using BE.Application.Services.Orders.OrderServiceOutputDto;

namespace BE.Application.Services.Orders
{
    public class OrderService : BaseService, IOrderService
    {
        private readonly IValidator<CreateOrderInputDto> createOrderValidator;
        private readonly IMapper _mapper;
        private readonly IAzureService _azureService;

        public OrderService(IUnitOfWork unitOfWork, IUser user,
            IMapper mapper,
            IValidator<CreateOrderInputDto> createOrderValidator,
            IAzureService azureService) : base(unitOfWork, user)
        {
            this.createOrderValidator = createOrderValidator;
            _mapper = mapper;
            _azureService = azureService;
        }

        public async Task<ResultService> CreateAsync(CreateOrderInputDto inputDto)
        {
            await createOrderValidator.ValidateAndThrowAsync(inputDto);

            var order = _mapper.Map<Order>(inputDto);

            var orderStatus = new OrderStatus()
            {
                OrderId = order.Id,
                Message = string.Empty,
                Status = RequestStatus.Order,
                FileAttach = null
            };

            await unitOfWork.OrderRepository.AddAsync(order);

            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.Created.ToString(),
                Message = "created successfully."
            };
        }

        public async Task<ResultService> CreateOrderStatusAsync(CreateOrderStatusInputDto inputDto)
        {
            var file = await _azureService.UpLoadFileAsync(inputDto.FileAttach!);

            var orderStatus = OrderExtention.CreateOrderStatus(inputDto, file);

            await unitOfWork.OrderStatusRepository.AddAsync(orderStatus);

            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.Created.ToString(),
                Message = "created successfully."
            };
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
                                 .ToPageResult(await query.CountAsync(), inputDto, o => _mapper.Map<ListOrderByUserOutputDto>(o));

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Success",
                Datas = res
            };
        }
    }
}