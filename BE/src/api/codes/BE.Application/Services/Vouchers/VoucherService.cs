using AutoMapper;
using BE.Application.Abstractions;
using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Common.Dtos;
using BE.Application.Common.Results;
using BE.Application.Services.Vouchers.VoucherServiceInputDto;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
using FluentValidation;
using System.Net;

namespace BE.Application.Services.Vouchers
{
    public class VoucherService : BaseService, IVoucherService
    {
        private readonly IValidator<CreateVoucherInputDto> _createValidator;
        private readonly IValidator<UpdateVoucherInputDto> _updateValidator;
        private readonly IMapper _mapper;

        public VoucherService(
            IUnitOfWork unitOfWork,
            IUser user,
            IMapper mapper,
            IValidator<CreateVoucherInputDto> createValidator,
            IValidator<UpdateVoucherInputDto> updateValidator)
            : base(unitOfWork, user)
        {
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _mapper = mapper;
        }

        public async Task<ResultService> CreateVoucherAsync(CreateVoucherInputDto inputDto)
        {
            await _createValidator.ValidateAndThrowAsync(inputDto);

            var voucher = _mapper.Map<Voucher>(inputDto);
            voucher.DiscountType = inputDto.DiscountType;
            await unitOfWork.VoucherRepository.AddAsync(voucher);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.Created,
                Message = "Voucher created successfully."
            };
        }

        public async Task<ResultService> DeleteVoucherAsync(Guid voucherId)
        {
            var voucher = await unitOfWork.VoucherRepository.FindByIdAsync(voucherId);
            if (voucher == null)
                return new ResultService { StatusCode = (int)HttpStatusCode.NotFound, Message = "Voucher not found." };

            await unitOfWork.VoucherRepository.DeleteAsync(voucher);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Voucher deleted successfully."
            };
        }

        public async Task<ResultService> GetAllVouchersAsync()
        {
            var vouchers = await unitOfWork.VoucherRepository.GetAll().ToListAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Vouchers retrieved successfully.",
                Datas = vouchers.Select(v => _mapper.Map<VoucherDto>(v)).ToList()
            };
        }

        public async Task<ResultService> GetVoucherByIdAsync(Guid voucherId)
        {
            var voucher = await unitOfWork.VoucherRepository.FindByIdAsync(voucherId);
            if (voucher == null)
                return new ResultService { StatusCode = (int)HttpStatusCode.NotFound, Message = "Voucher not found." };

            var voucherDto = _mapper.Map<VoucherDto>(voucher);

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Voucher retrieved successfully.",
                Datas = voucherDto
            };
        }

        public async Task<ResultService> UpdateVoucherAsync(UpdateVoucherInputDto inputDto, Guid voucherId)
        {
            await _updateValidator.ValidateAndThrowAsync(inputDto);

            var voucher = await unitOfWork.VoucherRepository.FindByIdAsync(voucherId);
            if (voucher == null)
                return new ResultService { StatusCode = (int)HttpStatusCode.NotFound, Message = "Voucher not found." };

            _mapper.Map(inputDto, voucher);

            await unitOfWork.VoucherRepository.UpdateAsync(voucher);
            await unitOfWork.SaveChangesAsync();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Voucher updated successfully."
            };
        }
    }
}
