using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Extensions;
using BE.Application.Services.Products.ProductServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace BE.Application.Services.Products
{
    public class ProductService : BaseService, IProductService
    {
        private readonly IValidator<CreateProductInputDto> createProductValidator;
        private readonly IValidator<UpdateProductInputDto> updateProductValidator;

        private readonly IAzureService _azureService;

        public ProductService(
            IUnitOfWork unitOfWork,
            IUser user,
            IAzureService azureService,
            IValidator<CreateProductInputDto> createProductValidator,
            IValidator<UpdateProductInputDto> updateProductValidator)
            : base(unitOfWork, user)
        {
            this.createProductValidator = createProductValidator;
            this.updateProductValidator = updateProductValidator;
            _azureService = azureService;
        }

        public async Task<ResultService> CreateAsync(CreateProductInputDto inputDto)
        {
            await createProductValidator.ValidateAndThrowAsync(inputDto);

            var product = inputDto.ToEntity();

            await ConvertImageAsync(product, inputDto.Images);

            await unitOfWork.ProductRepository.AddAsync(product);

            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.Created.ToString(),
                Message = "Product created successfully."
            };
        }

        public async Task<ResultService> DeleteProductAsync(Guid productId)
        {
            var product = await unitOfWork.ProductRepository.FindByIdAsync(productId);
            if (product == null)
                return new ResultService { StatusCode = HttpStatusCode.NotFound.ToString(), Message = "Product not found." };

            await unitOfWork.ProductRepository.DeleteAsync(product);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Product deleted successfully."
            };
        }

        public async Task<ResultService> GetListProductAsync(GetListProductInputDto inputDto)
        {
            var query = unitOfWork.ProductRepository.GetAll();
            query = query
                .Filter(inputDto.ProductName, p => p.ProductName.Contains(inputDto.ProductName ?? string.Empty))
                .Filter(inputDto.Description, p => p.Description.Contains(inputDto.Description ?? string.Empty));

            var products = await query.OrderBy(inputDto.OrderBy, inputDto.OrderByDesc)
                .ThenBy(inputDto.ThenBy, inputDto.ThenByDesc)
                .ToPageList(inputDto)
                .ToPageResult(await query.CountAsync(), inputDto, p => p.ToListProductOutput());

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Success",
                Datas = products
            };
        }

        public async Task<ResultService> UpdateProductAsync(UpdateProductInputDto inputDto, Guid id)
        {
            await updateProductValidator.ValidateAndThrowAsync(inputDto);

            var product = await unitOfWork.ProductRepository.FindByIdAsync(id);
            if (product == null)
                return new ResultService { StatusCode = HttpStatusCode.NotFound.ToString(), Message = "Product not found." };

            product.ProductName = inputDto.ProductName;
            product.Description = inputDto.Description;
            product.Quantity = inputDto.Quantity;
            product.Evaluate = inputDto.Evaluate;
            product.RentalLimitDays = inputDto.RentalLimitDays;
            product.RentalPrice = inputDto.RentalPrice;
            product.DepositPrice = inputDto.DepositPrice;

            await ConvertImageAsync(product, inputDto.Images);

            await unitOfWork.ProductRepository.UpdateAsync(product);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Product updated successfully."
            };
        }

        private async Task ConvertImageAsync(Product product, List<IFormFile>? images)
        {
            var listUri = await _azureService.UpLoadFileAsync(images ?? new List<IFormFile>());

            foreach (var item in listUri)
            {
                var productImage = new ProductImage
                {
                    Link = item,
                };

                product.ProductImages?.Add(productImage);
            }
        }
    }
}