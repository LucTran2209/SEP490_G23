using Microsoft.AspNetCore.Http;

namespace BE.Application.Services.RentalShops.RentalShopServiceInputDto
{
    public class CreateRentalShopInputDto
    {
        public Guid UserId { get; set; }
        public string? ShopName { get; set; }
        public IFormFile? ImageFont { get; set; }
        public IFormFile? ImageBack { get; set; }
        public string? TaxNumber { get; set; }
        public IFormFile? BusinessLicenseFile { get; set; }
        public int RentalScale { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public RequestShop Status { get; set; }
        public string? Description { get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<CreateRentalShopInputDto, RentalShop>()
                    .ForMember(dest => dest.ImageFont, opt => opt.Ignore())
                    .ForMember(dest => dest.ImageBack, opt => opt.Ignore())
                    .ForMember(dest => dest.BusinessLicenseFile, opt => opt.Ignore());
            }
        }
    }
}