---
name: backend-controllers
description: Rules for writing ASP.NET API controllers — auth, validation, response format, routing
globs: ["backend/Controllers/**/*.cs"]
---

# Backend Controllers

## Authorization
- Apply `[Authorize]` at the controller level by default
- Use `[AllowAnonymous]` explicitly only on endpoints that must be public (login, register, public catalog)

## Authenticated User
- Extract the current user from `User.Claims` (e.g., `User.FindFirstValue(ClaimTypes.NameIdentifier)`)
- NEVER accept `userId` in the request body or query string for operations on the current user

## Controller Responsibility
- Controllers are thin: parse input, call a service method, return `ApiResponse<T>`
- No business logic in controllers — that belongs in services
- No try/catch blocks — the global `ExceptionMiddleware` handles all exceptions
- No direct database access — controllers call services, services call repositories

## Input Validation
- Use Data Annotations on request DTOs (`[Required]`, `[EmailAddress]`, `[StringLength]`, etc.)
- Validation errors are handled automatically by ASP.NET and returned as 422 via the exception middleware

## Response Format
- ALL responses use the `ApiResponse<T>` envelope from `MarketplaceEnxoval.DTOs.Responses`
- Success: `return Ok(ApiResponse<T>.Ok(data))`
- Created: `return Created("", ApiResponse<T>.Ok(data))`
- No content: `return Ok(ApiResponse<object>.Ok(null))`

## Routing
- Class-level: `[Route("api/[controller]")]`
- Method-level: Use `[HttpGet]`, `[HttpPost("{id}")]`, `[HttpPut("{id}")]`, `[HttpDelete("{id}")]`
- Use `[ApiController]` attribute on every controller

## Example

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet("{slug}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var product = await _productService.GetBySlugAsync(slug);
        return Ok(ApiResponse<ProductResponse>.Ok(product));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductRequest request)
    {
        var product = await _productService.CreateAsync(request);
        return Created("", ApiResponse<ProductResponse>.Ok(product));
    }
}
```
