using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

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

        public async Task<RechargeHistory?> FindByIdAsync(Guid id)
        {
            return await context.RechargeHistories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public Task UpdateAsync(RechargeHistory entity)
        {
            context.RechargeHistories.Update(entity);

            return Task.CompletedTask;
        }
    }
}
