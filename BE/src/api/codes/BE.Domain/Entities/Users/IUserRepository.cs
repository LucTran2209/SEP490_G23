using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Entities.Users
{
    public interface IUserRepository : IBaseRepository<User, Guid>
    {
        IQueryable<User> GetAll();
        Task<List<User>> GetAllUser();
        User GetByName(string username);

    }
}
