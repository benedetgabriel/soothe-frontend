# Frontend Redesign — Editorial Organic Minimalism

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the entire frontend source (`frontend/src/`) from scratch using the "Weightless Sanctuary" editorial design system (Playfair Display + Inter, earthy palette, no-border philosophy, asymmetric layouts) while preserving all infrastructure (Vite config, TypeScript, ESLint, package.json, react-hook-form, axios).

**Architecture:** Wipe `frontend/src/` clean and rebuild file-by-file. Keep the same directory structure pattern (pages/, layouts/, components/, routes/, services/, types/). The design tokens from `frontend/example/code.html` get mapped to Tailwind v4 `@theme` variables. All content remains in Portuguese. Brand name stays "Soothe". Admin panel shares the same design system.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4, TypeScript 5.9, react-hook-form, axios, react-router-dom 7

**Reference files:**
- Design spec: `frontend/example/DESIGN.md`
- HTML reference: `frontend/example/code.html`
- Screenshot: `frontend/example/screen.png`

---

## Design System Summary (from DESIGN.md + HTML)

### Colors
```
primary:                 #625e55   (warm charcoal)
primary-dim:             #565249   (hover state)
primary-container:       #e9e2d6   (secondary button bg, active nav)
on-primary:              #fef7ea   (text on primary)
on-primary-container:    #555148   (text on primary-container)
secondary:               #5e5f5d
secondary-container:     #e3e2e0
on-secondary:            #faf9f6
surface:                 #faf9f6   (page bg)
surface-container-lowest:#ffffff   (floating cards)
surface-container-low:   #f4f4f0   (section bg)
surface-container:       #edeeea   (footer bg)
surface-container-high:  #e6e9e4   (input bg, card bg)
surface-container-highest:#e0e4de  (card bg alt)
on-surface:              #2f3430   (main text)
on-surface-variant:      #5c605c   (secondary text)
on-background:           #2f3430
outline:                 #777c77
outline-variant:         #afb3ae
error:                   #9e422c
error-container:         #fe8b70
```

### Typography
- **Headline:** Playfair Display (serif) — display titles, quotes, brand
- **Body:** Inter (sans-serif) — paragraphs, labels, nav links, buttons

### Border Radius
- DEFAULT: `1rem` (16px) — general elements
- `lg`: `2rem` (32px) — large cards
- `xl`: `3rem` (48px) — signature cards, hero images
- `full`: `9999px` — buttons, pills, navbar

### Key Rules
1. **No-Line Rule:** No 1px borders to define sections or cards. Use bg color shifts only.
2. **Ambient Shadows:** `box-shadow: 0 20px 40px rgba(47, 52, 48, 0.05)` — never pure black.
3. **Ghost Border (inputs only):** `outline-variant` at 20% opacity on focus.
4. **Generous spacing:** When in doubt, add more whitespace.
5. **Pill buttons:** `rounded-full`, primary gradient from `primary` to `primary-dim`.

---

## File Structure

### Files to wipe and recreate (entire `src/` directory)

| File | Responsibility |
|------|---------------|
| `src/styles/global.css` | Tailwind import + @theme tokens + base styles |
| `src/components/ui/Button.tsx` | Primary/secondary/ghost/link button variants |
| `src/components/ui/Input.tsx` | Form input with label, error, password toggle |
| `src/components/ui/Avatar.tsx` | Simple circular image |
| `src/components/ui/index.ts` | Barrel export |
| `src/layouts/StoreLayout.tsx` | Floating navbar + footer + `<Outlet />` |
| `src/layouts/AdminLayout.tsx` | Sidebar + header + `<Outlet />` |
| `src/pages/Home.tsx` | Asymmetric gallery, quote, CTA section |
| `src/pages/Login.tsx` | Split screen login form |
| `src/pages/AdminDashboard.tsx` | Stats + placeholder |
| `src/pages/AdminProducts.tsx` | Placeholder |
| `src/pages/AdminOrders.tsx` | Placeholder |
| `src/pages/AdminSettings.tsx` | Placeholder |
| `src/pages/NotFound.tsx` | 404 page |
| `src/components/admin/ProtectedRoute.tsx` | Auth guard (localStorage) |
| `src/routes/index.tsx` | All routes |
| `src/services/api.ts` | Axios instance + interceptors |
| `src/types/api.ts` | API envelope types |
| `src/App.tsx` | RouterProvider wrapper |
| `src/main.tsx` | React entry point |

