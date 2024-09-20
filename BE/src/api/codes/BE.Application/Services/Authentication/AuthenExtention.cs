using BE.Domain.Entities.Users;

namespace BE.Application.Services.Authentication
{
    public static class AuthenExtention
    {
        public static string EncodePassword(this string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
        }

        public static string GenerateToken(User user)
        {

        }
    }
}
 
