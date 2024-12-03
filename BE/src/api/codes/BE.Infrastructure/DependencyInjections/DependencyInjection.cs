using BE.Infrastructure.VnPaySandbox;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BE.Infrastructure.DependencyInjections
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureService(this IServiceCollection services, IConfiguration configuration)
        {        
            services.AddScoped<IVnPaySandboxService, VnPaySandboxService>();

            return services;
        }
    }
}
