# Home Page Mockup — Design Spec

> **Step:** 7 (PROJECT_SPEC.md roadmap)
> **Date:** 2026-03-30
> **Status:** Approved

---

## 1. Overview

Implement the store home page as a React page using Ant Design components + minimal custom CSS, based on the Stitch prototype (`stitch/code.html`). The page follows the "Curated Sanctuary" editorial design language: warm bone/taupe palette, Manrope + Plus Jakarta Sans typography, soft rounded shapes, no hard borders.

**Brand name "Soothe" is hardcoded only in JSX** — no global config changes until the real name is defined.

**All UI text in pt-BR.**

---

## 2. Design Tokens Update

### Colors

The current placeholder tokens (blue/Bootstrap-like) will be replaced with the Soothe palette:

| Token Key | Value | Purpose |
|-----------|-------|---------|
| `primary` | `#6c5b4d` | Buttons, links, brand accent |
| `primaryHover` | `#5f5042` | Button hover state |
| `secondary` | `#625f59` | Labels, subtitles |
| `background` | `#faf9f6` | Page base background |
| `surfaceContainer` | `#edeeea` | Footer, elevated sections |
| `surfaceContainerLow` | `#f4f4f0` | Product grid section bg |
| `surfaceContainerHighest` | `#e0e4de` | Newsletter section bg |
| `surfaceWhite` | `#ffffff` | Card surfaces, inputs |
| `primaryContainer` | `#f5decd` | Soft highlight, quote icon |
| `text` | `#2f3430` | Primary text |
| `textSecondary` | `#5c605c` | Secondary/variant text |
| `onPrimary` | `#fff6f1` | Text on primary bg |
| `border` | `#afb3ae` | Ghost borders (low opacity) |

### Fonts

| Token Key | Value |
|-----------|-------|
| `heading` | `'Manrope', sans-serif` |
| `primary` | `'Plus Jakarta Sans', sans-serif` |

Google Fonts import added to `index.html`:
- `Manrope:wght@400;600;700;800`
- `Plus+Jakarta+Sans:wght@300;400;500;600`

### Border Radius

| Token Key | Value | Usage |
|-----------|-------|-------|
| `sm` | `8` | Small elements |
| `md` | `16` | Cards, sections |
| `lg` | `24` | Large containers |
| `xl` | `48` | Inputs, large cards |
| `full` | `9999` | Pill buttons, circular cards |

### Spacing

No changes to existing spacing scale — it covers the needs.

---

## 3. Ant Design Theme Mapping

```ts
// theme.ts — maps tokens to Ant Design ConfigProvider
{
  token: {
    colorPrimary: tokens.colors.primary,
    colorBgBase: tokens.colors.background,
    colorBgContainer: tokens.colors.surfaceWhite,
    colorText: tokens.colors.text,
    colorTextSecondary: tokens.colors.textSecondary,
    borderRadius: tokens.borderRadius.md,
    fontFamily: tokens.fonts.primary,
  },
  components: {
    Button: {
      borderRadius: 9999,
      controlHeight: 48,
      paddingInline: 40,
      fontWeight: 600,
    },
    Input: {
      borderRadius: 9999,
      controlHeight: 48,
      colorBgContainer: tokens.colors.surfaceContainerLow,
      activeBorderColor: tokens.colors.primary,
    },
  },
}
```

---

## 4. Page Sections

### 4.1 Navbar (StoreLayout)

- **Component:** Custom header inside `Layout` wrapper
- **Ant Design:** `Button` (icon buttons for person/cart), `Space`, `Typography`
- **Custom CSS:** `position: fixed`, glassmorphism (`background: rgba(250,249,246,0.8)`, `backdrop-filter: blur(12px)`), `z-index: 50`
- **Content:**
  - Left: "Soothe" logo text (Manrope, bold, primary color)
  - Center: nav links — Loja, Colecoes, Mais Vendidos, Sobre (hidden on mobile)
  - Right: person icon + cart icon
- **Behavior:** Fixed top, transparent blur effect

### 4.2 Hero Section

- **Component:** `HeroSection.tsx`
- **Ant Design:** `Button`, `Typography.Title`, `Typography.Text`
- **Custom CSS:** Full-width image container, aspect-ratio 21/9, gradient overlay (`bg-gradient-to-r from black/40 to transparent`), hover scale on image
- **Content (pt-BR):**
  - Tag pill: "Colecao Premium"
  - Title: "Seu Conforto, Curado."
  - Subtitle: "Descubra a intersecao entre precisao arquitetonica e suavidade tatil com nossa colecao exclusiva de almofadas."
  - CTA button: "Explorar Colecoes" + arrow icon
- **Image:** Hero image from prototype URL

### 4.3 Category Bento Grid

- **Component:** `CategoryBento.tsx`
- **Ant Design:** `Row`, `Col`
- **Custom CSS:** Image cards with overlay, hover scale, absolute-positioned text
- **Layout:**
  - Row 1: `Col span={16}` (Almofadas de Seda) + `Col span={8}` (Almofadas de Veludo)
  - Row 2: `Col span={24}` (Essenciais para Dormir)
- **Card structure:** Relative container > image > dark overlay > positioned text (title + subtitle)
- **Content (pt-BR):**
  - "Almofadas de Seda" — "Elegancia refrescante e hipoalergenica."
  - "Almofadas de Veludo" — "Texturas profundas para espacos acolhedores."
  - "Essenciais para Dormir" (centered text, full-width)

### 4.4 Product Grid

