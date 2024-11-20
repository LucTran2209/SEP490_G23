using AutoMapper;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Results;
using BE.Application.Services.Vouchers.VoucherServiceInputDto;
using BE.Application.Services.Vouchers.VoucherServiceOutputDto;
using BE.Domain.Abstractions.UnitOfWork;
using System.Net;

namespace BE.Application.Services.Vouchers
{
    public class VoucherService : BaseService, IVoucherService
    {
        private readonly IMapper _mapper;
        private readonly IValidator<CreateVoucherInputDto> _createValidator;
        private readonly IValidator<UpdateVoucherInputDto> _updateValidator;

        public VoucherService(
            IUnitOfWork unitOfWork,
            IUser user,
            IMapper mapper,
            IValidator<CreateVoucherInputDto> createValidator,
            IValidator<UpdateVoucherInputDto> updateValidator)
        : base(unitOfWork, user)
        {
            _mapper = mapper;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
        }


        public async Task<ResultService> GetListVoucherAsync()
        {
            var vouchers = unitOfWork.VoucherRepository.GetAll();

            var voucherDtos = _mapper.ProjectTo<GetListVoucherOutputDto>(vouchers).ToList();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Vouchers retrieved successfully.",
                Datas = voucherDtos
            };
        }
        public async Task<ResultService> CreateVoucherAsync(CreateVoucherInputDto inputDto)
        {
            if (inputDto == null)
                throw new ArgumentNullException(nameof(inputDto));

            await _createValidator.ValidateAndThrowAsync(inputDto);

            var voucher = inputDto.ToEntity();
            await unitOfWork.VoucherRepository.AddAsync(voucher);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.Created,
                Message = "Voucher created successfully."
            };
        }

        public async Task<ResultService> UpdateVoucherAsync(Guid voucherId, UpdateVoucherInputDto inputDto)
        {
            // Validate DTO
            await _updateValidator.ValidateAndThrowAsync(inputDto);

            // Tìm voucher theo ID
            var voucher = await unitOfWork.VoucherRepository.FindByIdAsync(voucherId);
            if (voucher == null)
            {
                return new ResultService
                {
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Message = "Voucher not found."
                };
            }

            // Cập nhật voucher từ DTO
            voucher = inputDto.UpdateEntity(voucher);

            await unitOfWork.VoucherRepository.UpdateAsync(voucher);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Voucher updated successfully."
            };
        }


        public async Task<ResultService> DeactivateVoucherAsync(Guid voucherId)
        {
            var voucher = await unitOfWork.VoucherRepository.FindByIdAsync(voucherId);
            if (voucher == null)
            {
                return new ResultService
                {
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Message = "Voucher not found."
                };
            }

            voucher.IsActive = false;
            await unitOfWork.VoucherRepository.UpdateAsync(voucher);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Voucher deactivated successfully."
            };
        }

        public async Task<ResultService> DeleteVoucherAsync(Guid voucherId)
        {
            var voucher = await unitOfWork.VoucherRepository.FindByIdAsync(voucherId);
            if (voucher == null)
            {
                return new ResultService
                {
                    StatusCode = (int)HttpStatusCode.NotFound,
                    Message = "Voucher not found."
                };
            }

            await unitOfWork.VoucherRepository.DeleteAsync(voucher);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Voucher deleted successfully."
            };
        }

        public Task<ResultService> GetVoucherByIdAsync(Guid voucherId)
        {
            throw new NotImplementedException();
        }
    }
}
