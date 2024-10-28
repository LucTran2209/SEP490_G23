using BE.Application.Services.Users.UserServiceInputDto;
using BE.Application.Services.Users.UserServiceOutputDto;
using BE.Domain.Entities;

namespace BE.Application.Services.Users
{
    public static class UserExtention
    {
        public static User ToEntity(this CreateUserInputDto command, string file)
        {
            var user = new User();
            user.UserName = command.UserName;
            user.Password = command.Password;
            user.Email = command.Email;
            user.PhoneNumber = command.PhoneNumber;
            user.FullName = command.FullName;
            user.Address = command.Address;
            user.Gender = (bool)command.Gender;
            user.DateOfBirth = command.DateOfBirth;
            user.AvatarPersonal = file;
            user.Introduction = command.Introduction;
            user.RefreshToken = command.RefreshToken;
            user.IsActive = command.IsActive;
            return user;
        }
        public static User updateuser(this UpadteUserInputDto command, User user, string file)
        {

            user.Address = command.Address;
            user.Email = command.Email;
            user.PhoneNumber = command.PhoneNumber;
            user.FullName = command.FullName;
            user.Gender = (bool)command.Gender;
            user.DateOfBirth = command.DateOfBirth;
            user.AvatarPersonal = file;
            return user;
        }
        public static FindUserOutputDto FindUser(User user)
        {
            var findUser = new FindUserOutputDto();
            findUser.Id = user.Id;
            findUser.FullName = user.FullName;
            findUser.Gender = user.Gender;
            findUser.UserName = user.UserName;
            findUser.Email = user.Email;
            findUser.PhoneNumber = user.PhoneNumber;
            findUser.Address = user.Address;
            findUser.DateOfBirth = user.DateOfBirth;
            findUser.AvatarPersonal = user.AvatarPersonal;
            findUser.ListRole = user.UserRoles?.Select(ur => ur.Role?.Name!).ToList() ?? new List<string>();
            return findUser;
        }
        public static GetListUserOutputDto GetListUser(this User user)
        {
            var Users = new GetListUserOutputDto
            {
                Id = user.Id,
                FullName = user.FullName!,
                Gender = user.Gender,
                UserName = user.UserName!,
                Email = user.Email!,
                PhoneNumber = user.PhoneNumber!,
                Address = user.Address ?? string.Empty,
                DateOfBirth = user.DateOfBirth,
                IsActive = user.IsActive,
                AvatarPersonal = user.AvatarPersonal,
                ListRole = user.UserRoles?.Select(ur => ur.Role?.Name!).ToList()
            };

            return Users;
        }
    }
}
