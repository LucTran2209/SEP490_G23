namespace BE.Application.Services.Users.UserServiceOutputDto
{
    public class GetListUserOutputDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Address { get; set; } = null!;
        public bool Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public bool IsActive { get; set; }
        public string? AvatarPersonal { get; set; }
        public List<string>? ListRole { get; set; } = new List<string>();
    }
}