### Files to modify (outside src/)

| File | Change |
|------|--------|
| `index.html` | Swap Google Fonts to Playfair Display + Inter |

### Files to NOT touch
- `vite.config.ts` — already correct
- `tsconfig*.json` — already correct
- `eslint.config.js` — already correct
- `package.json` — already correct (has react-hook-form, no antd)
- `package-lock.json` — no changes needed

---

## Task 1: Design Foundation (global.css + index.html)

**Files:**
- Modify: `index.html`
- Create: `src/styles/global.css`

- [ ] **Step 1: Update `index.html` fonts**

Replace the Manrope + Plus Jakarta Sans font link with Playfair Display + Inter.

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Soothe Sanctuary</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Create `src/styles/global.css` with new design tokens**

```css
@import "tailwindcss";

@theme {
  /* Primary */
  --color-primary: #625e55;
  --color-primary-dim: #565249;
  --color-primary-container: #e9e2d6;
  --color-on-primary: #fef7ea;
  --color-on-primary-container: #555148;

  /* Secondary */
  --color-secondary: #5e5f5d;
  --color-secondary-container: #e3e2e0;
  --color-on-secondary: #faf9f6;

  /* Surface hierarchy */
  --color-surface: #faf9f6;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f4f4f0;
  --color-surface-container: #edeeea;
  --color-surface-container-high: #e6e9e4;
  --color-surface-container-highest: #e0e4de;

  /* Text */
  --color-on-surface: #2f3430;
  --color-on-surface-variant: #5c605c;
  --color-on-background: #2f3430;

  /* Utility */
  --color-outline: #777c77;
  --color-outline-variant: #afb3ae;
  --color-error: #9e422c;
  --color-error-container: #fe8b70;

  /* Typography */
  --font-headline: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;

  /* Border Radius */
  --radius-DEFAULT: 1rem;
  --radius-lg: 2rem;
  --radius-xl: 3rem;
  --radius-full: 9999px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  color: var(--color-on-surface);
  background-color: var(--color-surface);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4 {
  font-family: var(--font-headline);
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}

::selection {
  background-color: var(--color-primary-container);
  color: var(--color-on-primary-container);
}
```

- [ ] **Step 3: Verify Tailwind picks up the tokens**

Run: `cd frontend && npm run build`
Expected: Build succeeds (even if pages are broken, the CSS compiles)

- [ ] **Step 4: Commit**

```bash
git add frontend/index.html frontend/src/styles/global.css
git commit -m "refactor: update design foundation — Playfair Display + Inter, new earthy palette"
```

---

## Task 2: Base UI Components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Avatar.tsx`
- Create: `src/components/ui/index.ts`

- [ ] **Step 1: Create `src/components/ui/Button.tsx`**

Design spec: pill shape, primary uses gradient from `primary` to `primary-dim`, secondary uses `primary-container`. Ambient shadow on primary. Hover reduces shadow ("settles").

```tsx
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', block = false, className = '', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-gradient-to-b from-primary to-primary-dim text-on-primary rounded-full shadow-[0_20px_40px_rgba(47,52,48,0.1)] hover:shadow-[0_10px_20px_rgba(47,52,48,0.08)]',
      secondary:
        'bg-primary-container text-on-primary-container rounded-full hover:bg-surface-container-highest',
      ghost:
        'bg-transparent text-on-surface-variant hover:bg-surface-container-high rounded-lg',
      link:
        'bg-transparent text-primary hover:underline p-0 h-auto',
    };

    const sizes = {
      sm: 'h-10 px-6 text-sm',
      md: 'h-12 px-10 text-base',
      lg: 'h-14 px-10 text-base',
    };

    const width = block ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${variant !== 'link' ? sizes[size] : ''} ${width} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
```

