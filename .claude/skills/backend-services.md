---
name: backend-services
description: Rules for writing service classes — DTO boundaries, business logic, exception handling, DI registration
globs: ["backend/Services/**/*.cs"]
---

# Backend Services

## DTO Boundaries
- Services receive request DTOs and return response DTOs
- NEVER return EF Core entities from service methods — always map to a response DTO
- NEVER accept EF Core entities as parameters — use request DTOs

## Business Logic
- ALL business logic lives in services — not in controllers, not in repositories
- Services validate business rules before performing mutations
- Repositories are for data access only; services orchestrate the logic

## Database Access
- Services NEVER access `DbContext` directly
- All database queries are delegated to repository methods
- If a query doesn't exist in the repository, add it there first

## Exception Handling
- Throw `NotFoundException` when a requested resource doesn't exist
- Throw `BusinessException` when a business rule is violated (e.g., duplicate email, insufficient stock)
- Do NOT catch exceptions in services — let them propagate to the middleware
- Include the `field` parameter in `BusinessException` when the error relates to a specific input field

## Registration
- One interface per service: `IProductService` / `ProductService`
- Register as Scoped in `ServiceCollectionExtensions.AddApplicationServices()`
- Inject dependencies via constructor

## Method Design
- One action per method with clear naming: `CreateProductAsync`, `GetBySlugAsync`, `UpdateAsync`
- Use `async/await` for all database operations
- Methods that return collections should support pagination parameters

## Example

```csharp
public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<ProductResponse> CreateAsync(CreateProductRequest request)
    {
        var existingProduct = await _productRepository.GetBySlugAsync(request.Slug);
        if (existingProduct != null)
            throw new BusinessException("A product with this slug already exists.", "slug");

        var product = new Product
        {
            Name = request.Name,
            Slug = request.Slug,
            Description = request.Description
        };

        await _productRepository.AddAsync(product);
        return MapToResponse(product);
    }
}
```
