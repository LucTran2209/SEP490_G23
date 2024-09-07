namespace BE.Domain.Abstractions.UnitOfWork
{
    public interface IUnitOfWork
    {     
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        Task BeginTransactionAsync();

        Task CommitTransactionAsync();

        void RollBack();
    }
}
