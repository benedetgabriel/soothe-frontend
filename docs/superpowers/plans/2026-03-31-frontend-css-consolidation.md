# Frontend CSS Consolidation & Improvement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate the frontend around Tailwind CSS as the single styling approach, eliminate token duplication, migrate the home page from custom CSS to Tailwind, polish admin pages, and close routing gaps — preventing tech debt from compounding as the project grows.

**Architecture:** Remove the duplicate `:root` block (keep `@theme` for Tailwind v4), migrate all custom CSS classes to Tailwind utility classes, replace Ant Design grid with Tailwind grid, and add missing admin routes with placeholder pages. Ant Design remains only for complex interactive components (Form, Input, Button, Card, Avatar, Table, etc.) — never for layout.

**Tech Stack:** Tailwind CSS v4.2.2 (already installed), Ant Design v6.3.4, React 19, Vite 8

---

## Analysis Summary

### What's working well
- Tailwind v4 is already installed and configured with `@theme` in `global.css`
- Home page is visually polished and production-ready
- Admin pages have structure and basic styling (Login, AdminLayout, AdminDashboard)
- Design token palette (Soothe) is cohesive
- Dependencies are minimal and well-chosen

### Problems identified

| # | Issue | Severity | Where |
|---|-------|----------|-------|
| 1 | **Triple token duplication** — colors/radii defined in `@theme`, `:root`, AND `tokens.ts` | Critical | `global.css`, `tokens.ts` |
| 2 | **530 lines of custom CSS** when Tailwind is already installed | Major | `home.css` |
| 3 | **Verbose inline styles** for CSS var access (`style={{ color: 'var(--color-text)' }}`) | Major | All admin components |
| 4 | **Ant Design Row/Col for layout** — overlaps with Tailwind grid | Moderate | `CategoryBento`, `ProductGrid`, `StoreLayout` footer |
| 5 | **Missing admin routes** — sidebar links to pages that don't exist | Moderate | `routes/index.tsx`, `AdminLayout.tsx` |
| 6 | **No 404 route** | Moderate | `routes/index.tsx` |
| 7 | **Auth token key mismatch** — `api.ts` uses `'token'`, `ProtectedRoute` uses `'admin_token'` | Minor | `api.ts:5`, `ProtectedRoute.tsx:4` |
| 8 | **StoreLayout imports home.css** — layout coupled to page-specific styles | Minor | `StoreLayout.tsx:3` |
| 9 | **Font var name inconsistency** — `@theme` uses `--font-body`, `:root` uses `--font-primary` | Minor | `global.css` |

### Rule going forward

| Use Tailwind for | Use Ant Design for |
|------------------|--------------------|
| Layout (grid, flex, spacing) | Form, Input, Button, Select |
| Colors, typography, borders | Card, Table, Modal, Drawer |
| Responsive breakpoints | Avatar, Tag, Tooltip, Message |
| Hover/transition effects | ConfigProvider theming |
| Padding, margin, sizing | — |

---

## File Structure

### Files to modify
| File | Change |
|------|--------|
| `src/styles/global.css` | Remove duplicate `:root` block, move global resets into `@layer base` |
| `src/styles/tokens.ts` | Remove — Ant Design theme reads CSS vars directly |
| `src/styles/theme.ts` | Rewrite to read values from a shared `tokens` constant (no file dependency on tokens.ts, just inline) |
| `src/components/home/home.css` | **Delete entirely** — all styles migrated to Tailwind inline |
| `src/components/home/HeroSection.tsx` | Replace CSS classes with Tailwind utilities |
| `src/components/home/CategoryBento.tsx` | Replace CSS classes + Ant Design grid with Tailwind |
| `src/components/home/ProductGrid.tsx` | Replace CSS classes + Ant Design grid with Tailwind |
| `src/components/home/Testimonial.tsx` | Replace CSS classes with Tailwind utilities |
| `src/components/home/Newsletter.tsx` | Replace CSS classes with Tailwind utilities |
| `src/layouts/StoreLayout.tsx` | Replace CSS classes + Ant Design grid with Tailwind, remove home.css import |
| `src/layouts/AdminLayout.tsx` | Replace inline styles with Tailwind classes |
| `src/pages/AdminDashboard.tsx` | Replace inline styles with Tailwind classes |
| `src/pages/Login.tsx` | Replace inline styles with Tailwind classes |
| `src/routes/index.tsx` | Add missing admin routes + 404 catch-all |
| `src/services/api.ts` | Fix token key to `'admin_token'` |

### Files to create
| File | Purpose |
|------|---------|
| `src/pages/AdminProducts.tsx` | Placeholder page for `/admin/produtos` |
| `src/pages/AdminOrders.tsx` | Placeholder page for `/admin/pedidos` |
| `src/pages/AdminSettings.tsx` | Placeholder page for `/admin/config` |
| `src/pages/NotFound.tsx` | 404 catch-all page |

### Files to delete
| File | Reason |
|------|--------|
| `src/components/home/home.css` | Replaced by Tailwind inline classes |
| `src/styles/tokens.ts` | Tokens live in `@theme` (CSS) and inline in `theme.ts` |

---

