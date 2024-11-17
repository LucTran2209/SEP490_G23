using BE.Application.Services.Products.ProductServiceInputDto;

namespace BE.Application.Services.Products
{
    public static class ProductExtention
    {
        private static readonly IMapper? _mapper;

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
                Evaluate = inputDto.Evaluate
            };
        }

        public static Product UpdateEntity(this UpdateProductInputDto inputDto, Product product)
        {
            product.ProductName = inputDto.ProductName;
            product.Description = inputDto.Description;
            product.Quantity = inputDto.Quantity;
            product.RentalPrice = inputDto.RentalPrice;
            product.DepositPrice = inputDto.DepositPrice;
            product.RentalLimitDays = inputDto.RentalLimitDays;
            product.Evaluate = inputDto.Evaluate;
            //product.Images = inputDto.Images; => To do

            return product;
        }
    }
}