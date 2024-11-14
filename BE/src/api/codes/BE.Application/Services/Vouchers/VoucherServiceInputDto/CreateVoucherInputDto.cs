using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Application.Services.Vouchers.VoucherServiceInputDto
{
    public class CreateVoucherInputDto
    {
        public Guid ShopId { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }
        public DiscountType DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal? MinimumSpend { get; set; }
        public decimal? MaximumDiscount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int? UsageLimit { get; set; }
        public bool IsActive { get; set; } = true;
    }
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateVoucherInputDto, Voucher>();
            CreateMap<UpdateVoucherInputDto, Voucher>();
        }
    }
}
