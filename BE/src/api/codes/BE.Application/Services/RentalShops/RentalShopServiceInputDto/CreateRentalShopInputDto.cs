using System;

namespace BE.Application.Services.RentalShops.RentalShopServiceInputDto
{
    public class CreateRentalShopInputDto
    {
        public string ShopName { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
