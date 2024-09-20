using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Entities.Users
{
    public interface IUserRepository : IBaseRepository<User, Guid>
    {
        Task<User> FirstOrDefaultAsync(string userName, string password);
    }
}
