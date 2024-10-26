using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Extensions;
using BE.Application.Services.Authentication;
using BE.Application.Services.Users.UserServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace BE.Application.Services.Users
{
    public class UserService : BaseService, IUserService
    {
        private readonly IValidator<CreateUserInputDto> createUserValidator;
        private readonly IValidator<UpadteUserInputDto> updateUserValidator;
        private readonly IValidator<ActiveUserInputDto> activeUserValidator;


        public UserService(IUnitOfWork unitOfWork, IUser user,
            IValidator<CreateUserInputDto> createUserValidator,
            IValidator<UpadteUserInputDto> updateUserValidator,
            IValidator<ActiveUserInputDto> activeUserValidator
            ) : base(unitOfWork, user)
        {
            this.createUserValidator = createUserValidator;
            this.updateUserValidator = updateUserValidator;
            this.activeUserValidator = activeUserValidator;

        }

        public async Task<ResultService> ActiveUserAsync(ActiveUserInputDto inputDto)
        {
            await activeUserValidator.ValidateAsync(inputDto);
            var user = await unitOfWork.UserRepository.GetsUserByUserIDAsync(inputDto.Id);
            if (user == null)
            {
                return new ResultService
                {
                    StatusCode = HttpStatusCode.NotFound.ToString(),
                    Message = "User not found"
                };
            }
            else
            {
                user.IsActive = inputDto.IsActive;
                await unitOfWork.UserRepository.UpdateAsync(user);
                await unitOfWork.SaveChangesAsync();
                return new ResultService
                {
                    StatusCode = HttpStatusCode.OK.ToString(),
                    Message = "Success"
                };
            }
        }

        public async Task<ResultService> CreateAsync(CreateUserInputDto inputDto)
        {
            await createUserValidator.ValidateAndThrowAsync(inputDto);
            var r = await unitOfWork.UserRepository.GetsUserByUserNameAsync(inputDto.UserName);
            if (r == null)
            {
                var user = inputDto.ToEntity();
                user.Id = new Guid();
                user.Password = AuthenExtention.HashPassword(user.Password!);
                var userRoles = new List<UserRole>();
                userRoles.Add(new UserRole() { UserId = user.Id, RoleId = Guid.Parse("dae936b7-3505-4c7e-813a-9221e658be61") });
                user.UserRoles = userRoles;
                await unitOfWork.UserRepository.AddAsync(user);
                await unitOfWork.SaveChangesAsync();

                return new ResultService
                {
                    StatusCode = HttpStatusCode.Created.ToString(),
                    Message = "Success"
                };
            }
            else
            {
                return new ResultService
                {
                    StatusCode = HttpStatusCode.BadRequest.ToString(),
                    Message = "Failed to create! Username already exists"
                };
            }
        }
        public async Task<ResultService> GetUserByNameAsync(FindUserInputDto inputDto)
        {
            var r = await unitOfWork.UserRepository.GetsUserByUserNameAsync(inputDto.UserName);
            if (r != null)
            {
                var data = UserExtention.FindUser(r);
                return new ResultService
                {
                    StatusCode = HttpStatusCode.OK.ToString(),
                    Message = "Success",
                    Datas = data
                };
            }
            else
            {
                return new ResultService
                {
                    StatusCode = HttpStatusCode.NotFound.ToString(),
                    Message = "Success",
                };
            }
        }

        public async Task<ResultService> GetListUserAsync(GetListUserInputDto inputDto)
        {
            var r = unitOfWork.UserRepository.GetAll();

            var query = r.Filter(inputDto.FullName, u => u.FullName.Contains(inputDto.FullName))
                        .Filter(inputDto.Email, e => e.Email.Contains(inputDto.Email))
                        .Filter(inputDto.PhoneNumber, p => p.PhoneNumber.Contains(inputDto.PhoneNumber))
                        .Filter(inputDto.Address, ad => ad.Address.Contains(inputDto.Address))
                        .Filter(inputDto.Gender, g => g.Gender == (inputDto.Gender.ToString().ToLower() == "male" ? true : false))
                        .Filter(inputDto.DateOfBirth.ToString(), dob => dob.DateOfBirth.Date == inputDto.DateOfBirth.Value.Date);

            var res = await query.OrderBy(inputDto.OrderBy, inputDto.OrderByDesc)
                                    .ThenBy(inputDto.ThenBy, inputDto.ThenByDesc)
                                    .ToPageList(inputDto)
                                    .ToPageResult(await query.CountAsync(), inputDto, u => UserExtention.GetListUser(u));
            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Success",
                Datas = res
            };
        }

        public async Task<ResultService> UpadteUserAsync(UpadteUserInputDto inputDto)
        {
            await updateUserValidator.ValidateAndThrowAsync(inputDto);
            var r = await unitOfWork.UserRepository.GetsUserByUserIDAsync(inputDto.Id);

            if (r == null)
            {
                return new ResultService
                {
                    StatusCode = HttpStatusCode.NotFound.ToString(),
                    Message = "User not found",
                };
            }
            else
            {
                UserExtention.updateuser(inputDto, r);
                await unitOfWork.UserRepository.UpdateAsync(r);
                await unitOfWork.SaveChangesAsync();
                return new ResultService
                {
                    StatusCode = HttpStatusCode.OK.ToString(),
                    Message = "Success",
                };
            }
        }
    }
}
