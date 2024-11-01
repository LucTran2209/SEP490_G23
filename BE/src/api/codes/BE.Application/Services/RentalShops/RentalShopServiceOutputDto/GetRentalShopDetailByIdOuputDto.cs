using AutoMapper;
using BE.Application.Common.Dtos;
using BE.Domain.Entities;

namespace BE.Application.Services.RentalShops.RentalShopServiceOutputDto
{
    public class GetRentalShopDetailByIdOuputDto : RentalShopDto
    {
        public DateTime? CreateDate { get; set; }
        public class Mapping : Profile
        {
            public Mapping()
            {
                CreateMap<RentalShop, GetRentalShopDetailByIdOuputDto>();
            }
        }
    }
}
