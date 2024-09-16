using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Entities.Users
{
    public interface IUserRepository : IBaseRepository<User, Guid>
    {
    }
}
