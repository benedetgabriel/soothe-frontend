# Steps 2-6: Skills + Infrastructure Design

## Context

Step 1 (project scaffolding) is complete. This spec covers Steps 2-6 of the roadmap:
- **Steps 2.1-2.3:** Backend development skills (controllers, services, repositories)
- **Steps 3.1-3.2:** Frontend development skills (components/design, architecture)
- **Step 4:** SQLite + Entity Framework Core setup
- **Step 5:** Entity models + migrations for all 15 tables
- **Step 6:** JWT authentication + BCrypt password hashing

Skills are created first so infrastructure code follows the guidelines from day one.

---

## Part A: Development Skills (Steps 2-3)

Skills live in `.claude/skills/` at the project root, one `.md` file per skill.

### Skill 2.1 — Backend Controllers

File: `.claude/skills/backend-controllers.md`

Rules:
- `[Authorize]` by default on all controllers; `[AllowAnonymous]` only where explicitly needed (login, register, public catalog)
- Extract authenticated user from `User.Claims` — never accept userId in request body
- Controllers are thin: validate input, call service, return `ApiResponse<T>`
- No try/catch — global `ExceptionMiddleware` handles all exceptions
- Input validation via Data Annotations on request DTOs
- All responses use the `ApiResponse<T>` envelope
- Route pattern: `[Route("api/[controller]")]`
- Use `[HttpGet]`, `[HttpPost]`, `[HttpPut]`, `[HttpDelete]` with explicit route templates where needed

### Skill 2.2 — Backend Services

File: `.claude/skills/backend-services.md`

Rules:
- Services receive request DTOs, return response DTOs — never expose EF Core entities
- All business logic lives in services, not controllers or repositories
- Database queries are delegated to repositories — services never access `DbContext`
- Business rule violations throw `BusinessException` or `NotFoundException`
- One interface per service (`IProductService` / `ProductService`)
- Registered as Scoped in DI container
- Methods are focused: one action per method, clear naming (`CreateProduct`, `GetProductBySlug`)

### Skill 2.3 — Backend Repositories

File: `.claude/skills/backend-repositories.md`

Rules:
- Use `.Include()` / `.ThenInclude()` to avoid N+1 queries
- Global query filter for soft delete (`DeletedAt == null`) configured in `DbContext`
- Specific, named methods — no generic repository pattern with `GetAll<T>`
- Pagination via `IQueryable` with `Skip`/`Take`, returning `(List<T>, int totalCount)`
- `AsNoTracking()` for read-only queries
- One interface per repository (`IProductRepository` / `ProductRepository`)
- Registered as Scoped in DI container

### Skill 3.1 — Frontend Components & Design

File: `.claude/skills/frontend-components.md`

Rules:
- All components are functional components with TypeScript
- Props typed with `interface` (not `type` alias)
- Use tokens from `styles/tokens.ts` and CSS variables — never hardcoded colors/sizes
- Ant Design as base library, customized via `ConfigProvider` theme
- Icons from `@ant-design/icons` for all interactive actions
- Components organized by domain: `components/product/`, `components/cart/`, etc.
- Reusable generic components in `components/common/`
- UI text in pt-BR
- Modern, fluid layouts — no rigid/boxy designs
- No "AI slop" — intentional design with personality

### Skill 3.2 — Frontend Architecture

File: `.claude/skills/frontend-architecture.md`

Rules:
- Folder structure: `pages/`, `components/`, `hooks/`, `services/`, `layouts/`, `types/`, `utils/`, `routes/`
- Custom hooks for reusable logic (`useAuth`, `usePagination`, etc.)
- Global state: React Context for auth/user — no Redux/Zustand
- Local state: `useState`/`useReducer`
- API calls: always through `services/api.ts`; one service file per domain (`services/productService.ts`)
- Error handling: Axios interceptor + Ant Design `message`/`notification` — no try/catch in components
- Two layout components: `AdminLayout` (sidebar + header) and `StoreLayout` (header + footer)
- Routes wrap pages with their respective layout

---

## Part B: Database Setup (Step 4)

### Packages

- `Microsoft.EntityFrameworkCore.Sqlite`
- `Microsoft.EntityFrameworkCore.Design`

### Configuration

- `AppDbContext` in `Data/AppDbContext.cs`
- Connection string in `appsettings.json`: `"ConnectionStrings": { "Default": "Data Source=marketplace.db" }`
- Global query filter for soft delete on all entities with `DeletedAt`
- `OnModelCreating` configures relationships, indexes, and constraints via Fluent API

