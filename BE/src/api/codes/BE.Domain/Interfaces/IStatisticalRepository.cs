using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IStatisticalRepository
    {
        IQueryable<OrderDetail?> GetByRentalIdAsync();
    }
}
