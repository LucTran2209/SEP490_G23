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

    }
}
