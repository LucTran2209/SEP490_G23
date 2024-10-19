using BE.Application.Abstractions.ServiceInterfaces;
using BE.Application.Services.Authentication;
using BE.Application.Services.Mails;
using BE.Application.Services.Products;
using BE.Application.Services.RentalShops;
using BE.Application.Services.Users;
using BE.Domain.Abstractions.UnitOfWork;
using BE.Infrastructure.Common;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace BE.Application.DependencyInjections
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
          
            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
            services.AddScoped(typeof(IUserService), typeof(UserService));
            services.AddScoped(typeof(IAuthenticationService), typeof(AuthenService));
            services.AddScoped(typeof(IProductService), typeof(ProductService));
            services.AddScoped(typeof(IRentalShopService), typeof(RentalShopService));
            services.AddScoped(typeof(IMailService), typeof(MailService));
            return services;
        }
    }
}
