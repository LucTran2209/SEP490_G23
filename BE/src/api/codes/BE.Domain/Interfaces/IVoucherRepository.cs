using BE.Domain.Abstractions.IRepositories;
using BE.Domain.Entities;

namespace BE.Domain.Interfaces
{
    public interface IVoucherRepository : IBaseRepository<Voucher>
    {
        IQueryable<Voucher> GetAll();
        IQueryable<Voucher>? GetListVoucherByRentalShopId(Guid rentalShopId);
        Task AddUserVoucherAsync(UserVoucher userVoucher);
        Task<List<UserVoucher>> GetUserVoucherAsync(Guid guid);
    }
}
