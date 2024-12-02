using AutoMapper;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.DependencyInjections;
using BE.Application.Services.Orders;
using BE.Application.Services.Orders.OrderServiceInputDto;
using BE.Application.Services.Orders.OrderServiceOutputDto;
using BE.Application.Services.Orders.Validator;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Persistence;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Moq;
using System.Net;

namespace UnitTest
{
    public class GetDeatailOrder
    {
        private readonly Mock<IUnitOfWork> _mockUnitOfWork;
        private readonly Mock<IOptions<JwtOption>> _mockJwtOptions;
        private readonly Mock<IMapper> _mockMapper;
        private readonly Mock<IOptions<SystemConfig>> _mockSystemConfig;
        private readonly Mock<IMemoryCache> _mockMemoryCache;
        private readonly OrderService _orderService;
        private readonly ApplicationDbContext _dbContext;

        public GetDeatailOrder()
        {
            // Setup DbContext với InMemory Database
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;
            _dbContext = new ApplicationDbContext(options);

            // Mock các dependency
            _mockUnitOfWork = new Mock<IUnitOfWork>();
            _mockMapper = new Mock<IMapper>();

            // Seed dữ liệu
            SeedTestData();

            // Cấu hình UnitOfWork để trả về dữ liệu đúng
            _mockUnitOfWork.Setup(u => u.OrderRepository.GetDetailOrderAsync(It.IsAny<Guid>()))
                .Returns<Guid>(id => Task.FromResult(
                    _dbContext.Orders.Include(o => o.OrderDetails).SingleOrDefault(o => o.Id == id)));

            var realValidator = new GetOrderDetailValidator(_dbContext, Mock.Of<IUser>());

            // Khởi tạo OrderService với validator thực
            _orderService = new OrderService(
                _mockUnitOfWork.Object,
                Mock.Of<IUser>(),
                _mockMapper.Object,
                Mock.Of<IValidator<CreateOrderInputDto>>(),
                realValidator, // Inject validator thực
                Mock.Of<IAzureService>()
            );
        }
        private void SeedTestData()
        {
            // Tạo dữ liệu mẫu cho Product
            var product = new Product
            {
                Id = Guid.NewGuid(),
                ProductName = "Sample Product",
                RentalPrice = 50.00m
            };
            _dbContext.Products.Add(product);

            // Tạo dữ liệu mẫu cho Order
            var order = new Order
            {
                Id = Guid.NewGuid(),
                UserId = Guid.NewGuid(),
                Code = "Order123",
                RecipientName = "John Doe",
                RecipientAddress = "123 Main St",
                TotalRentPrice = 100.00m,
                TotalDepositPrice = 50.00m,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(1)
            };
            _dbContext.Orders.Add(order);

            // Tạo dữ liệu mẫu cho OrderDetail
            var orderDetail = new OrderDetail
            {
                ProductId = product.Id,
                OrderId = order.Id,
                Quantity = 2
            };
            _dbContext.OrderDetails.Add(orderDetail);

            // Lưu dữ liệu vào InMemoryDatabase
            _dbContext.SaveChanges();
        }

        [Fact]
        public async Task GetDetailOrderAsync_Should_Return_Success_When_Valid_OrderId()
        {
            // Arrange
            var orderId = _dbContext.Orders.First().Id;
            var inputDto = new GetOrderDetailInputDto { OrderId = orderId };

            _mockMapper.Setup(m => m.Map<GetListRentalShopOrderOutputDto>(It.IsAny<Order>()))
                .Returns(new GetListRentalShopOrderOutputDto { Id = orderId, Code = "Order123" });

            // Act
            var result = await _orderService.GetDetailOrderAsync(inputDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.NotNull(result.Datas);
            Assert.IsType<GetListRentalShopOrderOutputDto>(result.Datas);
            var data = result.Datas as GetListRentalShopOrderOutputDto;
            Assert.Equal(orderId, data!.Id);
            Assert.Equal("Order123", data.Code);
        }

        [Fact]
        public async Task GetDetailOrderAsync_Should_Throw_ValidationException_When_OrderId_Invalid()
        {
            // Arrange
            var inputDto = new GetOrderDetailInputDto { OrderId = Guid.NewGuid() };

            // Act & Assert
            var exception = await Assert.ThrowsAsync<FluentValidation.ValidationException>(() => _orderService.GetDetailOrderAsync(inputDto));
            Assert.NotNull(exception);
            Assert.Contains("Order does not exist in the database.", exception.Message);
        }

        [Fact]
        public async Task GetDetailOrderAsync_Should_Throw_ValidationException_When_OrderId_Null()
        {
            // Arrange
            var inputDto = new GetOrderDetailInputDto { OrderId = Guid.Empty };

            // Act & Assert
            var exception = await Assert.ThrowsAsync<FluentValidation.ValidationException>(() => _orderService.GetDetailOrderAsync(inputDto));
            Assert.NotNull(exception);
            Assert.Contains("Order does not exist in the database.", exception.Message);
        }
    }
}

