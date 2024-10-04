//using System.Security.Claims;

//namespace BE.Infrastructure.Extentions;
//public static class ClaimsPrincipalExtensions
//{
//    public static string? GetEmail(this ClaimsPrincipal claimsPrincipal)
//    => claimsPrincipal.FindFirstValue(ClaimTypes.Email);

//    public static string? GetPhoneNumber(this ClaimsPrincipal claimsPrincipal)
//        => claimsPrincipal.FindFirstValue(ClaimTypes.MobilePhone);

//    public static Guid GetUserId(this ClaimsPrincipal claimsPrincipal)
//    {
//        var userId = claimsPrincipal.FindFirst("UserId");
//        return Guid.TryParse(userId?.Value.ToString(), out var value);
//    }

//    public static string? GetUserName(this ClaimsPrincipal claimsPrincipal)
//    {
//        return claimsPrincipal.FindFirst(ClaimTypes.Name);
//    }


//    public static string? GetDisplayName(this ClaimsPrincipal claimsPrincipal)
//        => claimsPrincipal.FindFirstValue(ClaimTypes.GivenName);

//    public static string[]? GetRoles(this ClaimsPrincipal claimsPrincipal)
//        => claimsPrincipal.Claims.Where(x => x.Type == ClaimTypes.Role).Select(x => x.Value).ToArray();
//}
