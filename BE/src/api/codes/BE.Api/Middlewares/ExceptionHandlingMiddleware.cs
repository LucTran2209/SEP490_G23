using BE.Api.Extensions;
using FluentValidation;

namespace BE.Api.Middlewares;

public class ExceptionHandlingMiddleware : IMiddleware
{
    private readonly ILogger<ExceptionHandlingMiddleware> logger;

    public ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger)
    {
        this.logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            // Set the timezone globally (use SE Asia Standard Time for UTC+7)
            TimeZoneInfo timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");

            // Optionally, store the timezone in HttpContext.Items if needed later
            context.Items["TimeZone"] = timeZoneInfo;

            await next.Invoke(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);

            var response = context.Response;
            response.ContentType = "application/json";

            if (ex is ValidationException validationException)
            {
                response.StatusCode = StatusCodes.Status400BadRequest;
                await response.WriteAsync(validationException.ValidationResult());
            }
            else
            {
                response.StatusCode = StatusCodes.Status500InternalServerError;
                await response.WriteAsync(ex.Message);
            }
        }
    }
}