### PostgreSQL Migration Readiness

- No SQLite-specific features
- `DateTime` for dates (not strings)
- `decimal` for monetary values
- EF Core migrations (provider-agnostic)

### MCP SQLite

- Configure MCP to point at `backend/marketplace.db`
- Full access: SELECT, INSERT, UPDATE, DELETE

---

## Part C: Entity Models (Step 5)

### Base Entity

```csharp
public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
}
```

### Entities (15 total)

All entities extend `BaseEntity` except join tables.

| Entity | Table | Key Fields | Notes |
|--------|-------|-----------|-------|
| User | users | email (unique), cpf (unique), role (customer/admin) | password_hash via BCrypt |
| Address | addresses | user_id (FK), is_default | Label: "Casa", "Trabalho" |
| Category | categories | slug (unique), parent_id (self-ref FK) | Hierarchical via parent_id |
| Product | products | slug (unique) | Main product, variants hold price/stock |
| ProductVariant | product_variants | sku (unique), product_id (FK) | Price, stock, dimensions |
| ProductImage | product_images | product_id (FK), variant_id (FK nullable) | is_cover flag |
| Tag | tags | slug (unique) | |
| ProductCategory | product_categories | product_id + category_id (composite PK) | No BaseEntity |
| ProductTag | product_tags | product_id + tag_id (composite PK) | No BaseEntity |
| Cart | carts | user_id (FK nullable), session_id | expires_at for cleanup |
| CartItem | cart_items | cart_id (FK), variant_id (FK) | |
| Order | orders | order_number (unique) | Status enum, coupon_id FK |
| OrderItem | order_items | order_id (FK), variant_id (FK) | Snapshot of product data |
| OrderAddress | order_addresses | order_id (FK), type (billing/shipping) | Copied data, not FK |
| Payment | payments | order_id (FK) | Method, status, gateway |
| Shipment | shipments | order_id (FK) | Carrier, tracking_code |
| Coupon | coupons | code (unique) | Type: percentage/fixed |
| Review | reviews | user_id + product_id (unique constraint) | Rating 1-5, is_approved |
| AuditLog | audit_logs | table_name, record_id, action | old_values/new_values as JSON |

### Indexes

- `users`: email, cpf
- `products`: slug
- `product_variants`: sku
- `categories`: slug
- `tags`: slug
- `orders`: order_number
- `coupons`: code

### Seed Data

- 1 admin user: `admin@marketplace.com` / `Admin@123` / role: admin

---

## Part D: Authentication (Step 6)

### Packages

- `BCrypt.Net-Next`
- `Microsoft.AspNetCore.Authentication.JwtBearer`

### JWT Configuration

In `appsettings.json`:
```json
{
  "Jwt": {
    "Secret": "dev-secret-key-change-in-production-min-32-chars!!",
    "Issuer": "MarketplaceEnxoval",
    "Audience": "MarketplaceEnxoval",
    "ExpirationInHours": 24
  }
}
```

### Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | Anonymous | Create customer account, return JWT |
| POST | /api/auth/login | Anonymous | Validate credentials, return JWT |

### Request/Response DTOs

**RegisterRequest:** email, password, first_name, last_name, cpf, phone, birth_date
**LoginRequest:** email, password
**AuthResponse:** token, user (id, email, first_name, last_name, role)

### Service Layer

- `IAuthService` / `AuthService`: Register, Login, GenerateToken
- `IPasswordHasher` / `PasswordHasher`: Hash, Verify (wraps BCrypt)

### Program.cs Changes

- Register JWT authentication with `AddAuthentication().AddJwtBearer()`
- Add `app.UseAuthentication()` before `app.UseAuthorization()`
- Register auth services in DI

---

## Verification

After implementation, verify:

1. **Skills:** 5 `.md` files exist in `.claude/skills/` with proper content
2. **Backend builds:** `dotnet build` — 0 errors
3. **Migrations:** `dotnet ef migrations add InitialCreate` succeeds
4. **Database:** `marketplace.db` is created after `dotnet ef database update`
5. **Seed data:** Admin user exists in database
6. **Register:** `POST /api/auth/register` creates user and returns JWT
7. **Login:** `POST /api/auth/login` with valid credentials returns JWT
8. **Auth protection:** A request to a protected endpoint without token returns 401
9. **MCP:** SQLite MCP configured and accessible
