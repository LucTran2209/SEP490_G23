using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IOrderRepository : IBaseRepository<Order>
    {
        IQueryable<Order> GetAll();
        IQueryable<Order> GetMyOrder(Guid? id);
    }
}
