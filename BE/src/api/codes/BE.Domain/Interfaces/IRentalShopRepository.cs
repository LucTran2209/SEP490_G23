using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IRentalShopRepository : IBaseRepository<RentalShop>
    {
        IQueryable<RentalShop> GetAll();
        Task<RentalShop?> GetRentalShopByIdAsync(Guid userId);
        IQueryable<RentalShop?> GetAllRentalShopByNotActiveAsync();
        Task<RentalShop?> GetRentalShopByNotActiveAsync(Guid Id);
    }
}
