using BE.Domain.Entities.Roles;
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

        public async Task<User> FirstOrDefaultAsync(string userName)
        {
            var user = await context.Users.Include(u => u.UserRoles)
                                            .ThenInclude(ur => ur.Role)
                                            .FirstOrDefaultAsync(x => x.UserName == userName);
            
            return user;
        }

        public IQueryable<User> GetAll()
        {
            var query = context.Users.AsQueryable();
            return query;
        }

        public async void Insert(User entity)
        {
            await context.Users.AddAsync(entity);
        }

        public void Update(User entity)
        {
            context.Users.Update(entity);
        }
    }
}
