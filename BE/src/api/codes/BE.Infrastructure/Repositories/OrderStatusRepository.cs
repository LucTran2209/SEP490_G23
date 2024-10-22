using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;

namespace BE.Infrastructure.Repositories
{
    public class OrderStatusRepository : BaseRepository, IOrderStatusRepository
    {
        public OrderStatusRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddAsync(OrderStatus entity)
        {
            await context.OrderStatuses.AddAsync(entity);
        }

        public Task DeleteAsync(OrderStatus entity)
        {
            throw new NotImplementedException();
        }

        public Task<OrderStatus?> FindByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(OrderStatus entity)
        {
            throw new NotImplementedException();
        }
    }
}
