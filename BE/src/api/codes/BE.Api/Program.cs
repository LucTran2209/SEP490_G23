using BE.Api.Extensions;
using BE.Api.Middlewares;
using BE.Application.DependencyInjections;
using BE.Persistence.DependencyInjections;
using BE.Infrastructure.DependencyInjections;
using BE.Persistence.Extensions;

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
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

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