using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Services.Products.ProductServiceInputDto;
using BE.Application.Services.Products.ProductServiceOutputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace BE.Application.Services.Products
{
    public class ProductService : BaseService, IProductService
    {
        private readonly IValidator<CreateProductInputDto> createProductValidator;

        public ProductService(IUnitOfWork unitOfWork, IUser user, IValidator<CreateProductInputDto> createProductValidator) 
            : base(unitOfWork, user)
        {
            this.createProductValidator = createProductValidator;

        }

        public async Task<ResultService> CreateAsync(CreateProductInputDto inputDto)
        {
            await createProductValidator.ValidateAndThrowAsync(inputDto);

            var product = inputDto.ToEntity();
            await unitOfWork.ProductRepository.AddAsync(product);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.Created.ToString(),
                Message = "Product created successfully."
            };
        }

        public Task<ResultService> DeleteProductAsync(Guid productId)
        {
            throw new NotImplementedException();
        }

        public async Task<ResultService> GetListProductAsync()
        {
            var products = await unitOfWork.ProductRepository.GetAll()
                                    .Include(p => p.RentalShop)
                                    .ToListAsync();

            var result = products.Select(p => p.ToListProductOutput()).ToList();

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Product list retrieved successfully.",
                Datas = result
            };
        }
    }
}
