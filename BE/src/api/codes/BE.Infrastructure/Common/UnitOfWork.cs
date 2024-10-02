using BE.Domain.Abstractions;
using BE.Domain.Abstractions.IEntities;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Domain.Entities.Users;
using BE.Infrastructure.Repositories;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;
using System.Security.Claims;

namespace BE.Infrastructure.Common
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ApplicationDbContext context;
        private IDbContextTransaction? _currentTransaction;
        private readonly IUser _user;
        public IDbContextTransaction? GetCurrentTransaction()
        {
            return _currentTransaction;
        }

        public UnitOfWork(ApplicationDbContext context, IUser user)
        {
            this.context = context;
            this._user = user;
        }

        // Interface Repository
        public IUserRepository userRepository;
        public IUserRepository UserRepository => userRepository = new UserRepository(context);

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

                        if (entry.Entity is IUserTracking<Guid> hasTrace)
                        {
                            hasTrace.CreatedBy = _user.Id ?? Guid.Empty; //this.claimsPrincipal.GetUserId();
                            hasTrace.CreatedByName = _user.UserName; //this.claimsPrincipal.GetUserName();
                        }



                        break;
                    case EntityState.Modified:
                        if (entry.Entity is EntityAuditBase modified)
                        {
                            modified.LastModifiedDate = DateTime.UtcNow;
                        }

                        if (entry.Entity is IUserTracking<Guid> trace)
                        {
                            trace.ModifiedBy = _user.Id ?? Guid.Empty; //claimsPrincipal.GetUserId();
                            trace.ModifiedByName = _user.UserName; // claimsPrincipal.GetUserName();
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
