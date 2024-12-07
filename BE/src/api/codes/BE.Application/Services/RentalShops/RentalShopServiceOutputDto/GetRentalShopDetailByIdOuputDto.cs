using BE.Application.Common.Dtos;

namespace BE.Application.Services.RentalShops.RentalShopServiceOutputDto
{
    public class GetRentalShopDetailByIdOuputDto : RentalShopDto
    {
        public DateTime CreateDate { get; set; }
        public int NumberOfProduct { get; set; } = 0;
        public int NumberOfRenter {  get; set; } = 0;
        public int NumberOfVote { get; set; } = 0;
        public decimal AvegateVote { get; set; } = 0;

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<RentalShop, GetRentalShopDetailByIdOuputDto>();
            }
        }
    }
}