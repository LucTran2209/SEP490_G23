﻿using BE.Application.Services.Users.UserServiceInputDto;
using BE.Application.Services.Users.UserServiceOutputDto;
using BE.Domain.Entities.Users;

namespace BE.Application.Services.Users
{
    public static class UserExtention
    {
        public static User ToEntity(this CreateUserInputDto command)
        {
            var user = new User();
            user.UserName = command.UserName;
            user.Password = command.Password;
            user.Email = command.Email;
            user.PhoneNumber = command.PhoneNumber;
            user.FullName = command.FullName;
            user.Address = command.Address;
            user.Gender = command.Gender;
            user.DateOfBirth = command.DateOfBirth;
            user.AvatarPersonal = command.AvatarPersonal;
            user.Introduction = command.Introduction;
            user.RefreshToken = command.RefreshToken;
            user.IsActive = command.IsActive;
            return user;
        }
        public static User updateuser(this UpadteUserInputDto command, User user)
        {

            user.Address = command.Address;
            user.Email = command.Email;
            user.PhoneNumber = command.PhoneNumber;
            user.FullName = command.FullName;
            user.Gender = command.Gender;
            user.DateOfBirth = command.DateOfBirth;
            return user;
        }
        public static FindUserOutputDto FindUser(this User user)
        {
            var findUser = new FindUserOutputDto();
            findUser.FullName = user.FullName;
            findUser.Gender = user.Gender;
            findUser.UserName = user.UserName;
            findUser.Email = user.Email;
            findUser.PhoneNumber = user.PhoneNumber;
            findUser.Address = user.Address;
            findUser.DateOfBirth = user.DateOfBirth;
            return findUser;
        }
        public static GetListUserOutputDto GetListUser(this List<User> user)
        {
            var listUser = new GetListUserOutputDto();

            foreach (var item in user)
            {
                var Users = new GetUserOutputDto
                {
                    FullName = item.FullName,
                    Gender = item.Gender,
                    UserName = item.UserName,
                    Email = item.Email,
                    PhoneNumber = item.PhoneNumber,
                    Address = item.Address,
                    DateOfBirth = item.DateOfBirth,
                    IsActive = item.IsActive
                };

                // Thêm đối tượng Users vào danh sách bên trong GetListUserOutputDto
                listUser.list.Add(Users);
            }

            return listUser;
        }
        public static FillterUserOutputDto GetFillterListUser(this List<User> user)
        {
            var listUser = new FillterUserOutputDto();

            foreach (var item in user)
            {
                var Users = new GetUserOutputDto
                {
                    FullName = item.FullName,
                    Gender = item.Gender,
                    UserName = item.UserName,
                    Email = item.Email,
                    PhoneNumber = item.PhoneNumber,
                    Address = item.Address,
                    DateOfBirth = item.DateOfBirth,
                    IsActive = item.IsActive
                };

                // Thêm đối tượng Users vào danh sách bên trong GetListUserOutputDto
                listUser.ListFillter.Add(Users);
            }

            return listUser;
        }

    }
}
