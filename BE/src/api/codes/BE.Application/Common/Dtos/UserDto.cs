namespace BE.Application.Common.Dtos
{
    public class UserDto
    {
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public bool Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
}
