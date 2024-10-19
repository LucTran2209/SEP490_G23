using BE.Application.Common.Results;
using BE.Application.Services.RentalShops.RentalShopServiceInputDto;
using System.Threading.Tasks;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IRentalShopService
    {
        Task<ResultService> CreateAsync(CreateRentalShopInputDto inputDto);
        Task<ResultService> GetListRentalShopAsync(GetListRentalShopInputDto inputDto);
        Task<ResultService> UpdateAsync(UpdateRentalShopInputDto inputDto, Guid id);
        Task<ResultService> DeleteAsync(Guid id);
    }
}
