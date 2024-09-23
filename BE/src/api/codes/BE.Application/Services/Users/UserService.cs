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

        public async Task<ResultService> FillterUser(FilterUserInputDto inputDto)
        {
            var user = unitOfWork.UserRepository.GetAll().ToList();
            var query = user.AsQueryable();

            if (!string.IsNullOrEmpty(inputDto.FullName))
            {
                query = query.Where(u => u.FullName.Contains(inputDto.FullName));
            }
            if (!string.IsNullOrEmpty(inputDto.Email))
            {
                query = query.Where(u => u.Email.Contains(inputDto.Email));
            }

            if (!string.IsNullOrEmpty(inputDto.Address))
            {
                query = query.Where(u => u.Address.Contains(inputDto.Address));
            }
            if (inputDto.DateOfBirth != null)
            {
                query = query.Where(u => u.DateOfBirth.Equals(inputDto.DateOfBirth));
            }

            if (inputDto.Gender != null)
            {
                query = query.Where(u => u.Gender.Equals(inputDto.Gender));
            }

            var data = query.ToList();

            var result = UserExtention.GetFillterListUser(data);

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Success",
                Datas = result
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

        public async Task<ResultService> GetListUserAsync()
        {
            var r = unitOfWork.UserRepository.GetAll().ToList();
            var data = UserExtention.GetListUser(r);
            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Success",
                Datas = data
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
