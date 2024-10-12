namespace BE.Application.Services.Authentication
{
    public static class AuthenExtention
    {
        public static string EncodePassword(this string password)
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
            return passwordHash;
        }

        public static bool VerifyPassword(this string providedPassword, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
        }    
    }
}

