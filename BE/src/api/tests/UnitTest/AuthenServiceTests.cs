using AutoMapper;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.DependencyInjections;
using BE.Application.Services.Authentication;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Application.Services.Authentication.AuthenServiceOutputDto;
using BE.Application.Services.Authentication.Validators;
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

public class AuthenServiceTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IOptions<JwtOption>> _mockJwtOptions;
    private readonly Mock<IOptions<SystemConfig>> _mockSystemConfig;
    private readonly Mock<IMemoryCache> _mockMemoryCache;
    private readonly AuthenService _authenService;
    private readonly ApplicationDbContext _dbContext;

    public AuthenServiceTests()
    {
        // Mock các dependencies khác
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockJwtOptions = new Mock<IOptions<JwtOption>>();
        _mockSystemConfig = new Mock<IOptions<SystemConfig>>();
        _mockMemoryCache = new Mock<IMemoryCache>();

        // Cấu hình JwtOption
        var jwtOption = new JwtOption
        {
            Secret = "asdhaidgadhgadjhgajdvajsdadgadajsdgajhdgajhdgajhdsadhiefiuefkjsdknuieskdfiheuihdjfhkejhfudhksjfheu",
            ValidAudience = "ERMS",
            ValidIssuer = "ERMS"
        };
        var systemConfig = new SystemConfig { BasePath = "http://localhost:4200" };

        _mockJwtOptions.Setup(x => x.Value).Returns(jwtOption);
        _mockSystemConfig.Setup(x => x.Value).Returns(systemConfig);

        // Khởi tạo DbContext InMemory
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase("TestDatabase")
            .Options;

        _dbContext = new ApplicationDbContext(options);

        // Thêm dữ liệu mẫu nếu cần
        SeedTestData();

        // Khởi tạo validator thực tế
        var realValidator = new LoginByUserNamePasswordValidator(_dbContext, Mock.Of<IUser>());

        // Khởi tạo AuthenService
        _authenService = new AuthenService(
            _mockUnitOfWork.Object,
            Mock.Of<IUser>(),
            _mockJwtOptions.Object,
            _mockSystemConfig.Object,
            Mock.Of<IMailService>(),
            Mock.Of<IMapper>(),
            _mockMemoryCache.Object,
            Mock.Of<IValidator<RegisterInputDto>>(),
            Mock.Of<IValidator<ChangePasswordInputDto>>(),
            Mock.Of<IValidator<ForgotPasswordInputDto>>(),
            Mock.Of<IValidator<VerifyEmailInputDto>>(),
            Mock.Of<IValidator<CheckNotExistedEmailInputDto>>(),
            Mock.Of<IValidator<CheckNotExistedUserNameInputDto>>(),
            realValidator // Inject validator thực tế
        );
    }

    private void SeedTestData()
    {
        // Thêm dữ liệu mẫu vào DbContext nếu cần để hỗ trợ test
        _dbContext.Users.Add(new User
        {
            Id = Guid.NewGuid(),
            UserName = "testuser",
            Password = "password123".HashPassword(),
            Email = "testuser@example.com",
            FullName = "Test User"
        });

        _dbContext.SaveChanges();
    }

    [Fact]
    public async Task LoginByUserNamePasswordAsync_Should_Return_ValidationException_When_UserName_Is_Empty()
    {
        // Arrange
        var inputDto = new LoginByUserNamePasswordInputDto
        {
            UserName = "",
            Password = "password123"
        };

        // Act
        var exception = await Assert.ThrowsAsync<FluentValidation.ValidationException>(
            async () => await _authenService.LoginByUserNamePasswordAsync(inputDto)
        );

        // Assert
        Assert.NotNull(exception);
        Assert.Contains("UserName is required", exception.Message);
    }

    [Fact]
    public async Task LoginByUserNamePasswordAsync_Should_Return_ValidationException_When_Password_Is_Empty()
    {
        // Arrange
        var inputDto = new LoginByUserNamePasswordInputDto
        {
            UserName = "testuser",
            Password = ""
        };

        // Act
        var exception = await Assert.ThrowsAsync<FluentValidation.ValidationException>(
            async () => await _authenService.LoginByUserNamePasswordAsync(inputDto)
        );

        // Assert
        Assert.NotNull(exception);
        Assert.Contains("Password is required", exception.Message);
    }

    [Fact]
    public async Task LoginByUserNamePasswordAsync_Should_Return_NotFound_When_UserName_Not_Exist()
    {
        // Arrange
        var inputDto = new LoginByUserNamePasswordInputDto
        {
            UserName = "nonexistentuser",
            Password = "password123"
        };

        // Act
        var exception = await Assert.ThrowsAsync<FluentValidation.ValidationException>(
            async () => await _authenService.LoginByUserNamePasswordAsync(inputDto)
        );

        // Assert
        Assert.NotNull(exception);
        Assert.Contains("UserName has not exist!", exception.Message);
    }

    [Fact]
    public async Task LoginByUserNamePasswordAsync_Should_Return_NotFound_When_Password_Invalid()
    {
        // Arrange
        var inputDto = new LoginByUserNamePasswordInputDto
        {
            UserName = "testuser",
            Password = "wrongpassword"
        };

        var user = new User
        {
            Id = Guid.NewGuid(),
            UserName = "testuser",
            Password = "password123".HashPassword(), // Mật khẩu hợp lệ được hash
            Email = "testuser@example.com",
            FullName = "Test User"
        };

        // Mock UserRepository
        var mockUserRepository = new Mock<IUserRepository>();
        mockUserRepository.Setup(repo => repo.GetsUserByUserNameAsync("testuser"))
            .ReturnsAsync(user); // Trả về người dùng có mật khẩu hợp lệ

        _mockUnitOfWork.Setup(u => u.UserRepository)
            .Returns(mockUserRepository.Object);

        // Act
        var result = await _authenService.LoginByUserNamePasswordAsync(inputDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
        Assert.Equal("Wrong UserName or Password", result.Message);
        Assert.Null(result.Datas);
    }
    [Fact]
    public async Task LoginByUserNamePasswordAsync_Should_Return_True()
    {
        // Arrange
        var inputDto = new LoginByUserNamePasswordInputDto
        {
            UserName = "testuser",
            Password = "password123"
        };

        var user = new User
        {
            Id = Guid.NewGuid(),
            UserName = "testuser",
            Password = "password123".HashPassword(),
            Email = "testuser@gmail.com",
            FullName = "Test User",
            AvatarPersonal = "avatar.png",
            Balance = 100,
            RentalShops = new List<RentalShop> { new RentalShop { Id = Guid.NewGuid() } }
        };

        // Mock UserRepository trong IUnitOfWork
        var mockUserRepository = new Mock<IUserRepository>();
        mockUserRepository.Setup(repo => repo.GetsUserByUserNameAsync("testuser"))
            .ReturnsAsync(user);

        _mockUnitOfWork.Setup(u => u.UserRepository)
            .Returns(mockUserRepository.Object);

        // Act
        var result = await _authenService.LoginByUserNamePasswordAsync(inputDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.Equal("", result.Message);

        var outputDto = result.Datas as LoginByUserNamePasswordOutputDto;
        Assert.NotNull(outputDto);
        Assert.False(string.IsNullOrEmpty(outputDto!.AccessToken));
        Assert.Equal("adhqdasdhwncqdojaodjqoiwwwwwwjdaosjdwjdoasjdonqjdq", outputDto.RefreshToken);
    }
}