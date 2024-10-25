﻿using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
    public class OrderRepository : BaseRepository, IOrderRepository
    {
        public OrderRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddAsync(Order entity)
        {
            await context.Orders.AddAsync(entity);
        }

        public Task DeleteAsync(Order entity)
        {
            throw new NotImplementedException();
        }

        public async Task<Order?> FindByIdAsync(Guid id)
        {
            var o = await context.Orders.SingleOrDefaultAsync(o => o.Id == id);
            return o;
        }

        public IQueryable<Order> GetAll()
        {
            var query = context.Orders.Include(o => o.OrderDetails).ThenInclude(o => o.Product).ThenInclude(o => o.RentalShop)
                                      .Include(o => o.User)
                                      .Include(o => o.OrderStatuses)
                                      .AsQueryable();
            return query;
        }


        public Task UpdateAsync(Order entity)
        {
            throw new NotImplementedException();
        }
    }
}
