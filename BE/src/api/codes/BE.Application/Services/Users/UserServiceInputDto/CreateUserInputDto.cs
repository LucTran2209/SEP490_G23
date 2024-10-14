namespace BE.Application.Services.Users.UserServiceInputDto
{
    public class CreateUserInputDto
    {
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Address { get; set; } = null!;
        public bool Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Introduction { get; set; } = null!;
        public string AvatarPersonal { get; set; } = null!;
        public bool IsActive { get; set; }
        public string RefreshToken { get; set; } = null!;
    }
}
