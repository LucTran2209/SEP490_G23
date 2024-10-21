using BE.Application.Common.Results;
using BE.Application.Services.Order.OrderServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IOrderService
    {
        Task<ResultService> CreateAsync(CreateOrderInputDto inputDto);
    }
}
