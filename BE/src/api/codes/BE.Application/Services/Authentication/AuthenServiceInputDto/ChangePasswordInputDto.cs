namespace BE.Application.Services.Authentication.AuthenServiceInputDto
{
    public class ChangePasswordInputDto
    {
        public required string CurrentPassword { get; set; }
        public required string NewPassword { get; set; }
    }
}
