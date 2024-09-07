using BE.Persistence.DataSeeds;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BE.Persistence.DependencyInjections
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("SqlServerConnection") ?? throw new InvalidOperationException("Connection string 'SqlServerConnection' not found.");

            services.AddDbContext<ApplicationDbContext>((provider, options) =>
            {
                options.UseSqlServer(connectionString, option =>
                {
                    option.MigrationsHistoryTable("_MigrationsHistory");
                    option.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                });
            });

            //services.AddDatabaseDeveloperPageExceptionFilter();
     
            //services.AddTransient<IDataSeedContributor, UsersDataSeedContributor>();

            return services;
        }
    }
}
