using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Services.Order.OrderServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Interfaces;
using FluentValidation;
using System.Net;

namespace BE.Application.Services.Order
{
    public class OrderService : BaseService, IOrderService
    {
        private readonly IValidator<CreateOrderInputDto> createOrderValidator;

        public OrderService(IUnitOfWork unitOfWork, IUser user, IValidator<CreateOrderInputDto> createOrderValidator) : base(unitOfWork, user)
        {
            this.createOrderValidator = createOrderValidator;
        }

        public async Task<ResultService> CreateAsync(CreateOrderInputDto inputDto)
        {
            await createOrderValidator.ValidateAndThrowAsync(inputDto);
            var o = await unitOfWork.UserRepository.GetsUserByUserIDAsync(inputDto.UserId);

            if (o != null)
            {
                var order = inputDto.ToEntity();
                order.Id = Guid.NewGuid();
                await unitOfWork.OrderRepository.AddAsync(order);
                await unitOfWork.SaveChangesAsync();
                return new ResultService
                {
                    StatusCode = HttpStatusCode.Created.ToString(),
                    Message = "created successfully."
                };
            }
            else
            {
                return new ResultService
                {
                    StatusCode = HttpStatusCode.BadRequest.ToString(),
                    Message = "created fail. not found to user"
                };
            }

        }
    }
}
