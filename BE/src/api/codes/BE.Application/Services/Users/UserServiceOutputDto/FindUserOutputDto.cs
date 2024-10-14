namespace BE.Application.Services.Users.UserServiceOutputDto
{
    public class FindUserOutputDto
    {
        public string FullName { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Address { get; set; } = null!;
        public bool Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public List<Guid> ListRole { get; set; } = new List<Guid>();
    }
}
