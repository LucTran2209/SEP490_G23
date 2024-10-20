using BE.Application.Services.Products.ProductServiceInputDto;
using BE.Application.Services.Products.ProductServiceOutputDto;
using BE.Domain.Entities;

namespace BE.Application.Services.Products
{
    public static class ProductExtention
    {
        public static Product ToEntity(this CreateProductInputDto command)
        {
            var product = new Product
            {
                ProductName = command.ProductName,
                Description = command.Description,
                Quantity = command.Quantity,
                RentalShopId = command.RentalShopId,
                Price = command.Price,
                Evaluate = command.Evaluate,
                //Images = command.Images
            };
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
                Price = product.Price,
                Evaluate = product.Evaluate,
               // Images = product.Images,
                RentalShopName = product.RentalShop?.ShopName ?? "N/A"
            };
        }
    }
}