- [ ] **Step 2: Create `src/components/ui/Input.tsx`**

Design spec: `surface-container-high` background, no border, `md` radius (1.5rem → use `rounded-[1.5rem]`). Focus: shift to `surface-container-highest` + ghost border at 20% opacity.

```tsx
import { forwardRef, useState } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, isPassword = false, className = '', type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : (type ?? 'text');

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium tracking-wide text-on-surface-variant mb-2 uppercase">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`
              w-full h-12 px-5 rounded-[1.5rem]
              bg-surface-container-high text-on-surface
              border-none outline-none
              transition-all duration-200
              placeholder:text-on-surface-variant/40
              focus:bg-surface-container-highest
              focus:ring-1 focus:ring-outline-variant/20
              ${error ? 'ring-1 ring-error/40' : ''}
              ${isPassword ? 'pr-12' : ''}
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface bg-transparent border-none cursor-pointer p-0"
            >
              <span className="material-symbols-outlined text-xl">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
```

- [ ] **Step 3: Create `src/components/ui/Avatar.tsx`**

```tsx
interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function Avatar({ src, alt, size = 48, className = '' }: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
```

- [ ] **Step 4: Create `src/components/ui/index.ts`**

```ts
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Avatar } from './Avatar';
```

- [ ] **Step 5: Verify types compile**

Run: `cd frontend && npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 6: Commit**

```bash
git add frontend/src/components/ui/
git commit -m "feat: create base UI components with editorial design system"
```

---

## Task 3: Store Layout (Floating Navbar + Footer)

**Files:**
- Create: `src/layouts/StoreLayout.tsx`

The navbar is the signature element: a floating pill centered on the page with glassmorphism. The footer uses a rounded-top container with minimal links.

- [ ] **Step 1: Create `src/layouts/StoreLayout.tsx`**

```tsx
import { Outlet } from 'react-router-dom';

export default function StoreLayout() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Floating Pill Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl rounded-full bg-surface/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(47,52,48,0.05)] z-50 flex justify-between items-center px-10 py-4">
        <div className="font-headline text-2xl italic text-on-surface">Soothe</div>

        <div className="hidden md:flex items-center gap-10">
          <a className="font-headline text-on-surface-variant hover:text-on-surface transition-colors duration-300 tracking-tight text-lg" href="#">
            Loja
          </a>
          <a className="font-headline text-on-surface-variant hover:text-on-surface transition-colors duration-300 tracking-tight text-lg" href="#">
            Materiais
          </a>
          <a className="font-headline text-on-surface-variant hover:text-on-surface transition-colors duration-300 tracking-tight text-lg" href="#">
            Nossa Historia
          </a>
        </div>

        <div className="flex items-center gap-6 text-on-surface-variant">
          <button className="hover:text-on-surface transition-colors duration-200 bg-transparent border-none cursor-pointer text-inherit">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="hover:text-on-surface transition-colors duration-200 bg-transparent border-none cursor-pointer text-inherit">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
          <button className="hover:text-on-surface transition-colors duration-200 bg-transparent border-none cursor-pointer text-inherit">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </nav>

      {/* Page content */}
      <main className="pt-32 pb-20 px-6 max-w-[1600px] mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full rounded-t-[48px] mt-20 bg-surface-container flex flex-col md:flex-row justify-between items-center px-12 py-16">
        <div className="mb-8 md:mb-0">
          <div className="font-headline text-xl text-on-surface mb-2">Soothe Editorial.</div>
          <p className="text-on-surface-variant text-sm tracking-wide">Conforto Restaurado.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-8 md:mb-0">
          <a className="text-on-surface-variant hover:text-on-surface transition-colors text-sm tracking-wide" href="#">Sustentabilidade</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors text-sm tracking-wide" href="#">Envio</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors text-sm tracking-wide" href="#">Trocas</a>
          <a className="text-on-surface-variant hover:text-on-surface transition-colors text-sm tracking-wide" href="#">Privacidade</a>
        </div>
        <div className="text-on-surface-variant text-xs tracking-widest opacity-80">
          &copy; 2026 Soothe Editorial. Conforto Restaurado.
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/layouts/StoreLayout.tsx
git commit -m "feat: build StoreLayout with floating pill navbar and minimal footer"
```

