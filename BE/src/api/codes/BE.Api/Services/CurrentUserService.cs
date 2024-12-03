using BE.Domain.Interfaces;
using System.Security.Claims;

namespace BE.Api.Services
{
    public class CurrentUserService : IUser
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid? Id => Guid.Parse(_httpContextAccessor?.HttpContext?.User?.FindFirstValue("UserId")!);

        public string? UserName => _httpContextAccessor?.HttpContext?.User?.FindFirstValue("UserName")!;

        public string? FullName => _httpContextAccessor?.HttpContext?.User?.FindFirstValue("FullName")!;

        public Guid? RentalShopId => Guid.Parse(_httpContextAccessor?.HttpContext?.User?.FindFirstValue("RentalShopId")!);

        public decimal? Balance => Decimal.Parse(_httpContextAccessor?.HttpContext?.User?.FindFirstValue("Balance") ?? "0");
    }
}