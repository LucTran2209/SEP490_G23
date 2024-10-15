namespace BE.Domain.Interfaces
{
    public interface IUser
    {
        public Guid? Id { get;}
        public string? UserName { get;}
        public string? FullName { get;}
    }
}
