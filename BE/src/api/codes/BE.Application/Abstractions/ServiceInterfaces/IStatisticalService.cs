using BE.Application.Services.Statisticals.StatisticalServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IStatisticalService
    {
        Task<ResultService> StatisticalTop10SubProductAsync(StatisticalTop10ProductInputDto inputDto);
        Task<ResultService> GetStatisticProductAsync(StatisticalTop10ProductInputDto inputDto);
        Task<ResultService> GetStatisticTable2MAsync(StatisticalTop10ProductInputDto inputDto);
        Task<ResultService> GetStatisticTable2WAsync(StatisticalTop10ProductInputDto inputDto);
        Task<ResultService> GetStatisticTable3Async(StatisticalTop10ProductInputDto inputDto);
    }
}
