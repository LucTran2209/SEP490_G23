using BE.Domain.Abstractions.Enums;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
    public class StatisticalRepository : BaseRepository, IStatisticalRepository
    {
        public StatisticalRepository(ApplicationDbContext context) : base(context)
        {
        }
        public IQueryable<OrderDetail> GetByRentalIdAsync()
        {
            return context.OrderDetails
                        .Include(od => od.Order)
                        .ThenInclude(o => o.OrderStatuses)
                        .Include(od => od.Product)
                        .Where(od => od.Order.OrderStatuses.Any(os => os.Status == RequestStatus.ReturnComplete)).AsQueryable();
        }
    }
}
