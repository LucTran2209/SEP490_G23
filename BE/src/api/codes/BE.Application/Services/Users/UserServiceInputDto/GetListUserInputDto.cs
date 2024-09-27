using BE.Application.Models;

namespace BE.Application.Services.Users.UserServiceInputDto
{
    public class GetListUserInputDto : PagedResultRequestModel
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public DateTime? DateOfBirth { get; set; } = null;

    }
}
