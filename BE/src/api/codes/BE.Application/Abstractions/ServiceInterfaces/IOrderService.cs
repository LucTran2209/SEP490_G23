using BE.Application.Common.Results;
using BE.Application.Services.Orders.OrderServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IOrderService
    {
        Task<ResultService> CreateAsync(CreateOrderInputDto inputDto);
        Task<ResultService> CreateOrderStatusAsync(CreateOrderStatusInputDto inputDto);
        Task<ResultService> ListOrderAsync(GetListOrderByUserInputDto inputDto);
        Task<ResultService> GetListMyOrderAsync(GetListMyOrderInputDto inputDto);
        // Task<ResultService> GetListRentalShopOrderAsync(GetListRentalShopOrderInputDto inputDto);
    }
}
