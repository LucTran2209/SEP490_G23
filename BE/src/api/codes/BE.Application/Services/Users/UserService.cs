using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Extensions;
using BE.Application.Services.Users.UserServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace BE.Application.Services.Users
{
    public class UserService : BaseService, IUserService
    {
        private readonly IValidator<CreateUserInputDto> createUserValidator;

        public UserService(IUnitOfWork unitOfWork, IValidator<CreateUserInputDto> createUserValidator) : base(unitOfWork)
        {
            this.createUserValidator = createUserValidator;
        }

        public async Task<ResultService> ActiveUser(ActiveUserInputDto inputDto)
        {
            var user = unitOfWork.UserRepository.GetByName(inputDto.UserName);
            user.IsActive = inputDto.IsActive;
            unitOfWork.UserRepository.Update(user);
            await unitOfWork.SaveChangesAsync();
            return new ResultService
            {
                StatusCode = HttpStatusCode.Created.ToString(),
                Message = "Success"
            };
        }

        public async Task<ResultService> CreateAsync(CreateUserInputDto inputDto)
        {
            await createUserValidator.ValidateAndThrowAsync(inputDto);

            var user = inputDto.ToEntity();
            user.Id = new Guid();
            unitOfWork.UserRepository.Insert(user);
            await unitOfWork.SaveChangesAsync();
            return new ResultService
            {
                StatusCode = HttpStatusCode.Created.ToString(),
                Message = "Success"
            };
        }

        public async Task<ResultService> FindUserAsync(FindUserInputDto inputDto)
        {
            var r = unitOfWork.UserRepository.GetByName(inputDto.UserName);
            var data = r.FindUser();
            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Success",
                Datas = data
            };
        }

        public async Task<ResultService> GetListUserAsync(GetListUserInputDto inputDto)
        {
            var r = unitOfWork.UserRepository.GetAll();

            var query = r.Filter(inputDto.FullName, u => u.FullName.Contains(inputDto.Search))
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
            var r = unitOfWork.UserRepository.GetByName(inputDto.UserName);
            UserExtention.updateuser(inputDto, r);
            unitOfWork.UserRepository.Update(r);
            await unitOfWork.SaveChangesAsync();
            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Success",

            };
        }
    }
}
