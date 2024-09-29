
using BE.Api.Extensions;
using BE.Api.Middlewares;
using BE.Application.DependencyInjections;
using BE.Domain.Abstractions.IEntities;
using BE.Persistence.DependencyInjections;
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
            builder.Services.AddSwaggerGen(c =>
            {
                // Thêm cấu hình cho Bearer token
                c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\""
                });

                c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
                {
            {
                new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                { 
                    Reference = new Microsoft.OpenApi.Models.OpenApiReference
                    {
                        Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                Array.Empty<string>()
            }
        });
            });


            // # DI PersistenceService
            builder.Services.AddPersistenceServices(builder.Configuration);

            // # DI ApplicationService
            builder.Services.AddApplicationServices();

            builder.Services.AddScoped<ExceptionHandlingMiddleware>();

            // Current User
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddSingleton<IUser, CurrentUser>();

            // CORS
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
