using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

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

        public async Task<OrderStatus?> GetCurrentStatusAsync(Guid orderId)
        {
            var status = await context.OrderStatuses.Where(o => o.OrderId == orderId)
                                                    .OrderByDescending(o => o.Status)
                                                    .FirstOrDefaultAsync();

            return status;
        }

        public Task UpdateAsync(OrderStatus entity)
        {
            throw new NotImplementedException();
        }
    }
}
