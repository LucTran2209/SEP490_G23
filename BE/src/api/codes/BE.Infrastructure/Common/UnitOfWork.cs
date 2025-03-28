﻿using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Interfaces;
using BE.Infrastructure.Repositories;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;

namespace BE.Infrastructure.Common
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ApplicationDbContext context;
        private IDbContextTransaction? _currentTransaction;
        private readonly IUser user;
        public IDbContextTransaction? GetCurrentTransaction()
        {
            return _currentTransaction;
        }

        public UnitOfWork(ApplicationDbContext context, IUser user)
        {
            this.context = context;
            this.user = user;
        }

        // Interface Repository
        public IUserRepository userRepository;
        public IUserRepository UserRepository => userRepository = new UserRepository(context);

        public IProductRepository productRepository;

        public IProductRepository ProductRepository => productRepository = new ProductRepository(context);

        public IRentalShopRepository rentalShopRepository;

        public IRentalShopRepository RentalShopRepository => rentalShopRepository = new RentalShopRepository(context);

        public IFeedbackRepository feedbackRepository;
        public IFeedbackRepository FeedbackRepository => feedbackRepository = new FeedbackRepository(context);

        public IOrderRepository orderRepository;
        public IOrderRepository OrderRepository => orderRepository = new OrderRepository(context);

        public IOrderDeatilRepository orderDeatilRepository;
        public IOrderDeatilRepository OrderDeatilRepository => orderDeatilRepository = new OrderDetailRepository(context);

        public IOrderStatusRepository orderStatusRepository;
        public IOrderStatusRepository OrderStatusRepository => orderStatusRepository = new OrderStatusRepository(context);

        public ICategoryRepository categoryRepository;
        public ICategoryRepository CategoryRepository => categoryRepository = new CategoryRepository(context);

        public ISubCategoryRepository subCategoryRepository;
        public ISubCategoryRepository SubCategoryRepository => subCategoryRepository = new SubCategoryRepository(context);

        public IProductImageRepository productImageRepository;
        public IProductImageRepository ProductImageRepository => productImageRepository = new ProductImageRepository(context);

        public IRechargeHistoryRepository rechargeHistoryRepository;
        public IRechargeHistoryRepository RechargeHistoryRepository => rechargeHistoryRepository = new RechargeHistoryRepository(context);

        public IVoucherRepository voucherRepository;
        public IVoucherRepository VoucherRepository => voucherRepository = new VoucherRepository(context);
        public IStatisticalRepository statisticalRepository;
        public IStatisticalRepository StatisticalRepository => statisticalRepository = new StatisticalRepository(context);

        public async Task BeginTransactionAsync()
        {
            if (_currentTransaction == null)
            {
                _currentTransaction = await context.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted);
            }
        }

        public async Task CommitTransactionAsync()
        {
            if (_currentTransaction == null) throw new ArgumentNullException(nameof(this._currentTransaction));

            try
            {
                await SaveChangesAsync();
                await _currentTransaction.CommitAsync();
            }
            catch
            {
                RollBack();
                throw;
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        public void RollBack()
        {
            try
            {
                _currentTransaction?.Rollback();
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            this.BeforeSaveChanges();
            var result = await context.SaveChangesAsync(cancellationToken);
            //await mediator.DispatchDomainEvents(this);
            return result;
        }

        private void BeforeSaveChanges()
        {
            foreach (var entry in context.ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        if (entry.Entity is EntityAuditBase added)
                        {
                            added.CreatedDate = DateTime.Now;
                        }

                        if (entry.Entity is IUserTracking hasTrace)
                        {
                            try
                            {
                                hasTrace.CreatedBy = user.Id;
                            }
                            catch (Exception)
                            {
                                hasTrace.CreatedBy = Guid.Empty;
                            }

                        }

                        break;
                    case EntityState.Modified:
                        if (entry.Entity is EntityAuditBase modified)
                        {
                            modified.LastModifiedDate = DateTime.Now;
                        }

                        if (entry.Entity is IUserTracking trace)
                        {
                            try
                            {
                                trace.CreatedBy = user.Id;
                            }
                            catch (Exception)
                            {
                                trace.CreatedBy = Guid.Empty;
                            }
                        }

                        break;
                    case EntityState.Deleted:

                        if (entry.Entity is ISoftDelete hasIsDeleted)
                        {
                            hasIsDeleted.IsDeleted = true;
                            entry.State = EntityState.Modified;
                        }

                        break;
                    default:
                        break;
                }
            }
        }

        public async void Dispose() => await context.DisposeAsync();

    }
}
