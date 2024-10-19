using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Application.Services.RentalShops.RentalShopServiceOutputDto
{
    public class FindRentalShopOutputDto
    {
        public Guid Id { get; set; }
        public string ShopName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
