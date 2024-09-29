using BE.Domain.Abstractions.IEntities;
using System.Security.Claims;

namespace BE.Api.Extensions
{
    public class CurrentUser : IUser
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUser(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public Guid? Id => Guid.Parse(_httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
        public string? UserName => _httpContextAccessor.HttpContext?.User?.FindFirst("name")?.Value;

    }
}
