using BE.Domain.Entities.Users;
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

        public void Delete(User entity)
        {
            context.Users.Remove(entity);
        }

        public async Task<User> FindByIdAsync(Guid id)
        {
            var user = await context.Users.SingleOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public IQueryable<User> GetAll()
        {
            var query = context.Users.AsQueryable();
            return query;
        }

        public async Task<List<User>> GetAllUser()
        {
            var query = await context.Users.ToListAsync();
            return query;
        }

        public User GetByName(string username)
        {
            var n = context.Users.SingleOrDefault(u => u.UserName == username);
            return n;
        }

        public async void Insert(User entity)
        {
            await context.Users.AddAsync(entity);
        }

        public async void Update(User entity)
        {
            context.Users.Update(entity);
        }

    }
}
