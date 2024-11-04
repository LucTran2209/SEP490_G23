namespace BE.Domain.Abstractions.IEntities
{
    public interface IUserTracking
    {
        Guid? CreatedBy { get; set; }
        Guid? ModifiedBy { get; set; }
    }
}
