using AutoMapper;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Models;
using BE.Application.Services.Products;
using BE.Application.Services.Products.ProductServiceInputDto;
using BE.Application.Services.Products.ProductServiceOutputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Persistence;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Net;

public class GetListProductByRentalShopIdTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IMapper> _mockMapper;
    private readonly ProductService _productService;
    private readonly ApplicationDbContext _dbContext;

    public GetListProductByRentalShopIdTests(Mock<IUnitOfWork> mockUnitOfWork, Mock<IMapper> mockMapper, ProductService productService, ApplicationDbContext dbContext)
    {
        _mockUnitOfWork = mockUnitOfWork;
        _mockMapper = mockMapper;
        _productService = productService;
        _dbContext = dbContext;
    }

    public GetListProductByRentalShopIdTests()
    {
        // Khởi tạo DbContext với InMemory Database
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
        _dbContext = new ApplicationDbContext(options);

        // Mock UnitOfWork
        _mockUnitOfWork = new Mock<IUnitOfWork>();

        // Mock Mapper
        _mockMapper = new Mock<IMapper>();

        // Khởi tạo ProductService
        _productService = new ProductService(
            _mockUnitOfWork.Object,
            Mock.Of<IUser>(),
            _mockMapper.Object,
            Mock.Of<IAzureService>(),
            Mock.Of<IValidator<CreateProductInputDto>>(),
            Mock.Of<IValidator<UpdateProductInputDto>>()
        );

        // Seed dữ liệu mẫu
        SeedTestData();
    }

    private void SeedTestData()
    {
        var rentalShopId = Guid.NewGuid();

        var products = new List<Product>
        {
            new Product
            {
                Id = Guid.NewGuid(),
                ProductName = "Product 1",
                Description = "Description 1",
                RentalShopId = rentalShopId,
                RentalPrice = 100,
                DepositPrice = 50,
                ProductImages = new List<ProductImage>
                {
                    new ProductImage { Link = "image1.jpg" },
                    new ProductImage { Link = "image2.jpg" }
                }
            },
            new Product
            {
                Id = Guid.NewGuid(),
                ProductName = "Product 2",
                Description = "Description 2",
                RentalShopId = rentalShopId,
                RentalPrice = 200,
                DepositPrice = 75,
                ProductImages = new List<ProductImage>
                {
                    new ProductImage { Link = "image3.jpg" }
                }
            },
            new Product
            {
                Id = Guid.NewGuid(),
                ProductName = "Other Product",
                Description = "Description 3",
                RentalShopId = Guid.NewGuid(), // Sản phẩm thuộc shop khác
                RentalPrice = 300,
                DepositPrice = 100
            }
        };

        _dbContext.Products.AddRange(products);
        _dbContext.SaveChanges();

        // Cấu hình UnitOfWork để trả về danh sách sản phẩm từ InMemory Database
        _mockUnitOfWork.Setup(u => u.ProductRepository.GetListProductByRetalShopId(It.IsAny<Guid>()))
            .Returns<Guid>(id => _dbContext.Products.Where(p => p.RentalShopId == id).AsQueryable());
    }

    [Fact]
    public async Task GetListProductByRentalShopIdAsync_Should_Return_All_When_No_Filter()
    {
        // Arrange
        var rentalShopId = Guid.Empty; // Không truyền rentalShopId
        var inputDto = new GetListProductByRetalShopIdInputDto();

        _mockMapper.Setup(m => m.Map<GetListProductByRentalShopIdOutputDto>(It.IsAny<Product>()))
            .Returns<Product>(p => new GetListProductByRentalShopIdOutputDto
            {
                Id = p.Id,
                ProductName = p.ProductName,
                Images = p.ProductImages?.Select(i => i.Link).ToList()
            });

        // Act
        var result = await _productService.GetListProductByRentalShopIdAsync(inputDto, rentalShopId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.NotNull(result.Datas);
        var data = result.Datas as PagedResultModel<GetListProductByRentalShopIdOutputDto>;
        Assert.NotNull(data);
        Assert.Equal(0, data!.TotalCount);
    }

    [Fact]
    public async Task GetListProductByRentalShopIdAsync_Should_Return_Filtered_By_Search()
    {
        // Arrange
        var rentalShopId = _dbContext.Products.First().RentalShopId;
        var inputDto = new GetListProductByRetalShopIdInputDto { Search = "Product 1" };

        _mockMapper.Setup(m => m.Map<GetListProductByRentalShopIdOutputDto>(It.IsAny<Product>()))
            .Returns<Product>(p => new GetListProductByRentalShopIdOutputDto
            {
                Id = p.Id,
                ProductName = p.ProductName,
                Images = p.ProductImages?.Select(i => i.Link).ToList()
            });

        // Act
        var result = await _productService.GetListProductByRentalShopIdAsync(inputDto, rentalShopId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.NotNull(result.Datas);
        var data = result.Datas as PagedResultModel<GetListProductByRentalShopIdOutputDto>;
        Assert.NotNull(data);
        Assert.Single(data!.Items); // Kết quả chỉ có 1 sản phẩm
        Assert.Equal("Product 1", data.Items.First().ProductName);
    }

    [Fact]
    public async Task GetListProductByRentalShopIdAsync_Should_Return_Filtered_By_RentalShopId()
    {
        // Arrange
        var rentalShopId = _dbContext.Products.First().RentalShopId; // Không cần `.Value` vì là `Guid`
        var inputDto = new GetListProductByRetalShopIdInputDto();

        _mockMapper.Setup(m => m.Map<GetListProductByRentalShopIdOutputDto>(It.IsAny<Product>()))
            .Returns<Product>(p => new GetListProductByRentalShopIdOutputDto
            {
                Id = p.Id,
                ProductName = p.ProductName,
                Images = p.ProductImages?.Select(i => i.Link).ToList()
            });

        // Act
        var result = await _productService.GetListProductByRentalShopIdAsync(inputDto, rentalShopId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.NotNull(result.Datas);
        var data = result.Datas as PagedResultModel<GetListProductByRentalShopIdOutputDto>;
        Assert.NotNull(data);
        Assert.Equal(2, data!.TotalCount); // Chỉ có 2 sản phẩm thuộc RentalShopId này
    }
}
