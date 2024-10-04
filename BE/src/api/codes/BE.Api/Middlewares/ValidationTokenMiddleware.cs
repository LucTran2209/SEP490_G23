
using Microsoft.Extensions.Logging;

namespace BE.Api.Middlewares
{
    public class ValidationTokenMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionHandlingMiddleware> logger;

        public ValidationTokenMiddleware(ILogger<ExceptionHandlingMiddleware> logger)
        {
            this.logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (Exception)
            {

                
            }
        }
    }
}
