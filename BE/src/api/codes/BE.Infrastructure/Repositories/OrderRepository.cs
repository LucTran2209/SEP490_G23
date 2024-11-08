using BE.Domain.Entities;
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
            var query = context.Orders.Include(o => o.User)
                                      .Include(o => o.OrderStatuses)
                                      .Include(o => o.OrderDetails!)
                                        .ThenInclude(o => o.Product)
                                            .ThenInclude(o => o.RentalShop)
                                      .Include(o => o.OrderDetails!)
                                        .ThenInclude(o => o.Product)
                                        .ThenInclude(o => o.ProductImages)
                                      .OrderBy(o => o.CreatedDate)
                                      .AsQueryable();
            return query;
        }

        public IQueryable<Order> GetMyOrder(Guid? id)
        {
            var query = context.Orders.Include(o => o.User)
                                      .Include(o => o.OrderStatuses)
                                      .Include(o => o.Voucher)
                                      .Include(o => o.OrderDetails!)
                                        .ThenInclude(o => o.Product)
                                            .ThenInclude(o => o.RentalShop)
                                      .Include(o => o.OrderDetails!)
                                        .ThenInclude(o => o.Product)
                                        .ThenInclude(o => o.ProductImages)
                                       .Where(o => o.UserId == id)
                                       .OrderBy(o => o.CreatedDate)
                                      .AsQueryable();
            return query;
        }

        public IQueryable<Order> GetRentalShopOrder(Guid rentalShopId)
        {
            var query = context.Orders.Include(o => o.User)
                                      .Include(o => o.OrderStatuses)
                                      .Include(o => o.Voucher)
                                      .Include(o => o.OrderDetails!)
                                        .ThenInclude(o => o.Product)
                                            .ThenInclude(o => o.RentalShop)
                                      .Include(o => o.OrderDetails!)
                                        .ThenInclude(o => o.Product)
                                        .ThenInclude(o => o.ProductImages)
                                      .Where(o => o.OrderDetails!.FirstOrDefault()!.Product.RentalShopId == rentalShopId)
                                      .OrderBy(o => o.CreatedDate)
                                      .AsQueryable();
            return query;
        }

        public Task UpdateAsync(Order entity)
        {
            throw new NotImplementedException();
        }
    }
}
