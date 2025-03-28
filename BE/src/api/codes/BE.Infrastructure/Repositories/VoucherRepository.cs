﻿using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Infrastructure.Repositories
{
    public class VoucherRepository : BaseRepository, IVoucherRepository
    {
        public VoucherRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddAsync(Voucher entity)
        {
            await context.Vouchers.AddAsync(entity);
        }

        public async Task AddUserVoucherAsync(UserVoucher userVoucher)
        {
            await context.UserVouchers.AddAsync(userVoucher);
        }

        public Task DeleteAsync(Voucher entity)
        {
            context.Vouchers.Remove(entity);
            return Task.CompletedTask;
        }

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

        public IQueryable<Voucher>? GetListVoucherByRentalShopId(Guid rentalShopId)
        {
            var vouchers = context.Vouchers.Where(v => v.ShopId == rentalShopId).AsQueryable();

            return vouchers;
        }

        public async Task<List<Voucher>> GetUserVoucherAsync(Guid userId)
        {
            //var userVouchers = await context.UserVouchers
            //    .Include(v => v.Voucher)
            //    .Where(v => v.UserId == userId 
            //    && v.Voucher!.ExpiryDate >=  DateTime.Now
            //    && v.Voucher.IsActive)
            //    .ToListAsync();

            var vouchers = await context.Vouchers
                .Where(v => v.UserVouchers == null ? false : v.UserVouchers.Any(uv => uv.UserId == userId))
                .Where(v => v.ExpiryDate >= DateTime.Now && v.IsActive && !v.IsDeleted)
                .ToListAsync();

            return vouchers;
        }

        public Task UpdateAsync(Voucher entity)
        {
            context.Vouchers.Update(entity);
            return Task.CompletedTask;
        }      
    }
}
