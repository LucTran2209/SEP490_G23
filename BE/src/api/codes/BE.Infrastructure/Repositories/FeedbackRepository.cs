using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
    public class FeedbackRepository : BaseRepository, IFeedbackRepository
    {
        public FeedbackRepository(ApplicationDbContext context) : base(context) { }

        public async Task<Feedback?> FindByIdAsync(Guid id)
        {
            return await context.Feedbacks
                                .Include(f => f.Product)
                                .FirstOrDefaultAsync(f => f.Id == id);
        }

        public IQueryable<Feedback> GetAll()
        {
            return context.Feedbacks
                          .Include(f => f.Product)
                          .AsQueryable();
        }

        public async Task AddAsync(Feedback entity)
        {
            await context.Feedbacks.AddAsync(entity);
        }

        public Task UpdateAsync(Feedback entity)
        {
            context.Feedbacks.Update(entity);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Feedback entity)
        {
            context.Feedbacks.Remove(entity);
            return Task.CompletedTask;
        }
    }
}
