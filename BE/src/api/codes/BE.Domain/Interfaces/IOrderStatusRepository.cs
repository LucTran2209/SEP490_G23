using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IOrderStatusRepository : IBaseRepository<OrderStatus>
    {
        Task<OrderStatus?> GetCurrentStatusAsync(Guid orderId);
    }
}
