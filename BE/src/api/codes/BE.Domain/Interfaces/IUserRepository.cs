using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> GetsUserByUserNameAsync(string userName);
        IQueryable<User> GetAll();
        Task<User?> GetsUserByUserIDAsync(Guid ID);
    }
}
