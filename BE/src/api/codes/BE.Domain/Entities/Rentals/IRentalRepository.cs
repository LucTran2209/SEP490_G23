using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Entities.Rentals
{
    public interface IRentalRepository : IBaseRepository<Rental,Guid>
    {
    }
}
