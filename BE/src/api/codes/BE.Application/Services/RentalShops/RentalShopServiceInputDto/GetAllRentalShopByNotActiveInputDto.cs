using BE.Application.Models;

namespace BE.Application.Services.RentalShops.RentalShopServiceInputDto
{
    public class GetAllRentalShopByNotActiveInputDto : PagedResultRequestModel
    {
        public string? ShopName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
    }
}
