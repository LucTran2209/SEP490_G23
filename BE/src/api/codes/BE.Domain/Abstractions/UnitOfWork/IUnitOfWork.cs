using BE.Domain.Interfaces;

namespace BE.Domain.Abstractions.UnitOfWork
{
    public interface IUnitOfWork
    {     
        public IUserRepository UserRepository { get; }

        public IProductRepository ProductRepository { get; }
        public IRentalShopRepository RentalShopRepository { get; }

        public IFeedbackRepository FeedbackRepository { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        Task BeginTransactionAsync();

        Task CommitTransactionAsync();

        void RollBack();
    }
}
