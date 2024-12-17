using BE.Api.Extensions;
using BE.Api.Middlewares;
using BE.Application.DependencyInjections;
using BE.Persistence.DependencyInjections;
using BE.Infrastructure.DependencyInjections;
using BE.Persistence.Extensions;
using Hangfire;
using BE.Application.Abstractions.ServiceInterfaces;

namespace BE.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // # DI PersistenceService
            builder.Services.AddPersistenceServices(builder.Configuration);

            // # DI InfrastructureService
            builder.Services.AddInfrastructureService(builder.Configuration);

            // # DI ApplicationService
            builder.Services.AddApplicationServices(builder.Configuration);

            // # MIDDELWARE
            builder.Services.AddScoped<ExceptionHandlingMiddleware>();

            builder.Services.AddMemoryCache();

            builder.Services.AddHangfire(config => config.UseSqlServerStorage(builder.Configuration.GetConnectionString("SqlServerConnection")));

            // # CORS
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            // JWT
            builder.Services.AddJwtConfiguration(builder.Configuration);

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseSwagger();
            app.UseSwaggerUI();
            
            // Using Hangfire
            app.UseHangfireDashboard();
            // Đăng ký Recurring Job
            RecurringJob.AddOrUpdate<IHangfireService>(
                "Check Over Date Payment",
                service => service.CheckOverDatePayment(),
                Cron.Minutely
            );

            app.MigrationDataBase();
            app.UseHttpsRedirection();
            app.UseMiddlewares();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors();
            app.MapControllers();

            app.Run();
        }
    }
}