## Task 1: Clean up CSS architecture (tokens + global.css)

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/styles/theme.ts`
- Delete: `src/styles/tokens.ts`

- [ ] **Step 1: Rewrite `global.css` — remove `:root` duplication**

The `@theme` block already defines CSS variables that Tailwind v4 uses. The `:root` block is a duplicate. Keep only `@theme` and add spacing tokens there too (currently only in `:root`).

```css
@import "tailwindcss";

@theme {
  --color-primary: #6c5b4d;
  --color-primary-hover: #5f5042;
  --color-secondary: #625f59;
  --color-background: #faf9f6;
  --color-surface-container: #edeeea;
  --color-surface-container-low: #f4f4f0;
  --color-surface-container-highest: #e0e4de;
  --color-surface-white: #ffffff;
  --color-primary-container: #f5decd;
  --color-text: #2f3430;
  --color-text-secondary: #5c605c;
  --color-on-primary: #fff6f1;
  --color-border: #afb3ae;

  --font-heading: 'Manrope', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 48px;
  --radius-full: 9999px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 {
  font-family: var(--font-heading);
}

/* Material Symbols config */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}
```

Note: the Material Symbols config was previously in `home.css` — it belongs in `global.css` since it's used across the entire app (admin uses it too).

- [ ] **Step 2: Rewrite `theme.ts` to inline token values**

Since `tokens.ts` is being removed, `theme.ts` needs its own values. These must match the `@theme` block exactly.

```ts
import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#6c5b4d',
    colorBgBase: '#faf9f6',
    colorBgContainer: '#ffffff',
    colorText: '#2f3430',
    colorTextSecondary: '#5c605c',
    colorBorder: '#afb3ae',
    borderRadius: 16,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
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
      colorBgContainer: '#f4f4f0',
      activeBorderColor: '#6c5b4d',
    },
  },
};
```

- [ ] **Step 3: Delete `tokens.ts`**

```bash
rm frontend/src/styles/tokens.ts
```

- [ ] **Step 4: Verify no other files import `tokens.ts`**

Run: `grep -r "from.*tokens" frontend/src/ --include="*.ts" --include="*.tsx"`
Expected: no results (only `theme.ts` imported it, and we just rewrote it)

- [ ] **Step 5: Run `npm run build` to confirm no TypeScript errors**

Run: `cd frontend && npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 6: Commit**

```bash
git add frontend/src/styles/global.css frontend/src/styles/theme.ts
git rm frontend/src/styles/tokens.ts
git commit -m "refactor: consolidate CSS tokens — remove :root duplicate and tokens.ts"
```

---

## Task 2: Migrate StoreLayout to Tailwind (remove Ant Design grid + home.css import)

**Files:**
- Modify: `src/layouts/StoreLayout.tsx`

The StoreLayout has two issues: it imports `home.css` (coupling layout to page styles) and uses Ant Design `Row`/`Col` for the footer grid. Both get fixed by converting to Tailwind.

- [ ] **Step 1: Rewrite StoreLayout with Tailwind classes**

```tsx
import { Outlet } from 'react-router-dom';
import { Input, Button } from 'antd';

export default function StoreLayout() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-[12px]">
        <div className="flex justify-between items-center px-8 py-6 max-w-full mx-auto">
          <div className="font-heading text-2xl font-bold tracking-tight text-primary">
            Soothe
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a className="font-heading text-xs font-semibold uppercase tracking-widest text-primary border-b-2 border-primary pb-1 no-underline" href="#">Loja</a>
            <a className="font-heading text-xs font-semibold uppercase tracking-widest text-text-secondary no-underline hover:text-primary transition-colors duration-300" href="#">Colecoes</a>
            <a className="font-heading text-xs font-semibold uppercase tracking-widest text-text-secondary no-underline hover:text-primary transition-colors duration-300" href="#">Mais Vendidos</a>
            <a className="font-heading text-xs font-semibold uppercase tracking-widest text-text-secondary no-underline hover:text-primary transition-colors duration-300" href="#">Sobre</a>
          </div>

          <div className="flex items-center gap-6 text-primary">
            <button className="bg-transparent border-none cursor-pointer text-inherit">
              <span className="material-symbols-outlined">person</span>
            </button>
            <button className="bg-transparent border-none cursor-pointer text-inherit">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-24 bg-surface-container rounded-t-[3rem]">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.2fr] gap-12 px-12 py-20 max-w-[1280px] mx-auto">
          {/* Brand */}
          <div>
            <div className="font-heading text-xl font-bold text-primary mb-8">
              Soothe Sanctuary
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-8">
              Criando espacos intencionais atraves da arte do conforto e texturas selecionadas.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center cursor-pointer hover:bg-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-sm">public</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center cursor-pointer hover:bg-primary-container transition-colors duration-300">
                <span className="material-symbols-outlined text-sm">share</span>
              </div>
            </div>
          </div>

          {/* Loja */}
          <div>
            <div className="font-heading font-bold text-primary uppercase tracking-[0.15em] text-xs mb-6">Loja</div>
            <a className="block text-text-secondary text-sm no-underline mb-4 hover:text-primary hover:translate-x-1 transition-all duration-200" href="#">Novidades</a>
            <a className="block text-text-secondary text-sm no-underline mb-4 hover:text-primary hover:translate-x-1 transition-all duration-200" href="#">Mais Vendidos</a>
            <a className="block text-text-secondary text-sm no-underline mb-4 hover:text-primary hover:translate-x-1 transition-all duration-200" href="#">Cartoes Presente</a>
          </div>

          {/* Atendimento */}
          <div>
            <div className="font-heading font-bold text-primary uppercase tracking-[0.15em] text-xs mb-6">Atendimento</div>
            <a className="block text-text-secondary text-sm no-underline mb-4 hover:text-primary hover:translate-x-1 transition-all duration-200" href="#">Politica de Envio</a>
            <a className="block text-text-secondary text-sm no-underline mb-4 hover:text-primary hover:translate-x-1 transition-all duration-200" href="#">Trocas e Devolucoes</a>
            <a className="block text-text-secondary text-sm no-underline mb-4 hover:text-primary hover:translate-x-1 transition-all duration-200" href="#">Fale Conosco</a>
          </div>

          {/* Newsletter */}
          <div>
            <div className="font-heading font-bold text-primary uppercase tracking-[0.15em] text-xs mb-6">Newsletter</div>
            <p className="text-text-secondary text-xs leading-relaxed mb-6">
              Cadastre-se e ganhe 10% de desconto na sua primeira compra.
            </p>
            <div className="relative">
              <Input placeholder="Email" style={{ paddingRight: 48 }} />
              <Button
                type="primary"
                shape="circle"
                size="small"
                className="!absolute right-1 top-1/2 -translate-y-1/2 !w-8 !h-8 !min-w-8 !flex !items-center !justify-center"
              >
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="px-12 py-10 border-t border-border/10 text-center text-xs text-text-secondary">
          &copy; 2026 Soothe Sanctuary. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}
```

