namespace BE.Application.Services.Statisticals.StatisticalServiceInputDto
{
    public class StatisticalTop10ProductInputDto
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Guid UserId { get; set; }
    }
}
