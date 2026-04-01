---
name: frontend-architecture
description: Rules for frontend architecture — folder structure, hooks, state, API calls, layouts, routing
globs: ["frontend/src/**/*.ts", "frontend/src/**/*.tsx"]
---

# Frontend Architecture

## Folder Structure

```
src/
├── components/      # Organized by domain (product/, cart/, common/)
├── pages/           # One file per route
├── layouts/         # AdminLayout, StoreLayout
├── hooks/           # Custom hooks (useAuth, usePagination)
├── services/        # API call modules (one per domain)
├── styles/          # tokens.ts, theme.ts, global.css
├── types/           # Shared TypeScript interfaces
├── utils/           # Pure utility functions
├── routes/          # Route configuration
├── App.tsx
└── main.tsx
```

## State Management
- **Global state:** React Context for auth/user data only
- **Local state:** `useState` / `useReducer` within components
- No Redux, Zustand, or other state libraries

## API Calls
- All HTTP requests go through `services/api.ts` (Axios instance)
- One service file per domain: `services/authService.ts`, `services/productService.ts`
- Service functions return typed promises: `async function getProduct(slug: string): Promise<ApiResponse<Product>>`

## Error Handling
- The Axios interceptor in `services/api.ts` handles API errors globally
- Use Ant Design `message.error()` or `notification.error()` for user-facing error feedback
- Do NOT use try/catch in components for API calls — let the interceptor handle it

## Layouts
- `AdminLayout`: sidebar navigation + top header, wraps all `/admin/*` routes
- `StoreLayout`: top header + footer, wraps all public store routes
- Layouts are applied in the route configuration, not inside page components

## Custom Hooks
- Extract reusable logic into hooks in `hooks/`
- Naming: `useAuth`, `usePagination`, `useDebounce`
- Hooks that fetch data should handle loading/error states

## Routing
- Configured in `routes/index.tsx` using React Router
- Routes reference layout + page: layout wraps page in the route tree
