---
name: backend-repositories
description: Rules for writing repository classes — query patterns, N+1 prevention, soft delete, pagination
globs: ["backend/Repositories/**/*.cs"]
---

# Backend Repositories

## Query Patterns
- Use `.Include()` and `.ThenInclude()` to eagerly load related entities and avoid N+1 queries
- Use `AsNoTracking()` for read-only queries (lists, detail views, search results)
- Do NOT use a generic repository pattern — each repository has specific, named methods

## Soft Delete
- A global query filter for `DeletedAt == null` is configured in `AppDbContext.OnModelCreating`
- Repositories do NOT need to manually filter soft-deleted records in queries
- To include soft-deleted records, use `.IgnoreQueryFilters()`
- Soft delete = set `DeletedAt = DateTime.UtcNow`, not `Remove()`

## Pagination
- Methods that return lists should accept `int page, int pageSize` parameters
- Return a tuple `(List<T> items, int totalCount)` so the caller can build pagination metadata
- Use `.Skip((page - 1) * pageSize).Take(pageSize)` on the query
- Get `totalCount` with a separate `.CountAsync()` call before pagination

## Registration
- One interface per repository: `IProductRepository` / `ProductRepository`
- Register as Scoped in `ServiceCollectionExtensions.AddRepositories()`
- Inject `AppDbContext` via constructor

## Method Naming
- `GetByIdAsync(int id)` — single entity by PK
- `GetBySlugAsync(string slug)` — single entity by unique field
- `ListAsync(int page, int pageSize)` — paginated list
- `AddAsync(T entity)` — insert
- `Update(T entity)` — update (no async needed, EF tracks changes)
- `SoftDeleteAsync(int id)` — set DeletedAt

## Example

```csharp
public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Product?> GetBySlugAsync(string slug)
    {
        return await _context.Products
            .Include(p => p.Variants)
            .Include(p => p.Images)
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Slug == slug);
    }

    public async Task<(List<Product>, int)> ListAsync(int page, int pageSize)
    {
        var query = _context.Products
            .Include(p => p.Variants)
            .AsNoTracking();

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }
}
```
