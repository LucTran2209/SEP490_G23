namespace BE.Application.Services.Authentication.AuthenServiceOutputDto
{
    internal class LoginByUserNamePasswordOutputDto
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken {  get; set; }
    }
}
