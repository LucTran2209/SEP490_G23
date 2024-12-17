using Azure.Core;
using BE.Domain.Abstractions.Enums;
using BE.Domain.Entities;
using BE.Domain.Interfaces;
using BE.Infrastructure.Abstractions;
using BE.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BE.Infrastructure.Repositories
{
    public class ProductRepository : BaseRepository, IProductRepository
    {
        public ProductRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<Product?> FindByIdAsync(Guid id)
        {
            return await context.Products
                .Include(p => p.RentalShop)
                .Include(p => p.ProductImages)
                .Include(p => p.SubCategory)
                    .ThenInclude(sc => sc.Category)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public IQueryable<Product> GetAll()
        {
            var query = context.Products
                .Include(p => p.SubCategory)
                    .ThenInclude(sc => sc.Category)
                .Include(p => p.RentalShop)
                .Include(p => p.ProductImages)
                .AsQueryable();

            return query;
        }

        public async Task AddAsync(Product entity)
        {
            await context.Products.AddAsync(entity);
        }

        public Task UpdateAsync(Product entity)
        {
            context.Products.Update(entity);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Product entity)
        {
            context.Products.Remove(entity);
            return Task.CompletedTask;
        }

        public IQueryable<Product> GetListProductByRetalShopId(Guid rentalShopId)
        {
            var query = context.Products
                .Include(p => p.SubCategory)
                    .ThenInclude(sc => sc.Category)
                .Include(p => p.ProductImages)
                .Where(p => p.RentalShopId == rentalShopId)
                .AsQueryable();

            return query;
        }

        public async Task<Product?> GetProductDetail(Guid productId)
        {
            var product = await context.Products
                .Include(p => p.RentalShop)
                .Include(p => p.SubCategory)
                    .ThenInclude(sc => sc.Category)
                .Include(p => p.ProductImages)
                .Include(p => p.Feedbacks)
                .FirstOrDefaultAsync(p => p.Id == productId);

            return product;
        }

        public async Task<int?> GetQuantityRentingAsync(Guid productId)
        {
            //var rentingQuantity = await context.OrderDetails
            //    .Include(p => p.Order)
            //        .ThenInclude(o => o.OrderStatuses)
            //    .Where(od => od.ProductId == productId
            //           && od.Order.OrderStatuses!.Any(a => a.Status != RequestStatus.CANCEL
            //                                            && a.Status != RequestStatus.COMPLETE
            //                                            && a.Status != RequestStatus.PENDING_APPROVAL))
            //    .SumAsync(x => x.Quantity);

            var orders = await context.Orders.Include(o => o.OrderDetails).Include(o => o.OrderStatuses)
                                            .Where(P => P.OrderDetails!.Any(x => x.ProductId == productId)).ToListAsync();

            foreach (var order in orders)
            {
                order.OrderStatuses = order.OrderStatuses!.OrderByDescending(o => o.CreatedDate).ToList();
            }

            orders = orders.Where(o =>  o.OrderStatuses!.First().Status != RequestStatus.PENDING_APPROVAL &&
                                        o.OrderStatuses!.First().Status != RequestStatus.COMPLETE &&
                                        o.OrderStatuses!.First().Status != RequestStatus.CANCEL).ToList();

            //orders = orders.Where(o => o.OrderDetails!.Any(od => od.ProductId == productId)).ToList();

            int rentingQuantity = 0;
            foreach (var item in orders)
            {
                foreach (var item1 in item.OrderDetails!)
                {
                    if (item1.ProductId == productId)
                    {
                        rentingQuantity += item1.Quantity;
                    }
                }
            }

            return rentingQuantity;
        }
    }
}