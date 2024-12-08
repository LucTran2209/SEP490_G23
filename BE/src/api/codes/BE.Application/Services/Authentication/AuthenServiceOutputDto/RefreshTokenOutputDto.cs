namespace BE.Application.Services.Authentication.AuthenServiceOutputDto
{
    public class RefreshTokenOutputDto
    {
        public required string AccessToken {  get; set; }
        public required string RefreshToken { get; set; }
    }
}
