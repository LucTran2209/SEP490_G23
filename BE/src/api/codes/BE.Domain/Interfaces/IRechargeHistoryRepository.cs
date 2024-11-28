using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IRechargeHistoryRepository : IBaseRepository<RechargeHistory>
    {
        Task<List<RechargeHistory>> GetListHistory(Guid? id, DateTime? from, DateTime? to);
    }
}
