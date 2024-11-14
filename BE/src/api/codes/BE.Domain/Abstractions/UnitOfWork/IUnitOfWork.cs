using BE.Domain.Interfaces;

namespace BE.Domain.Abstractions.UnitOfWork
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository { get; }

        public IProductRepository ProductRepository { get; }
        public IProductImageRepository ProductImageRepository { get; }
        public IRentalShopRepository RentalShopRepository { get; }
        public IOrderRepository OrderRepository { get; }
        public IOrderDeatilRepository OrderDeatilRepository { get; }
        public IOrderStatusRepository OrderStatusRepository { get; }
        public IFeedbackRepository FeedbackRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public ISubCategoryRepository SubCategoryRepository { get; }
        public IVoucherRepository VoucherRepository { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        Task BeginTransactionAsync();

        Task CommitTransactionAsync();

        void RollBack();
    }
}
