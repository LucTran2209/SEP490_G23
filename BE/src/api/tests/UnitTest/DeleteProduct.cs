using AutoMapper;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Products;
using BE.Application.Services.Products.ProductServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Persistence;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Net;

public class DeleteProductTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly ProductService _productService;
    private readonly ApplicationDbContext _dbContext;

    public DeleteProductTests()
    {
        // Khởi tạo DbContext với InMemory Database
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
        _dbContext = new ApplicationDbContext(options);

        // Mock UnitOfWork
        _mockUnitOfWork = new Mock<IUnitOfWork>();

        // Cấu hình UnitOfWork để thao tác với DbContext
        _mockUnitOfWork.Setup(u => u.ProductRepository.FindByIdAsync(It.IsAny<Guid>()))
            .Returns<Guid>(id => Task.FromResult(_dbContext.Products.SingleOrDefault(p => p.Id == id)));

        _mockUnitOfWork.Setup(u => u.ProductRepository.DeleteAsync(It.IsAny<Product>()))
            .Callback<Product>(product => _dbContext.Products.Remove(product))
            .Returns(Task.CompletedTask);

        // Khởi tạo ProductService
        _productService = new ProductService(
            _mockUnitOfWork.Object,
            Mock.Of<IUser>(),
            Mock.Of<IMapper>(),
            Mock.Of<IAzureService>(),
            Mock.Of<IValidator<CreateProductInputDto>>(),
            Mock.Of<IValidator<UpdateProductInputDto>>()
        );

        // Seed dữ liệu mẫu
        SeedTestData();
    }

    private void SeedTestData()
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            ProductName = "Sample Product",
            Description = "Sample Description",
            Quantity = 10,
            RentalPrice = 100.00m,
            DepositPrice = 50.00m,
            RentalLimitDays = 7
        };
        _dbContext.Products.Add(product);
        _dbContext.SaveChanges();
    }

    [Fact]
    public async Task DeleteProductAsync_Should_Return_Success_When_Product_Exists()
    {
        // Arrange
        var productId = _dbContext.Products.First().Id;

        // Act
        var result = await _productService.DeleteProductAsync(productId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.Equal("Product deleted successfully.", result.Message);
        //Assert.Null(_dbContext.Products.SingleOrDefault(p => p.Id == productId)); // Ensure product is removed
    }

    [Fact]
    public async Task DeleteProductAsync_Should_Return_NotFound_When_Product_Not_Exists()
    {
        // Arrange
        var nonExistentProductId = Guid.NewGuid();

        // Act
        var result = await _productService.DeleteProductAsync(nonExistentProductId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
        Assert.Equal("Product not found.", result.Message);
    }
}
