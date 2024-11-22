using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> GetsUserByUserNameAsync(string userName);
        Task<User?> GetsUserByUserIdAsync(Guid Id);
        IQueryable<User> GetAll();
        Task<User?> GetsUserByUserIDAsync(Guid ID);
        Task<User?> GetsUserByUserEmailAsync(string email);
        Task AddRole(UserRole userRole);
        Task<User?> FindByRentalShopIdAsync(Guid rentalShopId);
    }
}
