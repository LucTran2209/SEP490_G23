﻿using BE.Application.Services.Authentication;
using BE.Application.Services.Categories;
using BE.Application.Services.ExternalServices;
using BE.Application.Services.Feedbacks;
using BE.Application.Services.Orders;
using BE.Application.Services.Products;
using BE.Application.Services.RentalShops;
using BE.Application.Services.Statisticals;
using BE.Application.Services.SubCategories;
using BE.Application.Services.Users;
using BE.Application.Services.Vouchers;
using BE.Application.Services.Wallets;
using BE.Infrastructure.Common;
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
            services.AddTransient(typeof(IAzureService), typeof(AzureService));

            services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
            services.AddScoped(typeof(IUserService), typeof(UserService));
            services.AddScoped(typeof(IAuthenticationService), typeof(AuthenService));
            services.AddScoped(typeof(IProductService), typeof(ProductService));
            services.AddScoped(typeof(IRentalShopService), typeof(RentalShopService));
            services.AddScoped(typeof(IMailService), typeof(MailService));
            services.AddScoped(typeof(IFeedbackService), typeof(FeedbackService));
            services.AddScoped(typeof(IOrderService), typeof(OrderService));
            services.AddScoped(typeof(ICategoryService), typeof(CategoryService));
            services.AddScoped(typeof(ISubCategoryService), typeof(SubCategoryService));
            services.AddScoped(typeof(IWalletService), typeof(WalletService));
            services.AddScoped(typeof(IVoucherService), typeof(VoucherService));
            services.AddScoped(typeof(IStatisticalService), typeof(StatisticalService));
            return services;
        }
    }
}
