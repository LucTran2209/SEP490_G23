using AutoMapper;
using BE.Application.Abstractions.ServiceInterfaces;
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

public class GetProductById
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IMapper> _mockMapper;
    private readonly ProductService _productService;
    private readonly ApplicationDbContext _dbContext;

    public GetProductById()
    {
        // Khởi tạo DbContext với InMemory Database
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
        _dbContext = new ApplicationDbContext(options);

        // Mock các dependency
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockMapper = new Mock<IMapper>();

        // Cấu hình UnitOfWork để trả về dữ liệu từ DbContext
        _mockUnitOfWork.Setup(u => u.ProductRepository.GetProductDetail(It.IsAny<Guid>()))
            .Returns<Guid>(id => Task.FromResult(
                _dbContext.Products
                    .Include(p => p.ProductImages)
                    .Include(p => p.Feedbacks)
                    .SingleOrDefault(p => p.Id == id)));

        // Khởi tạo ProductService
        _productService = new ProductService(
            _mockUnitOfWork.Object,
            Mock.Of<IUser>(),
            _mockMapper.Object,
            Mock.Of<IAzureService>(),
            Mock.Of<IValidator<CreateProductInputDto>>(),
            Mock.Of<IValidator<UpdateProductInputDto>>()
        );

        // Seed dữ liệu
        SeedTestData();
    }

    private void SeedTestData()
    {
        // Tạo dữ liệu mẫu cho Product
        var product = new Product
        {
            Id = Guid.NewGuid(),
            ProductName = "Sample Product",
            Description = "Sample Description",
            Quantity = 10,
            RentalPrice = 100.00m,
            DepositPrice = 50.00m,
            RentalLimitDays = 7,
            Feedbacks = new List<Feedback>
            {
                new Feedback { Rating = 4 },
                new Feedback { Rating = 5 }
            },
            ProductImages = new List<ProductImage>
            {
                new ProductImage { Link = "image1.jpg" },
                new ProductImage { Link = "image2.jpg" }
            }
        };
        _dbContext.Products.Add(product);
        _dbContext.SaveChanges();
    }

    [Fact]
    public async Task GetProductByIdAsync_Should_Return_Success_When_Product_Exists()
    {
        // Arrange
        var productId = _dbContext.Products.First().Id;

        _mockMapper.Setup(m => m.Map<ProductDetailOutputDto>(It.IsAny<Product>()))
            .Returns(new ProductDetailOutputDto
            {
                Id = productId,
                ProductName = "Sample Product",
                Evaluate = 4.5m,
                NumberOfVoted = 2,
                Images = new List<string> { "image1.jpg", "image2.jpg" }
            });

        // Act
        var result = await _productService.GetProductByIdAsync(productId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.NotNull(result.Datas);
        Assert.IsType<ProductDetailOutputDto>(result.Datas);
        var data = result.Datas as ProductDetailOutputDto;
        Assert.Equal(productId, data!.Id);
        Assert.Equal("Sample Product", data.ProductName);
        Assert.Equal(4.5m, data.Evaluate);
        Assert.Equal(2, data.NumberOfVoted);
        Assert.Equal(2, data.Images.Count);
    }

    [Fact]
    public async Task GetProductByIdAsync_Should_Return_NotFound_When_Product_Not_Exists()
    {
        // Arrange
        var productId = Guid.NewGuid();

        // Act
        var result = await _productService.GetProductByIdAsync(productId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
        Assert.Equal("Product not found.", result.Message);
    }

    [Fact]
    public async Task GetProductByIdAsync_Should_Handle_Empty_Feedbacks()
    {
        // Arrange
        var productId = _dbContext.Products.First().Id;

        // Xóa Feedbacks để mô phỏng sản phẩm không có đánh giá
        var product = _dbContext.Products.Include(p => p.Feedbacks).First();
        product.Feedbacks = new List<Feedback>();
        _dbContext.SaveChanges();

        _mockMapper.Setup(m => m.Map<ProductDetailOutputDto>(It.IsAny<Product>()))
            .Returns(new ProductDetailOutputDto
            {
                Id = productId,
                ProductName = "Sample Product",
                Evaluate = 0,
                NumberOfVoted = 0,
                Images = new List<string> { "image1.jpg", "image2.jpg" }
            });

        // Act
        var result = await _productService.GetProductByIdAsync(productId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.NotNull(result.Datas);
        Assert.IsType<ProductDetailOutputDto>(result.Datas);
        var data = result.Datas as ProductDetailOutputDto;
        Assert.Equal(productId, data!.Id);
        Assert.Equal("Sample Product", data.ProductName);
        Assert.Equal(0, data.Evaluate);
        Assert.Equal(0, data.NumberOfVoted);
    }
}
