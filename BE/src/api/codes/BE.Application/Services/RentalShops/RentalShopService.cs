using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Extensions;
using BE.Application.Services.RentalShops.RentalShopServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace BE.Application.Services.RentalShops
{
    public class RentalShopService : BaseService, IRentalShopService
    {
        private readonly IValidator<CreateRentalShopInputDto> createValidator;
        private readonly IValidator<UpdateRentalShopInputDto> updateValidator;

        public RentalShopService(IUnitOfWork unitOfWork, IUser user, IValidator<CreateRentalShopInputDto> createValidator, IValidator<UpdateRentalShopInputDto> updateValidator)
            : base(unitOfWork, user)
        {
            this.createValidator = createValidator;
            this.updateValidator = updateValidator;
        }

        public async Task<ResultService> CreateAsync(CreateRentalShopInputDto inputDto)
        {
            await createValidator.ValidateAndThrowAsync(inputDto);

            var rentalShop = inputDto.ToEntity();
            await unitOfWork.RentalShopRepository.AddAsync(rentalShop);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.Created.ToString(),
                Message = "Rental shop created successfully."
            };
        }

        public async Task<ResultService> UpdateAsync(UpdateRentalShopInputDto inputDto, Guid id)
        {
            await updateValidator.ValidateAndThrowAsync(inputDto);

            var rentalShop = await unitOfWork.RentalShopRepository.FindByIdAsync(id);
            if (rentalShop == null)
                return new ResultService { StatusCode = HttpStatusCode.NotFound.ToString(), Message = "Rental shop not found." };

            rentalShop.ShopName = inputDto.ShopName;
            rentalShop.Email = inputDto.Email;
            rentalShop.PhoneNumber = inputDto.PhoneNumber;
            rentalShop.Address = inputDto.Address;
            rentalShop.Description = inputDto.Description;
            rentalShop.IsActive = inputDto.IsActive;

            await unitOfWork.RentalShopRepository.UpdateAsync(rentalShop);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Rental shop updated successfully."
            };
        }

        public async Task<ResultService> DeleteAsync(Guid id)
        {
            var rentalShop = await unitOfWork.RentalShopRepository.FindByIdAsync(id);

            if (rentalShop == null)
                return new ResultService { StatusCode = HttpStatusCode.NotFound.ToString(), Message = "Rental shop not found." };

            await unitOfWork.RentalShopRepository.DeleteAsync(rentalShop);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Rental shop deleted successfully."
            };
        }

        public async Task<ResultService> GetListRentalShopAsync(GetListRentalShopInputDto inputDto)
        {
            var query = unitOfWork.RentalShopRepository.GetAll();
            query = query
                .Filter(inputDto.ShopName, rs => rs.ShopName.Contains(inputDto.ShopName ?? string.Empty))
                .Filter(inputDto.Email, rs => rs.Email.Contains(inputDto.Email ?? string.Empty))
                .Filter(inputDto.PhoneNumber, rs => rs.PhoneNumber.Contains(inputDto.PhoneNumber ?? string.Empty))
                .Filter(inputDto.Address, rs => rs.Address.Contains(inputDto.Address ?? string.Empty));

            var rentalShops = await query.OrderBy(inputDto.OrderBy, inputDto.OrderByDesc)
                .ThenBy(inputDto.ThenBy, inputDto.ThenByDesc)
                .ToPageList(inputDto)
                .ToPageResult(await query.CountAsync(), inputDto, rs => rs.ToListRentalShopOutput());

            return new ResultService
            {
                StatusCode = HttpStatusCode.OK.ToString(),
                Message = "Success",
                Datas = rentalShops
            };
        }


    }
}
