using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IVoucherRepository : IBaseRepository<Voucher>
    {
        IQueryable<Voucher> GetAll();
    }
}
