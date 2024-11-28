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
            context.RechargeHistories.Remove(entity);
            return Task.CompletedTask;
        }

        public async Task<RechargeHistory?> FindByIdAsync(Guid id)
        {
            return await context.RechargeHistories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<RechargeHistory>> GetListHistory(Guid? id, DateTime? from, DateTime? to)
        {
            var histories = context.RechargeHistories.Include(x => x.User)
                .Where(r => r.UserId == id).AsQueryable();

            if (from != null)
            {
                histories = histories.Where(r => r.CreatedDate.DateTime >= from);
            }

            if (to != null)
            {
                histories = histories.Where(r => r.CreatedDate.DateTime <= to);
            }

            return await histories.ToListAsync();
        }

        public Task UpdateAsync(RechargeHistory entity)
        {
            context.RechargeHistories.Update(entity);
            return Task.CompletedTask;
        }
    }
}
