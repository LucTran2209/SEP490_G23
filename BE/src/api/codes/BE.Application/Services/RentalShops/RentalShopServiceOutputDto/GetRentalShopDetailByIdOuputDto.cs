using BE.Application.Common.Dtos;

namespace BE.Application.Services.RentalShops.RentalShopServiceOutputDto
{
    public class GetRentalShopDetailByIdOuputDto : RentalShopDto
    {
        public DateTime CreateDate { get; set; }
        public int NumberOfProduct {  get; set; }
        public int NumberOfRenter {  get; set; }
        public int NumberOfVote { get; set; }
        public decimal AvegateVote {  get; set; }

        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<RentalShop, GetRentalShopDetailByIdOuputDto>();
            }
        }
    }
}