using BE.Application.Services.Statisticals.StatisticalServiceInputDto;

namespace BE.Application.Services.Statisticals
{
    public class StatisticalService : BaseService, IStatisticalService
    {
        private readonly IValidator<StatisticalTop10ProductInputDto> validator;
        public StatisticalService(IUnitOfWork unitOfWork, IUser user, IValidator<StatisticalTop10ProductInputDto> validator) : base(unitOfWork, user)
        {
            this.validator = validator;
        }

        public async Task<ResultService> StatisticalTop10ProductAsync(StatisticalTop10ProductInputDto inputDto)
        {
            await validator.ValidateAndThrowAsync(inputDto);
            var query = unitOfWork.StatisticalRepository.GetByRentalIdAsync();

            query = query
                .Filter(inputDto.StartDate?.ToString(), rs => rs.Order.EndDate >= inputDto.StartDate)
                .Filter(inputDto.EndDate?.ToString(), rs => rs.Order.EndDate <= inputDto.EndDate)
                .Filter(inputDto.UserId.ToString(), rs => rs.Order.UserId == inputDto.UserId);

            // Thực hiện thống kê và tính toán top 10 sản phẩm
            var productStatistics = await query
                .GroupBy(od => od.ProductId) // Gom nhóm theo ProductId
                .Select(g => new
                {
                    ProductId = g.Key,
                    ProductName = g.FirstOrDefault()!.Product.ProductName,
                    TotalQuantity = g.Sum(od => od.Quantity) // Tổng số lượng được mua
                })
                .OrderByDescending(g => g.TotalQuantity) // Sắp xếp giảm dần theo tổng số lượng
                .Take(10) // Lấy top 10 sản phẩm
                .ToListAsync();

            // Chuyển đổi kết quả sang DTO
            var resultDto = productStatistics.Select(p => new
            {
                p.ProductId,
                p.ProductName,
                p.TotalQuantity
            }).ToList();

            // Trả về kết quả
            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = resultDto // Danh sách thống kê
            };
        }
    }
}
