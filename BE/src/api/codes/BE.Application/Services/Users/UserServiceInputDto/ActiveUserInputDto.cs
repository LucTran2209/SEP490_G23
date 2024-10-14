namespace BE.Application.Services.Users.UserServiceInputDto
{
    public class ActiveUserInputDto
    {
        public string UserName { get; set; } = null!;
        public bool IsActive { get; set; }
    }
}
