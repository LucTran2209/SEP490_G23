using BE.Domain.Entities.Users;

namespace BE.Domain.Abstractions.UnitOfWork
{
    public interface IUnitOfWork
    {     
        public IUserRepository UserRepository { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        Task BeginTransactionAsync();

        Task CommitTransactionAsync();

        void RollBack();
    }
}
