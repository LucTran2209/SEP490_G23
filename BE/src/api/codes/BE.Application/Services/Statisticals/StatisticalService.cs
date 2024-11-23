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

        public async Task<ResultService> GetStatisticTable3Async(StatisticalTop10ProductInputDto inputDto)
        {
            await validator.ValidateAndThrowAsync(inputDto);
            var startDate = inputDto.StartDate.Value;
            var endDate = inputDto.EndDate.Value;

            // Chuyển đổi sang tháng và năm
            var startMonth = startDate.Month;
            var startYear = startDate.Year;
            var endMonth = endDate.Month;
            var endYear = endDate.Year;

            // Danh sách các tháng trong khoảng từ start đến end
            var allMonths = Enumerable.Range(0, ((endYear - startYear) * 12) + endMonth - startMonth + 1)
                .Select(i => new
                {
                    Month = new DateTime(startYear, startMonth, 1).AddMonths(i).Month,
                    Year = new DateTime(startYear, startMonth, 1).AddMonths(i).Year,
                    WaitingForConfirm = 0,
                    InProgress = 0,
                    Completed = 0,
                    Cancelled = 0
                })
                .ToList();

            var query = unitOfWork.StatisticalRepository.GetByRentalIdAsync();

            // Lọc dữ liệu theo khoảng thời gian và RentalShopId
            query = query
                        .Where(rs => rs.Order.StartDate <= endDate && rs.Order.EndDate >= startDate) // Bao gồm đơn hàng có giao thoa
                        .Where(rs => rs.Product.RentalShopId == inputDto.RentaiShopId);

            // Thống kê trạng thái theo tháng
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
                .OrderBy(m => m.Year).ThenBy(m => m.Month) // Sắp xếp theo năm và tháng
                .ToList();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = mergedStatistics // Trả về dữ liệu thống kê
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

        public async Task<ResultService> StatisticalTop10SubProductAsync(StatisticalTop10ProductInputDto inputDto)
        {
            await validator.ValidateAndThrowAsync(inputDto);
            var query = unitOfWork.StatisticalRepository.GetByRentalIdAsync();

            query = query
                .Filter(inputDto.StartDate?.ToString(), rs => rs.Order.EndDate >= inputDto.StartDate)
                .Filter(inputDto.EndDate?.ToString(), rs => rs.Order.EndDate <= inputDto.EndDate)
                .Filter(inputDto.RentaiShopId.ToString(), rs => rs.Product.RentalShopId == inputDto.RentaiShopId);

            // Thống kê top 10 SubCategory
            var subCategoryStatistics = await query
                .GroupBy(od => od.Product.SubCategoryId) // Gom nhóm theo SubCategoryId
                .Select(g => new
                {
                    SubCategoryId = g.Key,
                    SubCategoryName = g.FirstOrDefault()!.Product.SubCategory.SubCategoryName,
                    TotalQuantity = g.Sum(od => od.Quantity) // Tổng số lượng được mua cho SubCategory
                })
                .OrderByDescending(g => g.TotalQuantity) // Sắp xếp giảm dần theo tổng số lượng
                .Take(10) // Lấy top 10 SubCategory
                .ToListAsync();

            // Chuyển đổi kết quả sang DTO
            var resultDto = subCategoryStatistics.Select(sc => new
            {
                sc.SubCategoryId,
                sc.SubCategoryName,
                sc.TotalQuantity
            }).ToList();

            // Trả về kết quả
            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = resultDto // Danh sách thống kê
            };
        }

        public async Task<ResultService> GetStatisticTable2MAsync(StatisticalTop10ProductInputDto inputDto)
        {
            await validator.ValidateAndThrowAsync(inputDto);
            // Xác định khoảng thời gian dựa trên input StartDate và EndDate
            var startDate = inputDto.StartDate.Value;
            var endDate = inputDto.EndDate.Value;

            // Tạo danh sách các tháng trong khoảng thời gian đã cho
            var allMonths = Enumerable.Range(0, (endDate.Year - startDate.Year) * 12 + endDate.Month - startDate.Month + 1)
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
                .Where(rs => rs.Product.RentalShopId == inputDto.RentaiShopId); // Lọc theo RentalShopId

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

            // Kết hợp dữ liệu thống kê với danh sách các tháng trong khoảng thời gian đã cho
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
                Datas = mergedStatistics // Trả về danh sách các tháng trong khoảng thời gian
            };
        }

        public async Task<ResultService> GetStatisticTable2WAsync(StatisticalTop10ProductInputDto inputDto)
        {
            await validator.ValidateAndThrowAsync(inputDto);
            var startDate = inputDto.StartDate.Value;
            var endDate = inputDto.EndDate.Value;

            // Tạo danh sách tất cả các tuần trong khoảng thời gian đã cho
            var allWeeks = GetWeeksInRange(startDate, endDate);

            var query = unitOfWork.StatisticalRepository.GetByRentalIdAsync()
                .Where(rs => rs.Order.EndDate >= startDate && rs.Order.EndDate <= endDate)
                .Where(rs => rs.Product.RentalShopId == inputDto.RentaiShopId);

            // Lấy data từ db
            var orderDetails = await query.ToListAsync();

            // Tính toán doanh thu và số giao dịch theo tuần
            var revenueStatistics = orderDetails
                .GroupBy(od => new
                {
                    Week = GetWeekOfYear(od.Order.EndDate), // Tính tuần từ ngày kết thúc của đơn hàng
                    Year = od.Order.EndDate.Year
                })
                .Select(g => new
                {
                    Week = g.Key.Week,
                    Year = g.Key.Year,
                    TotalRevenue = g.Sum(od => od.Quantity * od.Product.RentalPrice), // Tính tổng doanh thu
                    TransactionCount = g.Select(od => od.OrderId).Distinct().Count()  // Đếm số giao dịch
                })
                .ToList();

            // Kết hợp tất cả các tuần với thống kê doanh thu
            var mergedStatistics = allWeeks
                .Select(aw => new
                {
                    aw.Week,
                    aw.Year,
                    TotalRevenue = revenueStatistics.FirstOrDefault(rs => rs.Week == aw.Week && rs.Year == aw.Year)?.TotalRevenue ?? 0M, // Nếu không có doanh thu cho tuần đó, gán 0
                    TransactionCount = revenueStatistics.FirstOrDefault(rs => rs.Week == aw.Week && rs.Year == aw.Year)?.TransactionCount ?? 0  // Nếu không có giao dịch, gán 0
                })
                .OrderBy(m => m.Year).ThenBy(m => m.Week)
                .ToList();

            return new ResultService
            {
                StatusCode = (int)HttpStatusCode.OK,
                Message = "Success",
                Datas = mergedStatistics
            };
        }
        private int GetWeekOfYear(DateTime date)
        {
            var firstDayOfYear = new DateTime(date.Year, 1, 1);
            var days = (date - firstDayOfYear).Days;
            return (days / 7) + 1;
        }
        private List<dynamic> GetWeeksInRange(DateTime startDate, DateTime endDate)
        {
            var weeks = new List<dynamic>();

            var currentDate = startDate;
            while (currentDate <= endDate)
            {
                var week = new
                {
                    Week = GetWeekOfYear(currentDate),
                    Year = currentDate.Year
                };
                weeks.Add(week);
                currentDate = currentDate.AddDays(7); // Tăng thêm 7 ngày để di chuyển sang tuần kế tiếp
            }

            return weeks;
        }
    }
}