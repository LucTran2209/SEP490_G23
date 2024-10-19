using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Interfaces;
using BE.Infrastructure.Repositories;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;
using System.Security.Claims;

namespace BE.Infrastructure.Common
{
    public class UnitOfWork : IUnitOfWork , IDisposable
    {
        private readonly ApplicationDbContext context;
        //private readonly ClaimsPrincipal claimsPrincipal;
        private IDbContextTransaction? _currentTransaction;
        public IDbContextTransaction? GetCurrentTransaction()
        {
            return _currentTransaction;
        }

        public UnitOfWork(ApplicationDbContext context)
        {
            this.context = context;          
        }

        // Interface Repository
        public IUserRepository userRepository;
        public IUserRepository UserRepository => userRepository = new UserRepository(context);

        public IProductRepository productRepository;

        public IProductRepository ProductRepository => productRepository = new ProductRepository(context);

        public IRentalShopRepository rentalShopRepository;

        public IRentalShopRepository RentalShopRepository => rentalShopRepository = new RentalShopRepository(context);
     
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
                            added.CreatedDate = DateTime.UtcNow;
                        }

                        if (entry.Entity is IUserTracking hasTrace)
                        {
                            hasTrace.CreatedBy = new Guid(); //this.claimsPrincipal.GetUserId();
                            hasTrace.CreatedByName = "Admin"; //this.claimsPrincipal.GetUserName();
                        }

                        break;
                    case EntityState.Modified:
                        if (entry.Entity is EntityAuditBase modified)
                        {
                            modified.LastModifiedDate = DateTime.UtcNow;
                        }

                        if (entry.Entity is IUserTracking trace)
                        {
                            trace.ModifiedBy = new Guid(); //claimsPrincipal.GetUserId();
                            trace.ModifiedByName = "Admin"; // claimsPrincipal.GetUserName();
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
