using BE.Application.Services.Products.ProductServiceInputDto;
using BE.Application.Services.Products.ProductServiceOutputDto;
using BE.Domain.Entities;

namespace BE.Application.Services.Products
{
    public static class ProductExtention
    {
        public static Product ToEntity(this CreateProductInputDto inputDto)
        {
            return new Product
            {
                ProductName = inputDto.ProductName,
                Description = inputDto.Description,
                Quantity = inputDto.Quantity,
                SubCategoryId = inputDto.SubCategoryId, 
                RentalShopId = inputDto.RentalShopId,
                RentalPrice = inputDto.RentalPrice,     
                DepositPrice = inputDto.DepositPrice,   
                RentalLimitDays = inputDto.RentalLimitDays,
                Evaluate = inputDto.Evaluate,
                Images = inputDto.Images
            };
        }

        public static Product UpdateEntity(this UpdateProductInputDto inputDto, Product product)
        {
            product.ProductName = inputDto.ProductName;
            product.Description = inputDto.Description;
            product.Quantity = inputDto.Quantity;
            //product.SubCategoryId = inputDto.SubCategoryId;  
            product.RentalPrice = inputDto.RentalPrice;    
            product.DepositPrice = inputDto.DepositPrice;   
            product.RentalLimitDays = inputDto.RentalLimitDays; 
            product.Evaluate = inputDto.Evaluate;
            product.Images = inputDto.Images;

            return product;
        }

        public static ListProductOutputDto ToListProductOutput(this Product product)
        {
            return new ListProductOutputDto
            {
                Id = product.Id,
                ProductName = product.ProductName,
                Description = product.Description,
                Quantity = product.Quantity,
                SubCategoryId = product.SubCategoryId,  
                RentalShopName = product.RentalShop?.ShopName ?? "N/A",
                RentalPrice = product.RentalPrice,     
                DepositPrice = product.DepositPrice,   
                RentalLimitDays = product.RentalLimitDays, 
                Evaluate = product.Evaluate,
                Images = product.Images
            };
        }
    }
}
