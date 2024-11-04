﻿using BE.Application.Common.Dtos;

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