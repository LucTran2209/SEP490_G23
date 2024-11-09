using BE.Application.Services.RentalShops.RentalShopServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IRentalShopService
    {
        Task<ResultService> CreateAsync(CreateRentalShopInputDto inputDto);
        Task<ResultService> GetListRentalShopAsync(GetListRentalShopInputDto inputDto);
        Task<ResultService> UpdateAsync(UpdateRentalShopInputDto inputDto, Guid id);
        Task<ResultService> GetRentalShopDetailByIdAsync(Guid id);
        Task<ResultService> DeleteAsync(Guid id);
        Task<ResultService> GetRentalShopByNotActiveAsync(Guid id);
        Task<ResultService> GetAllRentalShopByNotActiveAsync();
        Task<ResultService> ActiveRentalShopAsync(ActiveRentalShopInputDto input);
    }
}
