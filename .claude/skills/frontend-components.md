---
name: frontend-components
description: Rules for React components — TypeScript, Ant Design, design tokens, icons, organization
globs: ["frontend/src/components/**/*.tsx", "frontend/src/pages/**/*.tsx"]
---

# Frontend Components & Design

## TypeScript
- All components are functional components with TypeScript
- Props typed with `interface` (not `type` alias)
- Export components as named default exports: `export default function ProductCard({ ... }: ProductCardProps) {}`

## Design Tokens
- Use tokens from `styles/tokens.ts` for JS values and CSS variables from `styles/global.css` for stylesheets
- NEVER hardcode colors, font sizes, spacing, or border radius values
- When adding a new value, add it to tokens first, then reference it

## Ant Design
- Use Ant Design components as the base UI library
- Customize via the theme in `styles/theme.ts` (which feeds into `ConfigProvider`)
- Do NOT override Ant Design styles with `!important` — use theme tokens instead

## Icons
- Use `@ant-design/icons` for all interactive actions (edit, delete, search, cart, etc.)
- Icons should accompany action buttons and menu items

## Organization
- Components organized by domain: `components/product/`, `components/cart/`, `components/admin/`
- Reusable generic components in `components/common/`
- Each component in its own file: `components/product/ProductCard.tsx`

## UI Language
- All user-facing text in pt-BR (Portuguese)
- Ant Design locale set to `ptBR`

## Visual Style
- Modern, fluid layouts — avoid rigid/boxy grids
- Generous whitespace and rounded corners
- Smooth transitions and hover effects
- No "AI slop" — every visual choice should be intentional
