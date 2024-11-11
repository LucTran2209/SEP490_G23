using BE.Application.Services.RentalShops.RentalShopServiceInputDto;
using BE.Application.Services.RentalShops.RentalShopServiceOutputDto;

namespace BE.Application.Services.RentalShops
{
    public class RentalShopService : BaseService, IRentalShopService
    {
        private readonly IValidator<CreateRentalShopInputDto> createValidator;
        private readonly IValidator<UpdateRentalShopInputDto> updateValidator;
        private readonly IValidator<ActiveRentalShopInputDto> statusValidator;
        private readonly IValidator<ActivityRentalShopInputDto> activityValidator;
        private readonly IMapper _mapper;
        private readonly IAzureService _azureService;

        public RentalShopService(
            IUnitOfWork unitOfWork,
            IUser user, IMapper mapper,
            IValidator<CreateRentalShopInputDto> createValidator,
            IValidator<UpdateRentalShopInputDto> updateValidator,
            IValidator<ActiveRentalShopInputDto> statusValidator,
            IValidator<ActivityRentalShopInputDto> activityValidator,
            IAzureService azureService)
            : base(unitOfWork, user)
        {
            this.createValidator = createValidator;
            this.updateValidator = updateValidator;
            this.statusValidator = statusValidator;
            this.activityValidator = activityValidator;
            _mapper = mapper;
            _azureService = azureService;
        }

        public async Task<ResultService> CreateAsync(CreateRentalShopInputDto inputDto)
        {
            await createValidator.ValidateAndThrowAsync(inputDto);

            var rentalShop = _mapper.Map<RentalShop>(inputDto);

            rentalShop.ImageFont = await _azureService.UpLoadFileAsync(inputDto.ImageFont!);
            rentalShop.ImageBack = await _azureService.UpLoadFileAsync(inputDto.ImageBack!);
            rentalShop.BusinessLicenseFile = await _azureService.UpLoadFileAsync(inputDto.BusinessLicenseFile!);

            await unitOfWork.RentalShopRepository.AddAsync(rentalShop);

            await unitOfWork.UserRepository.AddRole(new UserRole { UserId = (Guid)user.Id!, RoleId = Guid.Parse("61e16e2c-3899-4357-b5c6-a57a615bd8ff") });

            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.Created,
                Message = "Rental shop created successfully."
            };
        }

        public async Task<ResultService> UpdateAsync(UpdateRentalShopInputDto inputDto, Guid id)
        {
            await updateValidator.ValidateAndThrowAsync(inputDto);

            var rentalShop = await unitOfWork.RentalShopRepository.FindByIdAsync(id);
            if (rentalShop == null)
                return new ResultService { StatusCode = (int)HttpStatusCode.NotFound, Message = "Rental shop not found." };

            rentalShop.ShopName = inputDto.ShopName;
            rentalShop.Email = inputDto.Email;
            rentalShop.PhoneNumber = inputDto.PhoneNumber;
            rentalShop.Address = inputDto.Address;
            rentalShop.Description = inputDto.Description;
            rentalShop.Status = inputDto.Status;
            rentalShop.IsActive = inputDto.IsActive;
            await unitOfWork.RentalShopRepository.UpdateAsync(rentalShop);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Rental shop updated successfully."
            };
        }

        public async Task<ResultService> DeleteAsync(Guid id)
        {
            var rentalShop = await unitOfWork.RentalShopRepository.FindByIdAsync(id);

            if (rentalShop == null)
                return new ResultService { StatusCode = (int)HttpStatusCode.NotFound, Message = "Rental shop not found." };

            await unitOfWork.RentalShopRepository.DeleteAsync(rentalShop);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
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
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = rentalShops
            };
        }

        public async Task<ResultService> GetRentalShopDetailByIdAsync(Guid id)
        {
            var rentalShop = await unitOfWork.RentalShopRepository.GetRentalShopByIdAsync(id);

            if (rentalShop == null)
            {
                return new ResultService
                {
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Message = "Rental shop not found."
                };
            }

            var result = _mapper.Map<GetRentalShopDetailByIdOuputDto>(rentalShop);

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Rental shop detail retrieved successfully.",
                Datas = result
            };
        }

        public async Task<ResultService> GetRentalShopByNotActiveAsync(Guid id)
        {
            var rentalShop = await unitOfWork.RentalShopRepository.GetRentalShopByNotActiveAsync(id);
            if (rentalShop == null)
            {
                return new ResultService
                {
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Message = "Not have rental shop application."
                };
            }
            var result = _mapper.Map<GetRentalShopDetailByIdOuputDto>(rentalShop);

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Rental shop detail retrieved successfully.",
                Datas = result
            };
        }

        public async Task<ResultService> GetAllRentalShopByNotActiveAsync()
        {
            var rentalShop = await unitOfWork.RentalShopRepository.GetAllRentalShopByNotActiveAsync();
            if (rentalShop == null)
            {
                return new ResultService
                {
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Message = "Not have rental shop application."
                };
            }
            var result = _mapper.Map<GetRentalShopDetailByIdOuputDto>(rentalShop);

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Rental shop detail retrieved successfully.",
                Datas = result
            };
        }

        public async Task<ResultService> ActiveRentalShopAsync(ActiveRentalShopInputDto input)
        {
            await statusValidator.ValidateAndThrowAsync(input);
            var rentalShop = await unitOfWork.RentalShopRepository.GetRentalShopByNotActiveAsync(input.Id);
            if (rentalShop == null)
            {
                return new ResultService
                {
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Message = "Not have rental shop application."
                };
            }
            rentalShop.Status = input.Status;
            await unitOfWork.RentalShopRepository.UpdateAsync(rentalShop);
            await unitOfWork.SaveChangesAsync();
            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "successfully.",
            };
        }
        public async Task<ResultService> ActivityRentalShopAsync(ActivityRentalShopInputDto input)
        {
            await activityValidator.ValidateAndThrowAsync(input);
            var rentalShop = await unitOfWork.RentalShopRepository.GetRentalShopByNotActiveAsync(input.Id);
            if (rentalShop == null)
            {
                return new ResultService
                {
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Message = "Not have rental shop application."
                };
            }
            rentalShop.IsActive = input.IsActive;
            await unitOfWork.RentalShopRepository.UpdateAsync(rentalShop);
            await unitOfWork.SaveChangesAsync();
            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "successfully.",
            };
        }
    }
}