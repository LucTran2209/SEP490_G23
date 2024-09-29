using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Extensions;
using BE.Application.Services.Users.UserServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities.Users;
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

        public async Task UpdateRefeshToken(User user)
        {
            unitOfWork.UserRepository.Update(user);

            await unitOfWork.SaveChangesAsync();
        }
    }
}