---

## Task 4: Home Page (Asymmetric Gallery)

**Files:**
- Create: `src/pages/Home.tsx`

This is the hero of the design — an asymmetric 12-column bento gallery with hover zoom effects, a floating quote block, and a CTA section. Replicate the exact layout from `frontend/example/code.html`.

- [ ] **Step 1: Create `src/pages/Home.tsx`**

Use the same image URLs from the HTML example. Layout: 12-column grid with `md:col-span-8`/`md:col-span-4` alternating pattern.

```tsx
import { Button } from '../components/ui';

const IMAGES = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH4OPYc_orbndkRgM2vyUciIXfl8NVWeCltvgSEFdkl2fYbuV9Kd8R_CemUuHgtENWWfcBBHqWkYU5EicyzTldPmthBThRug2m6uMS_0RTmTVWOJZagtOTBAmAqdzrNlqapA4stbf1m5VeGfDXDnex_5alQ4y59ihf4F_4XyamIBw7WrY6e69--yK0NEI2LY8nI-WRWWn_qqo51eSKyjcLJwlo4iF5TScMHkmU2oYrDmCVhrq4aOy2ALFDcSHa0FXvZJ4UnP9oI8Ct',
  stack: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQn2T82PP8t89f4ZFGUmwdTBDIgVqRPe9pGrjP4oAGbJ8WSb8TnZZJtE_jpRRrmypkgKRtMnucLevgWS97zbFyBSCp7n13jPA59n1SpgxAGXOPmMgSXuNoCrBS08eqaPcd-gB64LRmvL5Iz85yeBFGEU7qQ_VWAK2MEv7zPP3W4dlFSz_XRm3hXdP7BqwRX2tOC36hfAzirRAq9SXRd_BRCPs8GScVfKlbW0jYRq8mnZx9WndPSq826loXPDOs2TeSF1SK4xRy6AzS',
  detail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8z2ccSTmz9ruIjgsh3H8I5gPw1wgCw-RbgVwnQwcugOFveMMEZGljbNFU_leScLPTPTXKS0wTEXyhFqy3eFGr3FdmEk9kOdt2Ow_DgAeYTT7Lqoz5K2nhCVmy-XCg4As63reHhADCLUvFYBRDTh2XsfuFoqPqq6oZo7qxPF-nSLBWa3-048RCjIDtym7RgmPTxYAHk8P9Lyhb6lOcO6TLNqyPwpxYgCbDE_Y_mC-B4X0kDQis0R8wcMCqn-PA25kWSbQgAl6fr42C',
  velvet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7ry3Ct1G7hhqmlDcf24VcUS5d9eThS5C9eDk7kYA2vCWXTk2cppvT6yMYl6nZoWNFUOzfTPA2RsHcTBSiQfF21XJEwzDmTngbJZKulVWzUGWSGfFdgDRGwAK6LGRJ0lKbSueNG_vm2rLjV6yjfMMyq-e-b3mU_AkRb-D4sy9cuYiEMmiNKchkeqULlU6xp0bA3ZLnZqMxYUHo7je5Gk8z3xkvyDB5Laap_0hOSA4e6U1AG2ZGHVo9VEiMvqq7kD7dODOjiVO_KqUL',
  sofa: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_12EJlJbSl7-UpL08AegNG8UMQ3E1HTkvs3uUA88snRzRNt0c5ERlT5AptGIAoVY3WXYf9Paav3Kq4Vlsw_pcW__vcpnqLTJEIUs0_rRlCUtGyuf1yrs5tHCfi-74NR8YOOjhz35P2V6eaNbupTIoauyQacmQbD05A0PgnV0Zxtsz2bj6ixUoSY9wrZt6zC_2ithK5FImGJEGUub8LK11Do4sDSYg0k5ipVXtMl-CSsIm4u4_GpvqFNTDGPWOmqzDL2FWP_74HmTY',
  silk: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAb3j2AQpgXb0AiUx26v-cNj-Xl9xIzhOp6KxmJnPd5gwu8N816kb2md6Lj7zNRU1ClxaP_Jcm5OS18fNlO4gTzXaXcrqbJkW3DH2tqH-2HprzswZiR_1KsIOEMe8g0TyqZc2H7MWiyXACIEJQsQQhOf7ceB-CrHdkKQlmnP6DwwbO2MjjW0TeLJMsti1DxHhkoxL8wXhduAGsFrmKLuF4PaqUNdzlyhdBFTW4oCOEcZb-d0CJy-xfqJrP9zBJtZ3ZDqSYIMHmGbxT',
};

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="mb-16 md:mb-24 text-center">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-on-background leading-tight mb-6">
          Galeria Interativa
        </h1>
        <p className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl font-light tracking-wide leading-relaxed">
          Uma curadoria de texturas restauradoras e formas esculturais. Explore nossas almofadas como pecas de arte funcional projetadas para o santuario do descanso.
        </p>
      </header>

      {/* Asymmetric Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Large Focus Piece */}
        <div className="md:col-span-8 group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-high h-[500px] md:h-[700px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={IMAGES.hero}
              alt="Almofada de linho premium marfim em sofa bege com luz suave"
            />
            <div className="absolute bottom-10 left-10 text-on-surface">
              <span className="text-xs uppercase tracking-widest font-semibold mb-2 block opacity-60">
                Serie Principal
              </span>
              <h3 className="font-headline text-3xl md:text-4xl italic">Cloud Silk Lombar</h3>
            </div>
          </div>
        </div>

        {/* Tall Secondary Column */}
        <div className="md:col-span-4 flex flex-col gap-8 lg:gap-12">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-highest h-[400px] transition-transform duration-700 ease-out hover:scale-[1.01]">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                src={IMAGES.stack}
                alt="Pilha de almofadas de linho em tons neutros terrosos"
              />
            </div>
            <div className="mt-4 px-2">
              <p className="font-headline text-xl">Heritage Weave</p>
              <p className="text-on-surface-variant text-sm tracking-wide">Algodao organico fiado a mao</p>
            </div>
          </div>
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-surface-container h-[260px] transition-transform duration-700 ease-out hover:scale-[1.01]">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                src={IMAGES.detail}
                alt="Detalhe de costura em almofada verde salvia"
              />
            </div>
          </div>
        </div>

        {/* Third Row */}
        <div className="md:col-span-4 group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-low h-[500px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={IMAGES.velvet}
              alt="Almofada redonda de veludo ocre em cama minimalista"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
        <div className="md:col-span-8 group cursor-pointer">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-high h-[500px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={IMAGES.sofa}
              alt="Sala iluminada com almofadas texturizadas em sofa boucle curvo"
            />
            <div className="absolute top-10 right-10 text-right">
              <span className="text-xs uppercase tracking-widest font-semibold mb-2 block opacity-60">
                Edicao Limitada
              </span>
              <h3 className="font-headline text-3xl">O Ensemble</h3>
            </div>
          </div>
        </div>

        {/* Floating Quote Block */}
        <div className="md:col-span-5 md:col-start-2 py-12 md:py-24">
          <p className="font-headline text-4xl lg:text-5xl leading-tight text-on-surface">
            "Conforto nao e apenas uma sensacao fisica, mas um estado mental de absoluta{' '}
            <span className="italic">quietude</span>."
          </p>
          <div className="w-20 h-px bg-primary mt-8" />
        </div>

        {/* Final Gallery Piece */}
        <div className="md:col-span-6 group cursor-pointer md:mt-12">
          <div className="relative overflow-hidden rounded-xl bg-surface-container h-[400px] transition-transform duration-700 ease-out hover:scale-[1.01]">
            <img
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              src={IMAGES.silk}
              alt="Macrofotografia de fibras de seda mostrando textura cintilante"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="mt-32 text-center">
        <h2 className="font-headline text-4xl mb-10">Curado para Voce</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg">Explorar Todas as Pecas</Button>
          <Button variant="secondary" size="lg">Historia dos Materiais</Button>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/pages/Home.tsx
git commit -m "feat: build Home page with asymmetric editorial gallery"
```

