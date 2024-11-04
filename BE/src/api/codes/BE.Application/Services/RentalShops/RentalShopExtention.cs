using BE.Application.Services.RentalShops.RentalShopServiceInputDto;
using BE.Application.Services.RentalShops.RentalShopServiceOutputDto;

namespace BE.Application.Services.RentalShops
{
    public static class RentalShopExtention
    {
        public static RentalShop ToEntity(this CreateRentalShopInputDto inputDto)
        {
            return new RentalShop
            {
                ShopName = inputDto.ShopName,
                UserId = inputDto.UserId,
                Address = inputDto.Address,
                PhoneNumber = inputDto.PhoneNumber,
                Email = inputDto.Email,
                IsActive = inputDto.IsActive,
                Description = inputDto.Description
            };
        }

        public static RentalShop UpdateEntity(this CreateRentalShopInputDto inputDto, RentalShop rentalShop)
        {
            rentalShop.ShopName = inputDto.ShopName;
            rentalShop.UserId = inputDto.UserId;
            rentalShop.Address = inputDto.Address;
            rentalShop.PhoneNumber = inputDto.PhoneNumber;
            rentalShop.Email = inputDto.Email;
            rentalShop.IsActive = inputDto.IsActive;
            rentalShop.Description = inputDto.Description;

            return rentalShop;
        }

        public static ListRentalShopOutputDto ToListRentalShopOutput(this RentalShop rentalShop)
        {
            return new ListRentalShopOutputDto
            {
                Id = rentalShop.Id,
                ShopName = rentalShop.ShopName,
                Address = rentalShop.Address,
                PhoneNumber = rentalShop.PhoneNumber,
                Email = rentalShop.Email,
                IsActive = rentalShop.IsActive,
                Description = rentalShop.Description
            };
        }
    }
}