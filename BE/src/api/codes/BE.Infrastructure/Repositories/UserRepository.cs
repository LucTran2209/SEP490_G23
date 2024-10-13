using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<User?> FindByIdAsync(Guid id)
        {
            var user = await context.Users.SingleOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<User?> GetsUserByUserNameAsync(string userName)
        {
            var user = await context.Users.Include(u => u.UserRoles!)
                                            .ThenInclude(ur => ur.Role)
                                            .FirstOrDefaultAsync(x => x.UserName == userName);

            return user;
        }

        public IQueryable<User> GetAll()
        {
            var query = context.Users.AsQueryable();

            return query;
        }

        public async Task AddAsync(User entity)
        {
            await context.Users.AddAsync(entity);
        }

        public Task UpdateAsync(User entity)
        {
            context.Users.Update(entity);

            return Task.CompletedTask;
        }

        public Task DeleteAsync(User entity)
        {
            context.Users.Remove(entity);

            return Task.CompletedTask;
        }
    }
}