---

## Task 5: Infrastructure (routes, api, types, auth, app)

**Files:**
- Create: `src/App.tsx`
- Create: `src/main.tsx`
- Create: `src/routes/index.tsx`
- Create: `src/services/api.ts`
- Create: `src/types/api.ts`
- Create: `src/components/admin/ProtectedRoute.tsx`

These are carried over from the previous project with no design changes — they're pure logic.

- [ ] **Step 1: Create `src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 2: Create `src/App.tsx`**

```tsx
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export default function App() {
  return <RouterProvider router={router} />;
}
```

- [ ] **Step 3: Create `src/components/admin/ProtectedRoute.tsx`**

```tsx
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
```

- [ ] **Step 4: Create `src/services/api.ts`**

```ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiErrors = error.response?.data?.errors;
    if (apiErrors && apiErrors.length > 0) {
      return Promise.reject({ errors: apiErrors, status: error.response.status });
    }
    return Promise.reject(error);
  }
);

export default api;
```

- [ ] **Step 5: Create `src/types/api.ts`**

```ts
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  errors: ApiError[];
}

export interface ApiError {
  field: string | null;
  message: string;
}
```

- [ ] **Step 6: Create `src/routes/index.tsx`** (placeholder — imports will be updated in Task 8)

```tsx
import { createBrowserRouter } from 'react-router-dom';
import StoreLayout from '../layouts/StoreLayout';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StoreLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
]);
```

- [ ] **Step 7: Verify build**

Run: `cd frontend && npm run build`
Expected: Build succeeds. The store home page should render correctly.

- [ ] **Step 8: Commit**

```bash
git add frontend/src/App.tsx frontend/src/main.tsx frontend/src/routes/index.tsx frontend/src/services/api.ts frontend/src/types/api.ts frontend/src/components/admin/ProtectedRoute.tsx
git commit -m "feat: port infrastructure — routes, api client, auth guard"
```

---

## Task 6: Login Page

**Files:**
- Create: `src/pages/Login.tsx`

Split screen: left panel with editorial gradient, right panel with form. Uses react-hook-form + our custom Input/Button components. Design matches the new palette.

- [ ] **Step 1: Create `src/pages/Login.tsx`**

```tsx
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/ui';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = () => {
    localStorage.setItem('admin_token', 'mock');
    navigate('/admin');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left — editorial panel */}
      <div className="hidden md:flex flex-col justify-end p-16 bg-gradient-to-br from-primary via-primary-dim to-[#4a473f] relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(233,226,214,0.15),transparent)]" />
        <div className="relative z-10">
          <p className="text-on-primary/40 text-xs uppercase tracking-[0.2em] font-medium mb-4">
            Painel Administrativo
          </p>
          <h1 className="font-headline text-5xl text-on-primary leading-tight mb-4">
            Soothe
          </h1>
          <p className="text-on-primary/60 text-lg font-light leading-relaxed max-w-sm">
            Gerencie seu marketplace de conforto com simplicidade e elegancia.
          </p>
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex items-center justify-center p-8 md:p-16 bg-surface">
        <div className="w-full max-w-sm">
          {/* Mobile brand */}
          <div className="md:hidden mb-10 text-center">
            <h2 className="font-headline text-3xl text-on-surface italic">Soothe</h2>
          </div>

          <div className="mb-10">
            <h3 className="font-headline text-3xl text-on-surface mb-2">Bem-vindo de volta</h3>
            <p className="text-on-surface-variant">
              Entre com suas credenciais para acessar o painel.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'Informe seu e-mail',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'E-mail invalido',
                },
              })}
            />

            <Input
              label="Senha"
              isPassword
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', { required: 'Informe sua senha' })}
            />

            <div className="pt-2">
              <Button type="submit" block>Entrar</Button>
            </div>
          </form>

          <div className="text-center mt-8">
            <a href="/" className="text-on-surface-variant text-sm hover:text-on-surface transition-colors">
              &larr; Voltar a loja
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/pages/Login.tsx
git commit -m "feat: build Login page with editorial split-screen design"
```

---

## Task 7: Admin Layout

**Files:**
- Create: `src/layouts/AdminLayout.tsx`

Same sidebar structure but adapted to the editorial design: no borders (separation through bg shifts), `primary-container` for active state, `font-headline` for brand, ambient shadow on hover.

- [ ] **Step 1: Create `src/layouts/AdminLayout.tsx`**

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
    <div className="min-h-screen bg-surface">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — no borders, bg shift only */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px] flex flex-col
          bg-surface-container-low
          transition-transform duration-200 ease-in-out
          md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-6">
          <span className="font-headline text-xl italic text-on-surface">Soothe</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container">
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
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 no-underline transition-all duration-200 text-sm ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-medium'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`
              }
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm cursor-pointer border-none bg-transparent text-on-surface-variant hover:bg-surface-container-high transition-all duration-200"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            Sair
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="md:ml-[260px] min-h-screen flex flex-col">
        {/* Header — no border, just bg shift */}
        <header className="sticky top-0 z-30 flex items-center gap-4 px-8 py-5 bg-surface">
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border-none cursor-pointer bg-surface-container-high text-on-surface"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
          <h1 className="font-headline text-xl text-on-surface">{pageTitle}</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/layouts/AdminLayout.tsx
