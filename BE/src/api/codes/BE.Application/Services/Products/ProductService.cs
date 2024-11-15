using BE.Application.Common.Dtos;
using BE.Application.Services.Products.ProductServiceInputDto;
using BE.Application.Services.Products.ProductServiceOutputDto;
using Microsoft.AspNetCore.Http;

namespace BE.Application.Services.Products
{
    public class ProductService : BaseService, IProductService
    {
        private readonly IValidator<CreateProductInputDto> createProductValidator;
        private readonly IValidator<UpdateProductInputDto> updateProductValidator;
        private readonly IMapper _mapper;
        private readonly IAzureService _azureService;

        public ProductService(
            IUnitOfWork unitOfWork,
            IUser user,
            IMapper mapper,
            IAzureService azureService,
            IValidator<CreateProductInputDto> createProductValidator,
            IValidator<UpdateProductInputDto> updateProductValidator)
            : base(unitOfWork, user)
        {
            this.createProductValidator = createProductValidator;
            this.updateProductValidator = updateProductValidator;
            _azureService = azureService;
            _mapper = mapper;
        }

        public async Task<ResultService> GetProductByIdAsync(Guid productId)
        {
            var product = await unitOfWork.ProductRepository.GetProductDetail(productId);

            if (product == null)
            {
                return new ResultService
                {
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Message = "Product not found."
                };
            }

            var productDetail = _mapper.Map<ProductDetailOutputDto>(product);

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Product detail retrieved successfully.",
                Datas = productDetail
            };
        }

        public async Task<ResultService> GetListProductAsync(GetListProductInputDto inputDto)
        {
            var query = unitOfWork.ProductRepository.GetAll()
                .Filter(inputDto.Search,
                    p => p.ProductName!.Contains(inputDto.Search)
                        || p.Description!.Contains(inputDto.Search)
                        || p.SubCategory!.SubCategoryName.Contains(inputDto.Search)
                        || p.SubCategory.Category.CategoryName.Contains(inputDto.Search))
                .Filter(inputDto.Addresses?.ToString(),
                    p => (inputDto.Addresses == null) ? true : inputDto.Addresses.Any(a => a.Contains(p.RentalShop.Address!)))
                .Filter(inputDto.SubCategory?.ToString(),
                    p => (inputDto.SubCategory == null) ? true : inputDto.SubCategory.Any(s => p.SubCategoryId == s))
                .Filter(inputDto.Evaluates?.ToString(),
                    p => (inputDto.Evaluates == null) ? true : inputDto.Evaluates.Any(e => e == Decimal.ToInt32(p.Evaluate)));

            var products = await query.OrderBy(inputDto.OrderBy, inputDto.OrderByDesc)
                .ThenBy(inputDto.ThenBy, inputDto.ThenByDesc)
                .ToPageList(inputDto)
                .ToPageResult(await query.CountAsync(), inputDto, p => _mapper.Map<ProductDetailDto>(p));

            var rentalShops = unitOfWork.RentalShopRepository.GetAll()
                .Filter(inputDto.Search, p => p.ShopName!.Contains(inputDto.Search))
                .ToList();

            var output = new GetListProductOutputDto()
            {
                Products = products,
                RentalShops = _mapper.Map<List<RentalShopDto>>(rentalShops)
            };

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = output
            };
        }

        public async Task<ResultService> GetListProductByRentalShopIdAsync(GetListProductByRetalShopIdInputDto inputDto, Guid rentalShopId)
        {
            var queryListProductInShop = unitOfWork.ProductRepository.GetListProductByRetalShopId(rentalShopId);

            queryListProductInShop = queryListProductInShop
                .Filter(inputDto.Search, p => p.ProductName!.Contains(inputDto.Search))
                .Filter(inputDto.Search, p => p.Description == null ? p.Description!.Contains(inputDto.Search) : false);

            var products = await queryListProductInShop.OrderBy(inputDto.OrderBy, inputDto.OrderByDesc)
                            .ThenBy(inputDto.ThenBy, inputDto.ThenByDesc)
                            .ToPageList(inputDto)
                            .ToPageResult(await queryListProductInShop.CountAsync(), inputDto, p => _mapper.Map<GetListProductByRentalShopIdOutputDto>(p));

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = products
            };
        }

        public async Task<ResultService> CreateAsync(CreateProductInputDto inputDto)
        {
            await createProductValidator.ValidateAndThrowAsync(inputDto);

            var product = inputDto.ToEntity();

            await ConvertImageAsync(product, inputDto.Images, false);

            await unitOfWork.ProductRepository.AddAsync(product);

            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.Created,
                Message = "Product created successfully."
            };
        }

        public async Task<ResultService> UpdateProductAsync(UpdateProductInputDto inputDto, Guid id)
        {
            await updateProductValidator.ValidateAndThrowAsync(inputDto);

            var product = await unitOfWork.ProductRepository.FindByIdAsync(id);
            if (product == null)
                return new ResultService { StatusCode = (int)HttpStatusCode.NotFound, Message = "Product not found." };

            product.ProductName = inputDto.ProductName;
            product.Description = inputDto.Description;
            product.Quantity = inputDto.Quantity;
            product.Evaluate = inputDto.Evaluate;
            product.RentalLimitDays = inputDto.RentalLimitDays;
            product.RentalPrice = inputDto.RentalPrice;
            product.DepositPrice = inputDto.DepositPrice;

            await ConvertImageAsync(product, inputDto.Images, true);

            await unitOfWork.ProductRepository.UpdateAsync(product);

            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Product updated successfully."
            };
        }

        public async Task<ResultService> DeleteProductAsync(Guid productId)
        {
            var product = await unitOfWork.ProductRepository.FindByIdAsync(productId);
            if (product == null)
                return new ResultService { StatusCode = (int)HttpStatusCode.NotFound, Message = "Product not found." };

            await unitOfWork.ProductRepository.DeleteAsync(product);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Product deleted successfully."
            };
        }

        private async Task ConvertImageAsync(Product product, List<IFormFile>? images, bool isUpdate)
        {
            var listUri = await _azureService.UpLoadFileAsync(images ?? new List<IFormFile>());

            if (product.ProductImages?.Count > 0)
            {
                await unitOfWork.ProductImageRepository.RemoveRangeAsync(product.ProductImages?.ToList());
            }

            var productImages = listUri.Select(i => new ProductImage()
            {
                ProductId = product.Id,
                Link = i,
            }).ToList();

            if (!isUpdate)
            {
                product.ProductImages = productImages;
            }
            else
            {
                await unitOfWork.ProductImageRepository.AddRangeAsync(productImages);
            }
        }
    }
}