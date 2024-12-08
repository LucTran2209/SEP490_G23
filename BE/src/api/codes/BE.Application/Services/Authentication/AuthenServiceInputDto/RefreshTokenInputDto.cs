namespace BE.Application.Services.Authentication.AuthenServiceInputDto
{
    public class RefreshTokenInputDto
    {
        public required string Token { get; set; }
        public required string RefreshToken {  get; set; }
    }
}
