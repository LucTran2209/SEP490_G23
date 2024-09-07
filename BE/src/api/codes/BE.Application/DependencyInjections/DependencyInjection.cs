using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Users;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Infrastructure.Common;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace BE.Application.DependencyInjections
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
      
            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
            services.AddScoped(typeof(IUserService), typeof(UserService));

            return services;
        }
    }
}
