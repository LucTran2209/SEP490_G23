using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;


namespace BE.Domain.Interfaces
{
    public interface IRentalShopRepository : IBaseRepository<RentalShop>
    {
        Task<RentalShop?> FindByIdAsync(Guid id);
        IQueryable<RentalShop> GetAll();
        Task AddAsync(RentalShop entity);
        Task UpdateAsync(RentalShop entity);
        Task DeleteAsync(RentalShop entity);
    }
}
