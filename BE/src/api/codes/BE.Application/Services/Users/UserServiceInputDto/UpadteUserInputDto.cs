using Microsoft.AspNetCore.Http;

namespace BE.Application.Services.Users.UserServiceInputDto
{
    public class UpadteUserInputDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Address { get; set; } = null!;
        public bool? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public IFormFile? AvatarPersonal { get; set; }
    }
}
