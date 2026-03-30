using System.Net;
using System.Text.Json;
using MarketplaceEnxoval.DTOs.Responses;
using MarketplaceEnxoval.Exceptions;

namespace MarketplaceEnxoval.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var (statusCode, response) = exception switch
        {
            NotFoundException ex => (
                HttpStatusCode.NotFound,
                ApiResponse<object>.Fail(ex.Message)
            ),
            BusinessException ex => (
                HttpStatusCode.UnprocessableEntity,
                ApiResponse<object>.Fail(ex.Message, ex.Field)
            ),
            UnauthorizedException ex => (
                HttpStatusCode.Unauthorized,
                ApiResponse<object>.Fail(ex.Message)
            ),
            _ => HandleUnexpectedException(exception)
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        await context.Response.WriteAsJsonAsync(response, options);
    }

    private (HttpStatusCode, ApiResponse<object>) HandleUnexpectedException(Exception exception)
    {
        _logger.LogError(exception, "An unexpected error occurred");
        return (
            HttpStatusCode.InternalServerError,
            ApiResponse<object>.Fail("An unexpected error occurred.")
        );
    }
}