git commit -m "feat: build AdminLayout with editorial design — no borders, tonal layering"
```

---

## Task 8: Admin Pages (Dashboard + Placeholders + 404)

**Files:**
- Create: `src/pages/AdminDashboard.tsx`
- Create: `src/pages/AdminProducts.tsx`
- Create: `src/pages/AdminOrders.tsx`
- Create: `src/pages/AdminSettings.tsx`
- Create: `src/pages/NotFound.tsx`
- Modify: `src/routes/index.tsx` (add all admin routes)

- [ ] **Step 1: Create `src/pages/AdminDashboard.tsx`**

Cards use `surface-container-lowest` (white) bg, `xl` radius, no border. Ambient shadow on hover.

```tsx
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
      <div className="mb-10">
        <h2 className="font-headline text-3xl text-on-surface mb-2">
          {getGreeting()} &#x1f44b;
        </h2>
        <p className="text-on-surface-variant">
          {today.charAt(0).toUpperCase() + today.slice(1)}
        </p>
      </div>

      {/* Stat cards — no borders, tonal bg, ambient shadow on hover */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(47,52,48,0.05)] hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-container text-on-primary-container">
                <span className="material-symbols-outlined text-xl">{stat.icon}</span>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant">
                {stat.trend}
              </span>
            </div>
            <p className="font-headline text-2xl text-on-surface mb-1">{stat.value}</p>
            <p className="text-sm text-on-surface-variant">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Placeholder */}
      <div className="rounded-xl p-12 flex flex-col items-center justify-center text-center bg-surface-container-lowest min-h-[240px]">
        <span className="material-symbols-outlined mb-4 text-[40px] text-outline-variant">
          bar_chart
        </span>
        <p className="font-headline text-lg text-on-surface mb-1">Em breve</p>
        <p className="text-sm text-on-surface-variant">
          Graficos de vendas, tabela de pedidos recentes e mais.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create admin placeholder pages**

