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

        public async Task<ResultService> GetRequestStatusStatisticsByMonthAsync(Guid rentalShopId)
        {
            // Thống kê trạng thái theo tháng
            var now = DateTime.UtcNow;
            var startDate = new DateTime(now.Year, now.Month, 1).AddMonths(-11); // Ngày đầu tiên của 12 tháng trước
            var endDate = new DateTime(now.Year, now.Month, 1).AddMonths(1).AddDays(-1); // Ngày cuối cùng của tháng hiện tại

            var allMonths = Enumerable.Range(0, 12)
                .Select(i => new
                {
                    Month = startDate.AddMonths(i).Month,
                    Year = startDate.AddMonths(i).Year,
                    WaitingForConfirm = 0,
                    InProgress = 0,
                    Completed = 0,
                    Cancelled = 0
                })
                .ToList();

            var query = unitOfWork.StatisticalRepository.GetByRentalIdAsync();

            query = query
                .Where(rs => rs.Order.EndDate >= startDate) // Lọc theo ngày bắt đầu
                .Where(rs => rs.Order.EndDate <= endDate)   // Lọc theo ngày kết thúc
                .Where(rs => rs.Product.RentalShopId == rentalShopId); // Lọc theo RentalShopId

            var statusStatistics = await query
                .GroupBy(od => new
                {
                    Month = od.Order.EndDate.Month,
                    Year = od.Order.EndDate.Year
                })
                .Select(g => new
                {
                    Month = g.Key.Month,
                    Year = g.Key.Year,
                    WaitingForConfirm = g.Count(od => od.Order.OrderStatuses.Any(os => os.Status == RequestStatus.WaitingForConfirm)),
                    InProgress = g.Count(od => od.Order.OrderStatuses.Any(os =>
                        os.Status == RequestStatus.WaitingForDeposit ||
                        os.Status == RequestStatus.WaitingForTransit ||
                        os.Status == RequestStatus.Recieved ||
                        os.Status == RequestStatus.WaitingForReturn)),
                    Completed = g.Count(od => od.Order.OrderStatuses.Any(os => os.Status == RequestStatus.ReturnComplete)),
                    Cancelled = g.Count(od => od.Order.OrderStatuses.Any(os => os.Status == RequestStatus.Cancel))
                })
                .ToListAsync();

            // Kết hợp dữ liệu thống kê với danh sách đủ 12 tháng
            var mergedStatistics = allMonths
                .GroupJoin(
                    statusStatistics,
                    am => new { am.Month, am.Year },
                    ss => new { ss.Month, ss.Year },
                    (am, ssGroup) => new
                    {
                        am.Month,
                        am.Year,
                        WaitingForConfirm = ssGroup.FirstOrDefault()?.WaitingForConfirm ?? am.WaitingForConfirm,
                        InProgress = ssGroup.FirstOrDefault()?.InProgress ?? am.InProgress,
                        Completed = ssGroup.FirstOrDefault()?.Completed ?? am.Completed,
                        Cancelled = ssGroup.FirstOrDefault()?.Cancelled ?? am.Cancelled
                    }
                )
                .OrderBy(m => m.Year).ThenBy(m => m.Month)
                .ToList();

            // Trả về kết quả
            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = mergedStatistics
            };

        }

        public async Task<ResultService> GetStatistic12MonthAsync(Guid rentalShopId)
        {
            // Xác định khoảng thời gian 12 tháng gần nhất
            var now = DateTime.UtcNow;
            var startDate = new DateTime(now.Year, now.Month, 1).AddMonths(-11); // Ngày đầu tiên của 12 tháng trước
            var endDate = new DateTime(now.Year, now.Month, 1).AddMonths(1).AddDays(-1); // Ngày cuối cùng của tháng hiện tại

            // Tạo danh sách đủ 12 tháng với giá trị mặc định là 0
            var allMonths = Enumerable.Range(0, 12)
                .Select(i => new
                {
                    Month = startDate.AddMonths(i).Month,
                    Year = startDate.AddMonths(i).Year,
                    TotalRevenue = 0M, // Doanh thu mặc định là 0
                    TransactionCount = 0 // Số lượng giao dịch mặc định là 0
                })
                .ToList();

            var query = unitOfWork.StatisticalRepository.GetByRentalIdAsync();

            // Áp dụng bộ lọc theo khoảng thời gian và RentalShopId
            query = query
                .Where(rs => rs.Order.EndDate >= startDate) // Lọc theo ngày bắt đầu
                .Where(rs => rs.Order.EndDate <= endDate)   // Lọc theo ngày kết thúc
                .Where(rs => rs.Product.RentalShopId == rentalShopId); // Lọc theo RentalShopId

            // Thống kê doanh thu theo tháng
            var revenueStatistics = await query
                .GroupBy(od => new
                {
                    Month = od.Order.EndDate.Month,
                    Year = od.Order.EndDate.Year
                })
                .Select(g => new
                {
                    Month = g.Key.Month,
                    Year = g.Key.Year,
                    TotalRevenue = g.Sum(od => od.Quantity * od.Product.RentalPrice), // Tính tổng doanh thu
                    TransactionCount = g.Select(od => od.OrderId).Distinct().Count()  // Đếm số giao dịch
                })
                .ToListAsync();

            // Kết hợp dữ liệu thống kê với danh sách đủ 12 tháng
            var mergedStatistics = allMonths
                .GroupJoin(
                    revenueStatistics,
                    am => new { am.Month, am.Year },
                    rs => new { rs.Month, rs.Year },
                    (am, rsGroup) => new
                    {
                        am.Month,
                        am.Year,
                        TotalRevenue = rsGroup.FirstOrDefault()?.TotalRevenue ?? am.TotalRevenue,
                        TransactionCount = rsGroup.FirstOrDefault()?.TransactionCount ?? am.TransactionCount
                    }
                )
                .OrderBy(m => m.Year).ThenBy(m => m.Month)
                .ToList();

            // Trả về kết quả
            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = mergedStatistics // Trả về danh sách đầy đủ 12 tháng
            };
        }

        public async Task<ResultService> GetStatisticProductAsync(StatisticalTop10ProductInputDto inputDto)
        {
            await validator.ValidateAndThrowAsync(inputDto);
            var query = unitOfWork.StatisticalRepository.GetByRentalIdAsync();

            query = query
                .Filter(inputDto.StartDate?.ToString(), rs => rs.Order.EndDate >= inputDto.StartDate)
                .Filter(inputDto.EndDate?.ToString(), rs => rs.Order.EndDate <= inputDto.EndDate)
                .Filter(inputDto.RentaiShopId.ToString(), rs => rs.Product.RentalShopId == inputDto.RentaiShopId);

            // Thực hiện thống kê
            var statistics = await query
                .GroupBy(od => 1) // Gom nhóm tất cả để tính tổng
                .Select(g => new
                {
                    TotalProducts = g.Select(od => od.ProductId).Distinct().Count(), // Tổng số sản phẩm
                    TotalOrders = g.Select(od => od.OrderId).Distinct().Count(),     // Tổng số lượng đơn hàng
                    TotalRevenue = g.Sum(od => od.Quantity * od.Product.RentalPrice)      // Tổng doanh thu
                })
                .FirstOrDefaultAsync(); // Lấy kết quả

            // Kiểm tra kết quả thống kê
            if (statistics == null)
            {
                return new ResultService
                {
                    StatusCode = (int)HttpStatusCode.OK,
                    Message = "No data available",
                    Datas = new
                    {
                        TotalProducts = 0,
                        TotalOrders = 0,
                        TotalRevenue = 0M
                    }
                };
            }

            // Trả về kết quả
            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = new
                {
                    statistics.TotalProducts, // Tổng số sản phẩm
                    statistics.TotalOrders,   // Tổng số lượng đơn hàng
                    statistics.TotalRevenue   // Tổng doanh thu
                }
            };
        }

        public async Task<ResultService> StatisticalTop10ProductAsync(StatisticalTop10ProductInputDto inputDto)
        {
            await validator.ValidateAndThrowAsync(inputDto);
            var query = unitOfWork.StatisticalRepository.GetByRentalIdAsync();

            query = query
                .Filter(inputDto.StartDate?.ToString(), rs => rs.Order.EndDate >= inputDto.StartDate)
                .Filter(inputDto.EndDate?.ToString(), rs => rs.Order.EndDate <= inputDto.EndDate)
                .Filter(inputDto.RentaiShopId.ToString(), rs => rs.Product.RentalShopId == inputDto.RentaiShopId);

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