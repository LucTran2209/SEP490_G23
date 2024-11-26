using AutoMapper;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.DependencyInjections;
using BE.Application.Services.Authentication;
using BE.Application.Services.Authentication.AuthenServiceInputDto;
using BE.Application.Services.Authentication.AuthenServiceOutputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
using FluentAssertions;
using FluentValidation;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Moq;
using System.Net;

public class AuthenServiceTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IValidator<LoginByUserNamePasswordInputDto>> _mockValidator;
    private readonly Mock<IOptions<JwtOption>> _mockJwtOptions;
    private readonly Mock<IOptions<SystemConfig>> _mockSystemConfig;
    private readonly Mock<IMemoryCache> _mockMemoryCache;
    private readonly AuthenService _authenService;

    public AuthenServiceTests()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockValidator = new Mock<IValidator<LoginByUserNamePasswordInputDto>>();
        _mockJwtOptions = new Mock<IOptions<JwtOption>>();
        _mockSystemConfig = new Mock<IOptions<SystemConfig>>();
        _mockMemoryCache = new Mock<IMemoryCache>();

        var jwtOption = new JwtOption
        {
            Secret = "asdhaidgadhgadjhgajdvajsdadgadajsdgajhdgajhdgajhdsadhiefiuefkjsdknuieskdfiheuihdjfhkejhfudhksjfheu",
            ValidAudience = "ERMS",
            ValidIssuer = "ERMS"
        };
        var systemConfig = new SystemConfig { BasePath = "http://localhost:4200" };

        _mockJwtOptions.Setup(x => x.Value).Returns(jwtOption);
        _mockSystemConfig.Setup(x => x.Value).Returns(systemConfig);

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
            _mockValidator.Object
        );
    }

    [Fact]
    public async Task LoginByUserNamePasswordAsync_Should_Return_Token_When_Valid()
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
            Email = "testuser@example.com",
            FullName = "Test User",
            AvatarPersonal = "avatar.png",
            Balance = 100,
            RentalShops = new List<RentalShop> { new RentalShop { Id = Guid.NewGuid() } }
        };

        // Mock Validator: Giả lập ValidateAndThrowAsync không ném lỗi
        _mockValidator.Setup(v => v.Validate(It.IsAny<ValidationContext<LoginByUserNamePasswordInputDto>>()))
            .Returns(new FluentValidation.Results.ValidationResult());

        // Mock UserRepository
        _mockUnitOfWork.Setup(u => u.UserRepository.GetsUserByUserNameAsync("testuser"))
            .ReturnsAsync(user);

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
    [Fact]
    public async Task LoginByUserNamePasswordAsync_Should_Return_NotFound_When_User_Not_Found()
    {
        // Arrange
        var inputDto = new LoginByUserNamePasswordInputDto
        {
            UserName = "nonexistentuser",
            Password = "password123"
        };

        // Mock Validator: Giả lập việc validate thành công
        _mockValidator.Setup(v => v.Validate(It.IsAny<ValidationContext<LoginByUserNamePasswordInputDto>>()))
            .Returns(new FluentValidation.Results.ValidationResult());

        // Mock UserRepository: Giả lập không tìm thấy người dùng
        _mockUnitOfWork.Setup(u => u.UserRepository.GetsUserByUserNameAsync("nonexistentuser"))
            .ReturnsAsync((User)null);

        // Act
        var result = await _authenService.LoginByUserNamePasswordAsync(inputDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
        Assert.Equal("Wrong UserName or Password", result.Message);
        Assert.Null(result.Datas);
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
            Password = "password123".HashPassword() // Giả lập mật khẩu đã hash
        };

        // Mock Validator: Giả lập việc validate thành công
        _mockValidator.Setup(v => v.Validate(It.IsAny<ValidationContext<LoginByUserNamePasswordInputDto>>()))
            .Returns(new FluentValidation.Results.ValidationResult());

        // Mock UserRepository: Giả lập tìm thấy người dùng
        _mockUnitOfWork.Setup(u => u.UserRepository.GetsUserByUserNameAsync("testuser"))
            .ReturnsAsync(user);

        // Mock Password Verification: Trả về false vì mật khẩu sai
        AuthenExtention.VerifyPassword(inputDto.Password, user.Password).Should().BeFalse();

        // Act
        var result = await _authenService.LoginByUserNamePasswordAsync(inputDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
        Assert.Equal("Wrong UserName or Password", result.Message);
        Assert.Null(result.Datas);
    }
}
