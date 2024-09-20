using BE.Application.Services.Users.UserServiceInputDto;
using BE.Application.Services.Users.UserServiceOutputDto;
using BE.Domain.Entities.Users;

namespace BE.Application.Services.Users
{
    public static class UserExtention
    {
        public static User ToEntity(this CreateUserInputDto command)
        {
            var user = new User();

            return user;
        }
        public static User updateuser(this UpadteUserInputDto command)
        {
            var user = new User();
            user.Address = command.Address;
            user.Email = command.Email;
            user.PhoneNumber = command.PhoneNumber;
            user.FullName = command.FullName;
            user.Gender = command.Gender;
            user.DateOfBirth = command.DateOfBirth;
            return user;
        }
        public static GetListUserOutputDto ToDto(this User user)
        {
            return new GetListUserOutputDto
            {

            };
        }
    }
}
