using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Services.Users.UserServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using FluentValidation;
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

        public async Task<ResultService> FindUserAsync(FindUserInputDto inputDto)
        {
            var r = unitOfWork.UserRepository.GetByName(inputDto.UserName);

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Success",
                Datas = r
            };
        }

        public async Task<ResultService> GetListUserAsync(GetListUserInputDto inputDto)
        {
            var r = unitOfWork.UserRepository.GetAllUser();
            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Success",
                Datas = r
            };
        }

        public async Task<ResultService> UpadteUserAsync(UpadteUserInputDto inputDto)
        {
            var r = unitOfWork.UserRepository.GetByName(inputDto.UserName);
            r = inputDto.updateuser();
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
