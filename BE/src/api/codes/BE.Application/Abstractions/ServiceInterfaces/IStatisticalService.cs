using BE.Application.Services.Statisticals.StatisticalServiceInputDto;

namespace BE.Application.Abstractions.ServiceInterfaces
{
    public interface IStatisticalService
    {
        Task<ResultService> StatisticalTop10ProductAsync(StatisticalTop10ProductInputDto inputDto);
    }
}
