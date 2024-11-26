namespace BE.Application.Services.Authentication.AuthenServiceOutputDto
{
    public class LoginByUserNamePasswordOutputDto
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }
}