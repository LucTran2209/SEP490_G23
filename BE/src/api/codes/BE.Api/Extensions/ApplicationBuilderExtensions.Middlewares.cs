using BE.Api.Middlewares;

namespace BE.Api.Extensions;

public static partial class ApplicationBuilderExtensions
{
    public static IApplicationBuilder UseMiddlewares(this IApplicationBuilder app)
    {
        app.UseMiddleware<ExceptionHandlingMiddleware>();
        return app;
    }
}
