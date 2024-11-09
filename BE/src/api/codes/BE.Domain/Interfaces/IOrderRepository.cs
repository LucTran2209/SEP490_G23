using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IOrderRepository : IBaseRepository<Order>
    {
        IQueryable<Order> GetAll();
        Task<Order?> GetDetailOrderAsync(Guid orderId);
        IQueryable<Order> GetMyOrder(Guid? id);
        IQueryable<Order> GetRentalShopOrder(Guid rentalShopId);
    }
}
