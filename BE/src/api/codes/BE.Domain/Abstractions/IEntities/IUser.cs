namespace BE.Domain.Abstractions.IEntities
{
    public interface IUser
    {
        public Guid? Id { get; }
        public string? UserName { get; }
    }
}
