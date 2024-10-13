namespace BE.Domain.Abstractions.IEntities
{
    public interface IUserTracking
    {
        Guid? CreatedBy { get; set; }
        string? CreatedByName { get; set; }
        Guid? ModifiedBy { get; set; }
        string? ModifiedByName { get; set; }
    }
}