`src/pages/AdminProducts.tsx`:
```tsx
export default function AdminProducts() {
  return (
    <div className="max-w-5xl">
      <div className="rounded-xl p-12 flex flex-col items-center justify-center text-center bg-surface-container-lowest min-h-[400px]">
        <span className="material-symbols-outlined mb-4 text-[40px] text-outline-variant">inventory_2</span>
        <p className="font-headline text-lg text-on-surface mb-1">Produtos</p>
        <p className="text-sm text-on-surface-variant">Gerenciamento de produtos sera implementado aqui.</p>
      </div>
    </div>
  );
}
```

`src/pages/AdminOrders.tsx`:
```tsx
export default function AdminOrders() {
  return (
    <div className="max-w-5xl">
      <div className="rounded-xl p-12 flex flex-col items-center justify-center text-center bg-surface-container-lowest min-h-[400px]">
        <span className="material-symbols-outlined mb-4 text-[40px] text-outline-variant">shopping_bag</span>
        <p className="font-headline text-lg text-on-surface mb-1">Pedidos</p>
        <p className="text-sm text-on-surface-variant">Gerenciamento de pedidos sera implementado aqui.</p>
      </div>
    </div>
  );
}
```

`src/pages/AdminSettings.tsx`:
```tsx
export default function AdminSettings() {
  return (
    <div className="max-w-5xl">
      <div className="rounded-xl p-12 flex flex-col items-center justify-center text-center bg-surface-container-lowest min-h-[400px]">
        <span className="material-symbols-outlined mb-4 text-[40px] text-outline-variant">settings</span>
        <p className="font-headline text-lg text-on-surface mb-1">Configuracoes</p>
        <p className="text-sm text-on-surface-variant">Configuracoes do sistema serao implementadas aqui.</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/pages/NotFound.tsx`**

```tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="font-headline text-8xl text-primary mb-6">404</h1>
        <p className="font-headline text-2xl text-on-surface mb-2">Pagina nao encontrada</p>
        <p className="text-on-surface-variant mb-10">
          A pagina que voce esta procurando nao existe ou foi movida.
        </p>
        <Button onClick={() => navigate('/')}>Voltar ao inicio</Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Update `src/routes/index.tsx` with all routes**

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

- [ ] **Step 5: Verify full build**

Run: `cd frontend && npm run build`
Expected: Build succeeds with 0 errors

- [ ] **Step 6: Commit**

```bash
git add frontend/src/pages/ frontend/src/routes/index.tsx
git commit -m "feat: build admin pages and complete routing with editorial design"
```

---

## Task 9: Wipe Old Source and Verify

**Files:**
- Delete: all old files in `src/` that were NOT recreated above
- Verify: no stale files remain

- [ ] **Step 1: Check for stale files**

After all previous tasks are done, verify the `src/` directory only contains the files listed in the File Structure table above. Delete anything that shouldn't be there:
- `src/styles/tokens.ts` — should already be gone
- `src/styles/theme.ts` — should already be gone
- `src/styles/admin.css` — should already be gone
- `src/components/home/home.css` — should already be gone
- Any other leftover files

Run:
```bash
find frontend/src -type f | sort
```

Expected files:
```
frontend/src/App.tsx
frontend/src/components/admin/ProtectedRoute.tsx
frontend/src/components/ui/Avatar.tsx
frontend/src/components/ui/Button.tsx
frontend/src/components/ui/Input.tsx
frontend/src/components/ui/index.ts
frontend/src/layouts/AdminLayout.tsx
frontend/src/layouts/StoreLayout.tsx
frontend/src/main.tsx
frontend/src/pages/AdminDashboard.tsx
frontend/src/pages/AdminOrders.tsx
frontend/src/pages/AdminProducts.tsx
frontend/src/pages/AdminSettings.tsx
frontend/src/pages/Home.tsx
frontend/src/pages/Login.tsx
frontend/src/pages/NotFound.tsx
frontend/src/routes/index.tsx
frontend/src/services/api.ts
frontend/src/styles/global.css
frontend/src/types/api.ts
```

Delete any files NOT in this list.

- [ ] **Step 2: Final build + lint**

Run: `cd frontend && npm run build && npm run lint`
Expected: Both pass with 0 errors

- [ ] **Step 3: Verify no antd imports remain**

Run: `grep -r "antd" frontend/src/`
Expected: No matches

- [ ] **Step 4: Visual QA checklist**

Run `cd frontend && npm run dev` and check:
1. `/` — floating pill navbar, asymmetric gallery, quote, CTA, footer
2. `/admin/login` — editorial split screen, form validation works, redirect after login
3. `/admin` — sidebar (no borders), dashboard stats, placeholder
4. `/admin/produtos` — placeholder with icon
5. `/admin/pedidos` — placeholder with icon
6. `/admin/config` — placeholder with icon
7. Sidebar navigation highlights correctly
8. Mobile responsive on all pages
9. `/nonexistent` — 404 page

- [ ] **Step 5: Commit**

```bash
git add -A frontend/src/
git commit -m "chore: clean up stale files from old design"
```
