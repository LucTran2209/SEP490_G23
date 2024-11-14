using BE.Application.Services.Vouchers.VoucherServiceInputDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IVoucherService
    {
        Task<ResultService> GetVoucherByIdAsync(Guid voucherId);
        Task<ResultService> GetAllVouchersAsync();
        Task<ResultService> CreateVoucherAsync(CreateVoucherInputDto inputDto);
        Task<ResultService> UpdateVoucherAsync(UpdateVoucherInputDto inputDto, Guid voucherId);
        Task<ResultService> DeleteVoucherAsync(Guid voucherId);
    }
}
