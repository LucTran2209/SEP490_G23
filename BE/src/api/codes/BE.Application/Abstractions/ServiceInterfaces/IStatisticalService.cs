using BE.Application.Services.Statisticals.StatisticalServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IStatisticalService
    {
        Task<ResultService> StatisticalTop10ProductAsync(StatisticalTop10ProductInputDto inputDto);
        Task<ResultService> GetStatisticProductAsync(StatisticalTop10ProductInputDto inputDto);
        Task<ResultService> GetStatistic12MonthAsync(Guid rentalShopId);
        Task<ResultService> GetRequestStatusStatisticsByMonthAsync(Guid rentalShopId);
    }
}
