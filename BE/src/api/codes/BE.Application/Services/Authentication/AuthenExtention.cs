namespace BE.Application.Services.Authentication
{
    public static class AuthenExtention
    {
        public static string HashPassword(this string password)
        {
            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

            return passwordHash;
        }

        public static bool VerifyPassword(string providedPassword, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
        }    
    }
}

