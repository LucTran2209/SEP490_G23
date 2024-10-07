using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

namespace BE.Persistence.Extensions;

public static class ApplicationBuilderExtensions
{
    public static IApplicationBuilder MigrationDataBase(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        using var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        if (context.Database.GetPendingMigrations().Any())
        {
            context.Database.Migrate();
        }

        var contributors = scope.ServiceProvider.GetServices<IDataSeedContributor>();

        foreach (var contributor in contributors)
        {
            contributor.SeedAsync().GetAwaiter().GetResult();
        }

        return app;
    }
}
