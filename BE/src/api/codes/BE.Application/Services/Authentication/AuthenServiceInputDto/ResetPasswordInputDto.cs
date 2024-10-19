namespace BE.Application.Services.Authentication.AuthenServiceInputDto
{
    public class ResetPasswordInputDto
    {
        public string? Email { get; set; }
        public string? Token { get; set; }
        public string? NewPassword { get; set; }
    }
}
