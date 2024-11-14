using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
    public class VoucherRepository : BaseRepository, IVoucherRepository
    {
        public VoucherRepository(ApplicationDbContext context) : base(context) { }

        public async Task<Voucher?> FindByIdAsync(Guid id)
        {
            return await context.Vouchers
                .Include(v => v.RentalShop) 
                .FirstOrDefaultAsync(v => v.Id == id);
        }

        public IQueryable<Voucher> GetAll()
        {
            return context.Vouchers.Include(v => v.RentalShop).AsQueryable();
        }

        public async Task AddAsync(Voucher entity)
        {
            await context.Vouchers.AddAsync(entity);
        }

        public Task UpdateAsync(Voucher entity)
        {
            context.Vouchers.Update(entity);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Voucher entity)
        {
            context.Vouchers.Remove(entity);
            return Task.CompletedTask;
        }
    }
}
