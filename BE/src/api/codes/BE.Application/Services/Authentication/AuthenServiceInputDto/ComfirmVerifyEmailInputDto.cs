namespace BE.Application.Services.Authentication.AuthenServiceInputDto
{
    public class ComfirmVerifyEmailInputDto
    {
        public string? Email { get; set; }
        public string? Code { get; set; }
        public string? UserComfirmCode { get; set; }
    }
}
