using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;

namespace BE.Infrastructure.Repositories
{
    internal class RechargeHistoryRepository : BaseRepository, IRechargeHistoryRepository
    {
        public RechargeHistoryRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddAsync(RechargeHistory entity)
        {
            await context.RechargeHistories.AddAsync(entity);
        }

        public Task DeleteAsync(RechargeHistory entity)
        {
            throw new NotImplementedException();
        }

        public Task<RechargeHistory?> FindByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(RechargeHistory entity)
        {
            throw new NotImplementedException();
        }
    }
}
