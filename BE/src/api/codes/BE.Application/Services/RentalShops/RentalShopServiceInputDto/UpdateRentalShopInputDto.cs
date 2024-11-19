using Microsoft.AspNetCore.Http;

namespace BE.Application.Services.RentalShops.RentalShopServiceInputDto
{
    public class UpdateRentalShopInputDto
    {
        public string ShopName { get; set; } = string.Empty;
        public IFormFile? AvatarShop { get; set; }
    }
}