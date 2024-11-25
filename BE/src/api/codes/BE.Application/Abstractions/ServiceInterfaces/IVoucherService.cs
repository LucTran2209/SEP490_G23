using BE.Application.Common.Results;
using BE.Application.Services.Vouchers.VoucherServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IVoucherService
    {
        Task<ResultService> GetListVoucherAsync(Guid rentalShopId);
        Task<ResultService> CreateVoucherAsync(CreateVoucherInputDto inputDto);
        Task<ResultService> SaveVoucherAsync(Guid voucherId);
        Task<ResultService> UpdateVoucherAsync(Guid voucherId, UpdateVoucherInputDto inputDto); 
        Task<ResultService> DeactivateVoucherAsync(Guid voucherId);
        Task<ResultService> DeleteVoucherAsync(Guid voucherId);
        Task<ResultService> GetVoucherByIdAsync(Guid voucherId);
        Task<ResultService> GetUserVoucherAsync();
    }
}
