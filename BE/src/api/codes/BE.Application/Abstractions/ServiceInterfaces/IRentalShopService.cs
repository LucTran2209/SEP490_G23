﻿using BE.Application.Services.RentalShops.RentalShopServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IRentalShopService
    {
        Task<ResultService> GetListRentalShopAsync(GetListRentalShopInputDto inputDto);
        Task<ResultService> GetRentalShopByNotActiveAsync(Guid id);
        Task<ResultService> GetRentalShopDetailByIdAsync(Guid id);
        Task<ResultService> GetAllRentalShopByNotActiveAsync(GetAllRentalShopByNotActiveInputDto inputDto);
        Task<ResultService> CreateAsync(CreateRentalShopInputDto inputDto);
        Task<ResultService> UpdateAsync(UpdateRentalShopInputDto inputDto, Guid id);
        Task<ResultService> ActiveRentalShopAsync(ActiveRentalShopInputDto input);
        Task<ResultService> ActivityRentalShopAsync(ActivityRentalShopInputDto input);
        Task<ResultService> DeleteAsync(Guid id);
    }
}
