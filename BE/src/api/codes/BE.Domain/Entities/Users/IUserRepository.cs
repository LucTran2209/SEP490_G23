using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities.Roles;

namespace BE.Domain.Entities.Users
{
    public interface IUserRepository : IBaseRepository<User, Guid>
    {
        Task<User> FirstOrDefaultAsync(string userName);
    }
}