- **Component:** `ProductGrid.tsx`
- **Ant Design:** `Row`, `Col`, `Typography`, `Button`
- **Custom CSS:** Circular image container (border-radius 50%), hover shadow + scale, floating cart button
- **Background:** `surfaceContainerLow`
- **Header:** Label "A Selecao" (uppercase, tracking-wide) + Title "Mais Vendidos" + "Ver Todos" link
- **Grid:** 3 columns (`Col span={8}`), each product card:
  - Circular image container with white bg
  - Product name (bold)
  - Variant info (secondary text)
  - Price (primary color, large)
  - Cart button on hover (floating, bottom-right of image)
- **Mock products (pt-BR):**
  1. "Almofada Cloud Tufted" — Veludo Marfim / 45cm — R$ 189,00
  2. "Kit Luxo Seda Dream" — Cinza Ardosia / Par — R$ 295,00
  3. "Almofada Lombar Sculpt" — Trico Aveia / 60x30cm — R$ 229,00

### 4.5 Testimonial

- **Component:** `Testimonial.tsx`
- **Ant Design:** `Typography`, `Avatar`, `Space`
- **Custom CSS:** Minimal — centering, quote icon sizing
- **Content (pt-BR):**
  - Quote icon (Material Symbols or Ant Design icon)
  - "A Soothe redefiniu completamente minhas noites. As texturas sao incomparaveis e a estetica combina perfeitamente com minha casa minimalista."
  - Avatar + "Maria Fernanda" + "Designer de Interiores"

### 4.6 Newsletter

- **Component:** `Newsletter.tsx`
- **Ant Design:** `Typography`, `Input`, `Button`, `Row`, `Col`
- **Custom CSS:** Decorative blur circle (absolute positioned pseudo-element), image rotation
- **Background:** `surfaceContainerHighest`
- **Content (pt-BR):**
  - Title: "Fique por Dentro."
  - Subtitle: "Entre para nosso circulo exclusivo e tenha acesso antecipado a colecoes sazonais e dicas de decoracao."
  - Email input + "Participar" button
  - Decorative fabric texture image (rotated 3deg)

### 4.7 Footer (StoreLayout)

- **Component:** Inside `StoreLayout.tsx`
- **Ant Design:** `Row`, `Col`, `Typography`, `Input`, `Button`, `Space`
- **Custom CSS:** Rounded top border (`border-radius: 3rem 3rem 0 0`), background `surfaceContainer`
- **Layout:** 4 columns
  - Col 1: "Soothe Sanctuary" + description + social icons
  - Col 2: "Loja" — Novidades, Mais Vendidos, Cartoes Presente
  - Col 3: "Atendimento" — Politica de Envio, Trocas e Devolucoes, Fale Conosco
  - Col 4: "Newsletter" — subtitle + email input
- **Bottom bar:** Copyright "2026 Soothe Sanctuary. Todos os direitos reservados."

---

## 5. File Structure

```
src/
├── pages/
│   └── Home.tsx                  # Composes all sections
├── components/
│   └── home/
│       ├── HeroSection.tsx
│       ├── CategoryBento.tsx
│       ├── ProductGrid.tsx
│       ├── Testimonial.tsx
│       ├── Newsletter.tsx
│       └── home.css              # Custom CSS for hero, overlays, animations
├── layouts/
│   └── StoreLayout.tsx           # Navbar + Footer wrapper
├── styles/
│   ├── tokens.ts                 # Updated with Soothe palette
│   ├── theme.ts                  # Updated Ant Design theme mapping
│   └── global.css                # Updated fonts + CSS variables
```

### Route Change

The `/` route wraps `Home` inside `StoreLayout`:

```tsx
{
  path: '/',
  element: <StoreLayout />,
  children: [
    { index: true, element: <Home /> }
  ]
}
```

---

## 6. Ant Design vs Custom CSS Split

| Element | Ant Design | Custom CSS |
|---------|-----------|------------|
| Buttons (CTA, cart, newsletter) | `Button` component | Pill shape via theme token |
| Typography (titles, text, labels) | `Typography.Title`, `Text` | Font-family via theme |
| Grid layouts | `Row`, `Col` | — |
| Input (email) | `Input` component | Pill shape via theme token |
| Avatar (testimonial) | `Avatar` | — |
| Navbar structure | `Space`, `Button` (icons) | Fixed position, glassmorphism |
| Hero banner | `Button`, `Typography` | Image container, overlay, gradient |
| Category cards | `Row`, `Col` | Image overlay, hover animations |
| Product circular cards | `Row`, `Col`, `Typography` | Circle shape, hover shadow/scale |
| Newsletter decorations | — | Blur circle, image rotation |
| Footer layout | `Row`, `Col`, `Input`, `Button` | Rounded top, background |

---

## 7. Icons

Use **Material Symbols Outlined** (already in prototype) loaded via Google Fonts CDN in `index.html`. Used for:
- `person` — navbar account
- `shopping_cart` — navbar cart
- `arrow_forward` / `east` — CTA arrows
- `add_shopping_cart` — product hover button
- `format_quote` — testimonial
- `public`, `share` — footer social icons

---

## 8. Responsive Behavior

Basic responsive for the mockup:
- **Desktop (md+):** Full layout as described
- **Mobile (<md):** Nav links hidden, bento grid stacks to single column, product grid stacks to single column, newsletter stacks vertically
- Uses Ant Design responsive `Col` props (`xs`, `md`)

---

## 9. Out of Scope

- Dark mode (mentioned in prototype but not needed for mockup)
- Real product data / API integration
- Cart functionality
- Authentication integration
- SEO meta tags
- Performance optimization (lazy loading, image optimization)
- Accessibility audit (basic a11y will be maintained)
