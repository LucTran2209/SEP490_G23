namespace BE.Application.Services.Authentication.AuthenServiceInputDto
{
    public class LoginByUserNamePasswordInputDto
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }
}
