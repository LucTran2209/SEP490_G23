using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Services.Order.OrderServiceInputDto;
using BE.Application.Services.Orders.OrderServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Interfaces;
using FluentValidation;
using System.Net;

namespace BE.Application.Services.Order
{
    public class OrderService : BaseService, IOrderService
    {
        private readonly IValidator<CreateOrderInputDto> createOrderValidator;
        //private readonly IValidator<CreateOrderStatusValidattor> createOrderStatusValidattor;
        private readonly IAzureService _azureService;

        public OrderService(IUnitOfWork unitOfWork, IUser user,
            IValidator<CreateOrderInputDto> createOrderValidator,
            //IValidator<CreateOrderStatusValidattor> createOrderStatusValidattor,
            IAzureService azureService) : base(unitOfWork, user)
        {
            this.createOrderValidator = createOrderValidator;
            //this.createOrderStatusValidattor = createOrderStatusValidattor;
            _azureService = azureService;
        }

        public async Task<ResultService> CreateAsync(CreateOrderInputDto inputDto)
        {
            await createOrderValidator.ValidateAndThrowAsync(inputDto);
            var order = inputDto.ToEntity();
            order.Id = Guid.NewGuid();
            await unitOfWork.OrderRepository.AddAsync(order);
            Guid RentailShopIdCheck = Guid.Empty;

            foreach (var item in inputDto.DetailProducts)
            {
                var product = await unitOfWork.ProductRepository.FindByIdAsync(item.ProductId);
                // check product on 1 shop
                if (RentailShopIdCheck != product.RentalShopId)
                {
                    var ord = OrderExtention.CreateOrderDetail(order.Id, item);
                    await unitOfWork.OrderDeatilRepository.AddAsync(ord);

                    RentailShopIdCheck = product.RentalShopId;
                }
                else
                {
                    return new ResultService
                    {
                        StatusCode = HttpStatusCode.BadRequest.ToString(),
                        Message = "created fails. Products are not from the same store."
                    };
                }
            }
            await unitOfWork.SaveChangesAsync();
            return new ResultService
            {
                StatusCode = HttpStatusCode.Created.ToString(),
                Message = "created successfully."
            };
        }

        public async Task<ResultService> CreateOrderStatusAsync(CreateOrderStatusInputDto inputDto)
        {
            var file = await _azureService.UpLoadFileAsync(inputDto.FileAttach);
            var ords = OrderExtention.CreateOrderStatus(inputDto, file);
            await unitOfWork.OrderStatusRepository.AddAsync(ords);
            await unitOfWork.SaveChangesAsync();
            return new ResultService
            {
                StatusCode = HttpStatusCode.Created.ToString(),
                Message = "created successfully."
            };
        }
    }

}
