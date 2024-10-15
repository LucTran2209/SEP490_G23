namespace BE.Application.Services.Users.UserServiceInputDto
{
    public class CreateUserInputDto
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public bool Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Introduction { get; set; }
        public string? AvatarPersonal { get; set; }
        public bool IsActive { get; set; }
        public string? RefreshToken { get; set; }
    }
}
