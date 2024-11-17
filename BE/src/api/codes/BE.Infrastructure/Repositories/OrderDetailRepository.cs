using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;

namespace BE.Infrastructure.Repositories
{
    public class OrderDetailRepository : BaseRepository, IOrderDeatilRepository
    {
        public OrderDetailRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddAsync(OrderDetail entity)
        {
            await context.OrderDetails.AddAsync(entity);
        }

        public Task DeleteAsync(OrderDetail entity)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDetail?> FindByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(OrderDetail entity)
        {
            throw new NotImplementedException();
        }
    }
}
