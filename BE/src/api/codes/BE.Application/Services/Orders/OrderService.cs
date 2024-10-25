using AutoMapper;
using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Services.Orders.OrderServiceInputDto;
using BE.Domain.Abstractions.Enums;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
using FluentValidation;
using MailKit.Search;
using System.Net;

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

            order.OrderStatuses = new List<OrderStatus>();

            order.OrderStatuses.Add(orderStatus);

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
    }

}
