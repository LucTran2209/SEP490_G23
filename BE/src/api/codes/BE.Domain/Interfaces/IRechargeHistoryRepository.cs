using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IRechargeHistoryRepository : IBaseRepository<RechargeHistory>
    {
        IQueryable<RechargeHistory> GetListHistory(Guid? id);
    }
}
