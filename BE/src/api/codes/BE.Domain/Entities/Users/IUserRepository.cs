using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities.Roles;

namespace BE.Domain.Entities.Users
{
    public interface IUserRepository : IBaseRepository<User, Guid>
    {
        IQueryable<User> GetAll();
        Task<List<User>> GetAllUser();
        User GetByName(string username);
        Task<User> FirstOrDefaultAsync(string userName);
    }
}