Key changes:
- Removed `import '../components/home/home.css'` — decoupled
- Replaced Ant Design `Row`/`Col` with Tailwind `grid`
- All styles are now Tailwind utility classes
- Ant Design `Input`/`Button` kept (they're interactive components, not layout)

- [ ] **Step 2: Verify the storefront renders correctly**

Run: `cd frontend && npm run dev`
Navigate to `http://localhost:5173/` and visually check:
- Navbar fixed at top with blur
- Footer with 4-column grid on desktop, stacked on mobile
- Links have hover effects
- Newsletter input + button work

- [ ] **Step 3: Commit**

```bash
git add frontend/src/layouts/StoreLayout.tsx
git commit -m "refactor: migrate StoreLayout from Ant Design grid + CSS to Tailwind"
```

---

## Task 3: Migrate HeroSection to Tailwind

**Files:**
- Modify: `src/components/home/HeroSection.tsx`

- [ ] **Step 1: Rewrite HeroSection with Tailwind classes**

```tsx
import { Button } from 'antd';

const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD04IpRjZnl-tlAdd2gNMpVEmntzZ_PteOA5rsawn7psKjKYrX0HvQ2hnYMUq0CnCTkSPgyHuLf9rrUlkf6Bs5Mb1o1JvJR9W2ZucOhgGzk0JExORPkGYp0ETkmFTESUbnx_MH2NJDW_FQVDXcBvLwFblI-iNHYgQvG9np-oQdfATu7kUUBN4HjZyjAXAUQxCI9iqmGCs3TG5yOpbH84r3_is_793sXpTYq9_mSoL1zMRc_D8jvTHrf_agr9KGUGPIEze9hRljVJ1UV';

export default function HeroSection() {
  return (
    <section className="px-8 pb-24 max-md:px-4 max-md:pb-12">
      <div className="relative w-full aspect-[21/9] max-md:aspect-[4/3] rounded-lg overflow-hidden group">
        <img
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          src={HERO_IMAGE}
          alt="Quarto minimalista com almofadas em tons neutros"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-text/40 to-transparent flex items-center px-16 max-md:px-6">
          <div className="max-w-[640px]">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-[12px] text-on-primary text-xs font-semibold tracking-[0.1em] uppercase mb-6">
              Colecao Premium
            </span>
            <h1 className="font-heading text-[clamp(3rem,6vw,5rem)] font-extrabold text-on-primary leading-[0.9] tracking-tight mb-8">
              Seu Conforto,<br />Curado.
            </h1>
            <p className="text-lg text-on-primary/90 font-light mb-10 max-w-[480px] leading-relaxed">
              Descubra a intersecao entre precisao arquitetonica e suavidade tatil
              com nossa colecao exclusiva de almofadas.
            </p>
            <Button
              type="primary"
              size="large"
              className="!inline-flex !items-center !gap-3 !h-14 !px-10 !text-base !shadow-[0_10px_30px_rgba(108,91,77,0.2)]"
            >
              Explorar Colecoes
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visually verify hero section**

Run: `cd frontend && npm run dev`
Check: image shows, gradient overlay, text readable, hover zoom, button styled, responsive at 768px

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/HeroSection.tsx
git commit -m "refactor: migrate HeroSection from CSS classes to Tailwind"
```

---

## Task 4: Migrate CategoryBento to Tailwind

**Files:**
- Modify: `src/components/home/CategoryBento.tsx`

- [ ] **Step 1: Rewrite CategoryBento with Tailwind classes**

```tsx
const IMAGES = {
  silk: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyKNZEu043rsV6RG18ZwZG1rOfvwMSN69OZLS-YQAO_QFaY7vNYmLhzojiW2n9B8_8l1QXMlIgY4CiMwigGjNEgghznqqxJikTF79e2dD5KPRA1_35uZ44a8pxTIIK-UYN3ppRjmnbTtGZs8IxgcBzNUNj0HmKnt0c1yqRutU-sgpUB66V2OZOidaSJYthwzXMscdatl8vGfULFXTFzz2_7aYu12b98KFJS-v6Fc36_LeS3wyF3vlxtyul47cLd_A2xtAcG3GqWOXF',
  velvet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsi3TG6q9N4iv_2SNS39LERO1FB0d0sb1pwecc9uBDxnjg01EyXtAesFhTuIhsDwowkqTOACxN9zTnmnzlTqzGX8fRFDZBT1xlWVdhmmIQqSfQlA1kIAitvXqotCkCOqiMFNEbgCpSWbqIchYa5kKq3v9lOeLb88OHOYPSQf2MfpAWlx-aFGWLbnNqVKrLJhyHWitl9Ffzz4buCooVPBtZZ_u-hE3JPoPFeGPHTXi938YZtQq6fFfMY2adlEOo2CVe3ecqcF1Hv4Gd',
  sleeping: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhgBj4yCk69InpduMOFBt9QgROq7vwjD6GEAVkSpM0Gk2yyIcmVoVr_TlD7sOOVtyy9kahfnapbWZlsusaD5GBL-6HUUsmz7FbLJi5EuZ3kMdekQCxPh9ozIZLqQk9C0YNOM_HBAgeYdsUanE3tUHmS3rm62h-CGQo19EqJ9l_l3WojtNRRa3CeQgPiE8LUByokxDSLo_cN3Z5bdvpaMprQ199NQ-om_mtXOJIOUA5njoYRd8cDJYOEkO60_vRSZ0tgnwLytDqmH6x',
};

export default function CategoryBento() {
  return (
    <section className="px-8 py-12 max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Silk — spans 2 columns */}
        <div className="md:col-span-2 relative h-[500px] max-md:h-[300px] rounded-lg overflow-hidden cursor-pointer group">
          <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={IMAGES.silk} alt="Fronha de seda em tom creme" />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
          <div className="absolute bottom-10 left-10 text-white">
            <h3 className="font-heading text-4xl font-bold mb-2">Almofadas de Seda</h3>
            <p className="text-lg opacity-90">Elegancia refrescante e hipoalergenica.</p>
          </div>
        </div>

        {/* Velvet — 1 column */}
        <div className="relative h-[500px] max-md:h-[300px] rounded-lg overflow-hidden cursor-pointer group">
          <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={IMAGES.velvet} alt="Almofadas de veludo em tons terrosos" />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" />
          <div className="absolute bottom-10 left-10 text-white">
            <h3 className="font-heading text-[1.75rem] font-bold mb-2">Almofadas de Veludo</h3>
            <p className="text-sm opacity-90">Texturas profundas para espacos acolhedores.</p>
          </div>
        </div>

        {/* Sleeping Essentials — full width */}
        <div className="md:col-span-3 relative h-[400px] max-md:h-[250px] rounded-lg overflow-hidden cursor-pointer group">
          <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={IMAGES.sleeping} alt="Quarto moderno com travesseiros brancos" />
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h3 className="font-heading text-[2.75rem] font-bold mb-4">Essenciais para Dormir</h3>
            <div className="w-16 h-1 bg-white mx-auto rounded-full transition-[width] duration-300 group-hover:w-32" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

Key changes:
- Removed Ant Design `Row`/`Col` — now uses Tailwind `grid` with `col-span-2`/`col-span-3`
- All hover effects via Tailwind `group-hover:`
- Responsive via `max-md:` breakpoint

- [ ] **Step 2: Visually verify bento grid**

Check: 3 cards render, hover effects work (zoom + overlay darken + divider expand), responsive stacking at 768px

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/CategoryBento.tsx
git commit -m "refactor: migrate CategoryBento from Ant Design grid + CSS to Tailwind"
```

---

## Task 5: Migrate ProductGrid to Tailwind

**Files:**
- Modify: `src/components/home/ProductGrid.tsx`

- [ ] **Step 1: Rewrite ProductGrid with Tailwind classes**

```tsx
import { Typography, Button } from 'antd';

const { Title, Text } = Typography;

const PRODUCTS = [
  {
    name: 'Almofada Cloud Tufted',
    variant: 'Veludo Marfim / 45cm',
    price: 'R$ 189,00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6w1P6Uzv3pNWCPQX0IVyOZzzAu1CgzwU8qiMA0eIGMXANvLgMUPoAKSkOhHHn3sQHVmYOXYj6o_hsy7LjCXDrJ3VeY2jtUSaPQaxfaKKB6alvxFU40E-7SsGA88_NVmbib6WCBXnKJjWE3rSNBQNsuY5eboopqbrlfx8LM5E_LZtVIUSoAOTVnbsye76ElxUE-d1wNc7_966J4MrFs9s1pK6UXvTv40oPmE3Pbra0MlFn7S8vU7ctU8LybWoIdD1JdGdk61AS9BR3',
    alt: 'Almofada redonda marfim com tufos',
  },
  {
    name: 'Kit Luxo Seda Dream',
    variant: 'Cinza Ardosia / Par',
    price: 'R$ 295,00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGcA3-DzpWK2kT8H470fiImdCAEyy0EJmAgQeVpTnx5DJ_0uKkPzdzO-nUnqTvFaCLiBnfD2h7ZkvaR-Oc58Fk0zfL8plIjzEJk21YyrCwkHi18JkCiGhVyH1EoPjukHyzrPVrnJrb_VmoD2yAn0p-aJT_I5VRFNBolFQBhg22XkvEbvYwLFs0CO_J2_b0XKmmS_o65sY_PBHjHMusmC_Hg-Ah2PAiOlbmh3ololgHYFitWMVMK6712wk5JMt9rHiQsNd0d7A4uCtL',
    alt: 'Fronhas de seda cinza ardosia',
  },
  {
    name: 'Almofada Lombar Sculpt',
    variant: 'Trico Aveia / 60x30cm',
    price: 'R$ 229,00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLYdPgjDgRrgu2sS5N1j6ElbY50A_dA1Fh2C7L6haxrhwpGQNJbwQ51kkkpjkBBgzCPtjcCbimRoR--wcU4ffoaaFjdviC-MdYXsfnZW4fRGbQAE5xFFbgogVw8PreApWBR2GV9C8HCSevd9oOImW6oVtTjQqI6dcs80qJIk41b1TZ4rxHzb1U55dDO2q45uz5-jfuKi-xZwF4PFRtjvYcrbfQgTRDMxzXSFxfcmM4IiVxm-Mu80rQjIQIgqzRQhRHBuPExkcWVtZi',
    alt: 'Almofada lombar em trico cor aveia',
  },
];

export default function ProductGrid() {
  return (
    <section className="py-24 px-8 bg-surface-container-low max-md:py-12 max-md:px-4">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex justify-between items-end mb-16 max-md:flex-col max-md:items-start max-md:gap-4">
          <div>
            <span className="block font-heading text-secondary uppercase tracking-[0.15em] text-xs font-bold mb-4">
              A Selecao
            </span>
            <Title level={2} style={{ margin: 0, letterSpacing: '-0.03em', fontWeight: 800 }}>
              Mais Vendidos
            </Title>
          </div>
          <Button
            type="link"
            className="!text-primary !font-bold !inline-flex !items-center !gap-2 !p-0 !text-base"
          >
            Ver Todos os Produtos
            <span className="material-symbols-outlined text-xl">east</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {PRODUCTS.map((product) => (
            <div key={product.name} className="text-center group">
              <div className="aspect-square bg-white rounded-full p-4 overflow-hidden mb-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(47,52,48,0.1)] relative">
                <img
                  className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110"
                  src={product.image}
                  alt={product.alt}
                />
                <button className="absolute bottom-8 right-8 bg-background w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.1)] opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 border-none cursor-pointer text-primary">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <Title level={4} style={{ marginBottom: 8 }}>{product.name}</Title>
              <Text type="secondary" className="!block !mb-4 !font-medium">
                {product.variant}
              </Text>
              <span className="text-2xl font-bold text-primary">{product.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visually verify product grid**

Check: 3 products in row on desktop, stacked on mobile, circular images, hover cart button, price styled

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/ProductGrid.tsx
git commit -m "refactor: migrate ProductGrid from Ant Design grid + CSS to Tailwind"
```

---

## Task 6: Migrate Testimonial to Tailwind

**Files:**
- Modify: `src/components/home/Testimonial.tsx`

- [ ] **Step 1: Rewrite Testimonial with Tailwind classes**

```tsx
import { Avatar, Typography } from 'antd';

const { Text } = Typography;

const AVATAR_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcn2ceO7TFg7ptz0HIdGMl9L7vESwtq42qbOdUqEgIPLJwNmTCMb0y5chg_arziKlepLqGC_sCBTer_6h32r4UPlEbImaZJp9hmsDQD5rRadaM_5aJKdKGDFRom_CJSv9iwhQYTUNSc0EsGKy05xu9MTm6WpFtl-bGUjZVDzOfkfThtoeOnpUedkGlRIgoTpMTgAvOr3LR7uKFYeiqU656u9-xAWRVI013w_t_W-hWqPG2XzGcf2S6pzQO4ccEIWvj1lVUHK1zVY5_';

export default function Testimonial() {
  return (
    <section className="py-32 px-8 text-center max-md:py-16 max-md:px-4">
      <div className="max-w-[720px] mx-auto">
        <span
          className="material-symbols-outlined text-5xl text-primary-container mb-12 block"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
        >
          format_quote
        </span>
        <p className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] italic font-light leading-snug text-text mb-12 mx-auto">
          "A Soothe redefiniu completamente minhas noites. As texturas sao incomparaveis
          e a estetica combina perfeitamente com minha casa minimalista."
        </p>
        <div className="flex items-center justify-center gap-4">
          <Avatar size={48} src={AVATAR_IMAGE} alt="Maria Fernanda" />
          <div className="text-left">
            <Text strong className="!block">Maria Fernanda</Text>
            <Text type="secondary" className="!text-sm">Designer de Interiores</Text>
          </div>
        </div>
      </div>
    </section>
  );
}
```

Note: `fontVariationSettings` stays as inline style because Tailwind doesn't have a utility for it.

- [ ] **Step 2: Visually verify testimonial section**

Check: quote icon filled, italic text, avatar + name, responsive sizing

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/Testimonial.tsx
git commit -m "refactor: migrate Testimonial from CSS classes to Tailwind"
```

---

## Task 7: Migrate Newsletter to Tailwind

**Files:**
- Modify: `src/components/home/Newsletter.tsx`

- [ ] **Step 1: Rewrite Newsletter with Tailwind classes**

```tsx
import { Button, Input, Typography } from 'antd';

const { Title, Text } = Typography;

const TEXTURE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA2sZEUvukXs6lFuhAuAtiRty1XQ9NmfLgBn8k3Golf-aBRXQc9mHxA_xSk520Qf8Xz11bOWgMZ1oK4ovORTR-9-iJ-PEaUO4TZIOkDF73hnhcplvkP0bq4zKudHW4eTNwV32akVgPY_lXLADGT1mBN2nfwspI49UXJD4ds0v75yryMQ0wlPWKS2JPWpC8oWufiJ_eCAU6Qyk4kM7IULvdZ14jXnIYHtsrBSEtD94DBKZmN6QcUttRV1FX6kFwbroJ0dta6Qn7YnCh';

export default function Newsletter() {
  return (
    <section className="px-8 pb-12">
      <div className="bg-surface-container-highest rounded-lg p-16 flex items-center gap-16 relative overflow-hidden max-md:flex-col max-md:p-8">
        {/* Decorative blur */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary-container/20 rounded-full blur-[48px] pointer-events-none" />

        {/* Content */}
        <div className="flex-1 relative z-10">
          <Title level={2} style={{ letterSpacing: '-0.02em', fontWeight: 800, marginBottom: 24 }}>
            Fique por Dentro.
          </Title>
          <Text className="!text-lg !text-text-secondary !block !mb-10 !max-w-[420px] !leading-relaxed">
            Entre para nosso circulo exclusivo e tenha acesso antecipado a colecoes sazonais e dicas de decoracao.
          </Text>
          <div className="flex gap-4 max-w-[480px] flex-wrap">
            <Input
              placeholder="Endereco de email"
              className="!flex-1 !min-w-[200px]"
            />
            <Button type="primary" size="large" className="!font-bold">
              Participar
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 max-w-[400px] relative z-10 max-md:max-w-full">
          <div className="aspect-square rounded-lg overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] rotate-3">
            <img className="w-full h-full object-cover" src={TEXTURE_IMAGE} alt="Textura de tecido boucle em tom creme" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Visually verify newsletter section**

Check: blur circle, image tilted, responsive stacking, input + button alignment

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/Newsletter.tsx
git commit -m "refactor: migrate Newsletter from CSS classes to Tailwind"
```

---

## Task 8: Delete home.css

**Files:**
- Delete: `src/components/home/home.css`

All CSS classes from `home.css` have been migrated to Tailwind inline classes in Tasks 2-7. The Material Symbols config was moved to `global.css` in Task 1.

- [ ] **Step 1: Delete the file**

```bash
rm frontend/src/components/home/home.css
```

- [ ] **Step 2: Verify no remaining imports of home.css**

Run: `grep -r "home.css" frontend/src/ --include="*.ts" --include="*.tsx"`
Expected: no results

- [ ] **Step 3: Run full build**

Run: `cd frontend && npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 4: Full visual QA of home page**

Navigate to `http://localhost:5173/` and check every section:
- Navbar: fixed, blur, links, icons
- Hero: image, gradient, text, button, hover zoom
- Bento: 3 cards, hover effects, responsive
- Products: 3 cards, circular images, cart button on hover
- Testimonial: quote, text, avatar
- Newsletter: blur, tilted image, form
- Footer: 4 columns, links hover, copyright

- [ ] **Step 5: Commit**

```bash
git rm frontend/src/components/home/home.css
git commit -m "chore: delete home.css — all styles migrated to Tailwind"
```

---

## Task 9: Clean up admin page inline styles

**Files:**
- Modify: `src/layouts/AdminLayout.tsx`
- Modify: `src/pages/AdminDashboard.tsx`
- Modify: `src/pages/Login.tsx`

The admin pages already use Tailwind but fall back to `style={{ color: 'var(--color-text)' }}` for CSS variable access. Since Tailwind v4 `@theme` variables are available as utilities (e.g., `text-text`, `bg-primary`), we can replace these inline styles.

- [ ] **Step 1: Rewrite AdminLayout — replace inline styles with Tailwind**

```tsx
import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { to: '/admin/produtos', label: 'Produtos', icon: 'inventory_2' },
  { to: '/admin/pedidos', label: 'Pedidos', icon: 'shopping_bag' },
  { to: '/admin/config', label: 'Configuracoes', icon: 'settings' },
];

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/produtos': 'Produtos',
  '/admin/pedidos': 'Pedidos',
  '/admin/config': 'Configuracoes',
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] ?? 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px] flex flex-col
          bg-surface-white border-r border-border
          transition-transform duration-200 ease-in-out
          md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-5">
          <span className="font-heading text-xl font-bold text-primary">
            Soothe
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-container text-primary">
            Admin
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 no-underline transition-colors duration-150 text-sm ${
                  isActive
                    ? 'bg-primary-container text-primary font-semibold'
                    : 'text-text-secondary hover:bg-surface-container'
                }`
              }
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm cursor-pointer border-0 bg-transparent text-text-secondary hover:bg-surface-container transition-colors duration-150"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Sair
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="md:ml-[260px] min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 bg-background border-b border-border">
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border-0 cursor-pointer bg-surface-container text-text"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
          <h1 className="font-heading text-lg font-semibold text-text">
            {pageTitle}
          </h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

Key improvements:
- Removed ALL `style={{}}` props — pure Tailwind
- Replaced JS `onMouseEnter`/`onMouseLeave` with Tailwind `hover:`
- NavLink uses `className` callback function with Tailwind conditional classes

- [ ] **Step 2: Rewrite AdminDashboard — replace inline styles**

```tsx
import { Card, Typography } from 'antd';

const { Text } = Typography;

const stats = [
  { label: 'Pedidos', value: '24', icon: 'shopping_bag', trend: '+12%' },
  { label: 'Receita', value: 'R$ 4.320', icon: 'payments', trend: '+8%' },
  { label: 'Produtos', value: '56', icon: 'inventory_2', trend: '+3' },
  { label: 'Clientes', value: '182', icon: 'group', trend: '+15%' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="max-w-5xl">
      {/* Greeting */}
      <div className="mb-8">
        <h2 className="font-heading text-2xl font-bold text-text mb-1">
          {getGreeting()} &#x1f44b;
        </h2>
        <Text type="secondary" className="!text-[15px]">
          {today.charAt(0).toUpperCase() + today.slice(1)}
        </Text>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} size="small" className="!rounded-sm">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-container text-primary">
                <span className="material-symbols-outlined text-xl">{stat.icon}</span>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-surface-container text-text-secondary">
                {stat.trend}
              </span>
            </div>
            <p className="font-heading text-2xl font-bold text-text mb-0.5">
              {stat.value}
            </p>
            <Text type="secondary" className="!text-[13px]">
              {stat.label}
            </Text>
          </Card>
        ))}
      </div>

      {/* Placeholder section */}
      <div className="rounded-xl p-10 flex flex-col items-center justify-center text-center border-2 border-dashed border-border min-h-[240px]">
        <span className="material-symbols-outlined mb-3 text-[40px] text-border">
          bar_chart
        </span>
        <p className="text-base font-semibold text-text-secondary mb-1">
          Em breve
        </p>
        <Text type="secondary" className="!text-[13px]">
          Graficos de vendas, tabela de pedidos recentes e mais.
        </Text>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Rewrite Login — replace inline styles**

```tsx
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Link: AntLink } = Typography;

export default function Login() {
  const navigate = useNavigate();

  const onFinish = () => {
    localStorage.setItem('admin_token', 'mock');
    navigate('/admin');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left — decorative panel */}
      <div
        className="hidden md:flex flex-col justify-between p-12"
        style={{
          background: 'linear-gradient(160deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary-hover) 100%)',
        }}
      >
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-[0.15em] uppercase rounded-full bg-white/[0.12] text-on-primary">
            Admin
          </span>
        </div>

        <div className="max-w-sm">
          <h1 className="font-heading text-5xl font-bold leading-tight text-on-primary mb-4">
            Soothe
          </h1>
          <p className="text-lg leading-relaxed text-on-primary/80">
            Gerencie seu marketplace de enxoval com simplicidade e elegancia.
          </p>
        </div>

        <p className="text-sm text-on-primary/50">
          &copy; 2026 Soothe
        </p>
      </div>

      {/* Right — login form */}
      <div className="flex items-center justify-center p-8 md:p-16 bg-background">
        <div className="w-full max-w-sm">
          {/* Mobile-only brand */}
          <div className="md:hidden mb-8 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary">
              Soothe
            </h2>
          </div>

          <div className="mb-8">
            <Title level={3} style={{ marginBottom: 4 }}>
              Bem-vindo de volta
            </Title>
            <Text type="secondary">
              Entre com suas credenciais para acessar o painel.
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish} size="large">
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: 'Informe seu e-mail' },
                { type: 'email', message: 'E-mail invalido' },
              ]}
            >
              <Input placeholder="seu@email.com" />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[{ required: true, message: 'Informe sua senha' }]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item className="!mb-4">
              <Button type="primary" htmlType="submit" block>
                Entrar
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-6">
            <AntLink href="/" className="!text-text-secondary !text-sm">
              &larr; Voltar a loja
            </AntLink>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Note: the gradient `background` stays as inline style because Tailwind v4 doesn't have a multi-stop gradient with CSS variables built-in. This is the one acceptable exception.

