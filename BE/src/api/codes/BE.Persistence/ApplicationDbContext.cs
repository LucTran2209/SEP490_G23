using BE.Domain.Entities;
using BE.Persistence.Extensions;
using Microsoft.EntityFrameworkCore;

namespace BE.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
            builder.ConfigureConventions();
            builder.IsDeletedFilter();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<User> Users => this.Set<User>();
        public DbSet<Role> Roles => this.Set<Role>();
        public DbSet<UserRole> UserRoles => this.Set<UserRole>();
        public DbSet<RentalShop> RentalShops => this.Set<RentalShop>();
        public DbSet<Product> Products => this.Set<Product>();
        public DbSet<Order> Orders => this.Set<Order>();
        public DbSet<OrderDetail> OrderDetails => this.Set<OrderDetail>();
        public DbSet<OrderStatus> OrderStatuses => this.Set<OrderStatus>();
        public DbSet<Category> Categories => this.Set<Category>();
        public DbSet<SubCategory> SubCategories => this.Set<SubCategory>();
        public DbSet<Feedback> Feedbacks => this.Set<Feedback>();
        public DbSet<ProductImage> ProductImages => this.Set<ProductImage>();
        public DbSet<RechargeHistory> RechargeHistories => this.Set<RechargeHistory>();
    }
}
