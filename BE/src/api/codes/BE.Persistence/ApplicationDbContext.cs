using BE.Domain.Entities.ActivityLogs;
using BE.Domain.Entities.Categories;
using BE.Domain.Entities.Groups;
using BE.Domain.Entities.Products;
using BE.Domain.Entities.RentalRequests;
using BE.Domain.Entities.Rentals;
using BE.Domain.Entities.Roles;
using BE.Domain.Entities.SubCategories;
using BE.Domain.Entities.UserGroups;
using BE.Domain.Entities.UserRoles;
using BE.Domain.Entities.Users;
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
        public DbSet<Group> Groups => this.Set<Group>();
        public DbSet<UserGroup> UserGroups => this.Set<UserGroup>();
        public DbSet<Rental> Rentals => this.Set<Rental>();
        public DbSet<RentalRequest> RentalRequests => this.Set<RentalRequest>();
        public DbSet<Product> Products => this.Set<Product>();
        public DbSet<ActivityLog> ActivityLogs => this.Set<ActivityLog>();
        public DbSet<Category> Categorys => this.Set<Category>();
        public DbSet<FieldCategory> FieldCategories => this.Set<FieldCategory>();

    }
}
