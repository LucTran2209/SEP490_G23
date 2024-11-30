using BE.Application.Common.Dtos;
using BE.Application.Services.Products.ProductServiceInputDto;
using BE.Application.Services.Products.ProductServiceOutputDto;
using BE.Application.Services.RentalShops.RentalShopServiceOutputDto;
using BE.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

            if (product.Feedbacks?.Count == 0)
            {
                productDetail.Evaluate = 0;
                productDetail.NumberOfVoted = 0;
            }
            else
            {
                productDetail.NumberOfVoted = (int)product.Feedbacks?.Count!;
                productDetail.Evaluate = Math.Round(product.Feedbacks!.Sum(x => x.Rating) / productDetail.NumberOfVoted, 1);
            }

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
                    p => (inputDto.Addresses == null) ? true : inputDto.Addresses.Any(a => p.RentalShop.Address!.Contains(a)))
                .Filter(inputDto.SubCategory?.ToString(),
                    p => (inputDto.SubCategory == null) ? true : inputDto.SubCategory.Any(s => p.SubCategoryId == s))
                .Filter(inputDto.Evaluates?.ToString(),
                    p => (inputDto.Evaluates == null) ? true : inputDto.Evaluates.Any(e => e == Decimal.ToInt32(p.Evaluate)))
                .Filter(inputDto.MinPrice.ToString(),
                    p => (inputDto.MinPrice <= p.RentalPrice) && (inputDto.MaxPrice >= p.RentalPrice));

            var products = await query.OrderBy(inputDto.OrderBy, inputDto.OrderByDesc)
                .ThenBy(inputDto.ThenBy, inputDto.ThenByDesc)
                .ToPageList(inputDto)
                .ToPageResult(await query.CountAsync(), inputDto, p => _mapper.Map<ProductDetailDto>(p));

            // RentalShop Search
            var rentalShops = unitOfWork.RentalShopRepository.GetAll()
                .Filter(inputDto.Search, p => p.ShopName!.Contains(inputDto.Search))
            .ToList();

            var rentalShopDetails = _mapper.Map<List<GetRentalShopDetailByIdOuputDto>>(rentalShops);

            foreach (var item in rentalShopDetails)
            {
                item.NumberOfRenter = unitOfWork.OrderRepository.GetRentalShopOrder((Guid)item.Id!)
                                                            .Where(o => o.OrderStatuses!.Any(s => s.Status != RequestStatus.CANCEL))
                                                            .ToList().Count;

                var x = await unitOfWork.ProductRepository.GetListProductByRetalShopId((Guid)item.Id!).ToListAsync();
                item.NumberOfProduct = x.Count;

                var voted = await unitOfWork.OrderRepository.RentalShopDetailVoted((Guid)item.Id!);

                item.NumberOfVote = voted.Item1;
                item.AvegateVote = voted.Item2;
            }

            var output = new GetListProductOutputDto()
            {
                Products = products,
                RentalShops = rentalShopDetails
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
                .Filter(inputDto.Search, p => p.ProductName!.Contains(inputDto.Search));

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