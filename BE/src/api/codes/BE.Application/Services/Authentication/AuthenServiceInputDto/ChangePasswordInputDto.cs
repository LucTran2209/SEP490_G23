namespace BE.Application.Services.Authentication.AuthenServiceInputDto
{
    public class ChangePasswordInputDto
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}