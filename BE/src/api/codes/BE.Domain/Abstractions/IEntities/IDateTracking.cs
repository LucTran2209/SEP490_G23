namespace BE.Domain.Abstractions.IEntities
{
    public interface IDateTracking
    {
        DateTimeOffset CreatedDate { get; set; }
        DateTimeOffset? LastModifiedDate { get; set; }
    }
}