- [ ] **Step 4: Visually verify all admin pages**

Navigate to:
- `/admin/login` — split screen, gradient, form
- Click "Entrar" — redirects to `/admin`
- `/admin` — sidebar, header, stat cards, placeholder
- Test mobile responsive
- "Sair" button works

- [ ] **Step 5: Commit**

```bash
git add frontend/src/layouts/AdminLayout.tsx frontend/src/pages/AdminDashboard.tsx frontend/src/pages/Login.tsx
git commit -m "refactor: replace inline styles with Tailwind classes in admin pages"
```

---

## Task 10: Add missing admin routes + 404 page

**Files:**
- Create: `src/pages/AdminProducts.tsx`
- Create: `src/pages/AdminOrders.tsx`
- Create: `src/pages/AdminSettings.tsx`
- Create: `src/pages/NotFound.tsx`
- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Create AdminProducts.tsx**

```tsx
export default function AdminProducts() {
  return (
    <div className="max-w-5xl">
      <div className="rounded-xl p-10 flex flex-col items-center justify-center text-center border-2 border-dashed border-border min-h-[400px]">
        <span className="material-symbols-outlined mb-3 text-[40px] text-border">
          inventory_2
        </span>
        <p className="font-heading text-lg font-semibold text-text mb-1">Produtos</p>
        <p className="text-sm text-text-secondary">
          Gerenciamento de produtos sera implementado aqui.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create AdminOrders.tsx**

```tsx
export default function AdminOrders() {
  return (
    <div className="max-w-5xl">
      <div className="rounded-xl p-10 flex flex-col items-center justify-center text-center border-2 border-dashed border-border min-h-[400px]">
        <span className="material-symbols-outlined mb-3 text-[40px] text-border">
          shopping_bag
        </span>
        <p className="font-heading text-lg font-semibold text-text mb-1">Pedidos</p>
        <p className="text-sm text-text-secondary">
          Gerenciamento de pedidos sera implementado aqui.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create AdminSettings.tsx**

```tsx
export default function AdminSettings() {
  return (
    <div className="max-w-5xl">
      <div className="rounded-xl p-10 flex flex-col items-center justify-center text-center border-2 border-dashed border-border min-h-[400px]">
        <span className="material-symbols-outlined mb-3 text-[40px] text-border">
          settings
        </span>
        <p className="font-heading text-lg font-semibold text-text mb-1">Configuracoes</p>
        <p className="text-sm text-text-secondary">
          Configuracoes do sistema serao implementadas aqui.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create NotFound.tsx**

```tsx
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="font-heading text-8xl font-extrabold text-primary mb-4">404</h1>
        <p className="text-xl text-text mb-2 font-semibold">Pagina nao encontrada</p>
        <p className="text-text-secondary mb-8">
          A pagina que voce esta procurando nao existe ou foi movida.
        </p>
        <Button type="primary" size="large" onClick={() => navigate('/')}>
          Voltar ao inicio
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Update routes/index.tsx**

```tsx
import { createBrowserRouter } from 'react-router-dom';
import StoreLayout from '../layouts/StoreLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProtectedRoute from '../components/admin/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import AdminProducts from '../pages/AdminProducts';
import AdminOrders from '../pages/AdminOrders';
import AdminSettings from '../pages/AdminSettings';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StoreLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'produtos', element: <AdminProducts /> },
          { path: 'pedidos', element: <AdminOrders /> },
          { path: 'config', element: <AdminSettings /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
```

- [ ] **Step 6: Verify routes work**

Navigate to:
- `/admin/produtos` — shows placeholder with inventory icon
- `/admin/pedidos` — shows placeholder with shopping bag icon
- `/admin/config` — shows placeholder with settings icon
- `/random-page` — shows 404 page
- Sidebar navigation highlights correct item on each route

- [ ] **Step 7: Commit**

```bash
git add frontend/src/pages/AdminProducts.tsx frontend/src/pages/AdminOrders.tsx frontend/src/pages/AdminSettings.tsx frontend/src/pages/NotFound.tsx frontend/src/routes/index.tsx
git commit -m "feat: add missing admin routes (placeholder) and 404 page"
```

---

## Task 11: Fix auth token key mismatch

**Files:**
- Modify: `src/services/api.ts`

- [ ] **Step 1: Fix token key in api.ts**

The interceptor reads `'token'` but the auth system uses `'admin_token'`. Align them.

Change line 5 of `api.ts`:
```ts
// Before
const token = localStorage.getItem('token');

// After
const token = localStorage.getItem('admin_token');
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/services/api.ts
git commit -m "fix: align api interceptor token key with admin auth"
```

---

## Task 12: Final verification

- [ ] **Step 1: Full build check**

Run: `cd frontend && npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Run linter**

Run: `cd frontend && npm run lint`
Expected: No errors (warnings acceptable)

- [ ] **Step 3: Full visual QA**

Open `http://localhost:5173/` and check:
1. Home page — all 5 sections render correctly with hover effects and responsive
2. `/admin/login` — split screen, form, gradient
3. `/admin` — sidebar, header, dashboard with stats
4. `/admin/produtos` — placeholder page
5. `/admin/pedidos` — placeholder page
6. `/admin/config` — placeholder page
7. Sidebar navigation highlights correctly
8. Mobile responsive on all pages
9. `/does-not-exist` — shows 404 page

- [ ] **Step 4: Verify no remaining CSS files except global.css**

Run: `find frontend/src -name "*.css" -type f`
Expected: only `frontend/src/styles/global.css`

- [ ] **Step 5: Verify no remaining inline `style=` using CSS variables**

Run: `grep -rn "style={{" frontend/src/ --include="*.tsx" | grep "var(--"`
Expected: only Login.tsx gradient (the one acceptable exception)
