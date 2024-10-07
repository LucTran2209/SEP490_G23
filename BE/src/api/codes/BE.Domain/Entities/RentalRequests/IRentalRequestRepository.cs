using BE.Domain.Abstractions.IRepositories;

namespace BE.Domain.Entities.RentalRequests
{
    public interface IRentalRequestRepository : IBaseRepository<RentalRequest,Guid>
    {
    }
}
