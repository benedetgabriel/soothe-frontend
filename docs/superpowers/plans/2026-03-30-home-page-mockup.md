# Home Page Mockup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the store home page mockup (Step 7 of PROJECT_SPEC.md) using Ant Design + minimal custom CSS, replicating the Stitch prototype structure and aesthetic.

**Architecture:** Page is composed of isolated section components rendered inside a `StoreLayout` (navbar + footer). Design tokens updated to Soothe palette. Each section is its own component under `src/components/home/`. All text in pt-BR. Brand name "Soothe" hardcoded only in JSX.

**Tech Stack:** React 19, Ant Design 6, React Router 7, CSS custom (minimal), Google Fonts (Manrope + Plus Jakarta Sans), Material Symbols Outlined icons.

**Spec:** `docs/superpowers/specs/2026-03-30-home-page-mockup-design.md`

---

## File Structure

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `frontend/index.html` | Add Google Fonts + Material Symbols links |
| Modify | `frontend/src/styles/tokens.ts` | Replace placeholder tokens with Soothe palette |
| Modify | `frontend/src/styles/theme.ts` | Map new tokens to Ant Design theme config |
| Modify | `frontend/src/styles/global.css` | Update CSS variables + font declarations |
| Create | `frontend/src/layouts/StoreLayout.tsx` | Navbar + Footer + `<Outlet />` for child routes |
| Create | `frontend/src/components/home/HeroSection.tsx` | Hero banner with image overlay and CTA |
| Create | `frontend/src/components/home/CategoryBento.tsx` | Asymmetric category grid |
| Create | `frontend/src/components/home/ProductGrid.tsx` | Bestseller product cards |
| Create | `frontend/src/components/home/Testimonial.tsx` | Customer quote section |
| Create | `frontend/src/components/home/Newsletter.tsx` | Email signup section |
| Create | `frontend/src/components/home/home.css` | Custom CSS for overlays, animations, glassmorphism |
| Modify | `frontend/src/pages/Home.tsx` | Compose all section components |
| Modify | `frontend/src/routes/index.tsx` | Wrap `/` route in StoreLayout |

---

## Task 1: Add Google Fonts and Material Symbols to index.html

**Files:**
- Modify: `frontend/index.html`

- [ ] **Step 1: Add font links to `<head>`**

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Soothe Sanctuary</title>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Verify fonts load**

Run: `cd frontend && npm run dev`

Open `http://localhost:5173` in browser. Open DevTools > Network tab and confirm `Manrope`, `Plus Jakarta Sans`, and `Material Symbols Outlined` fonts are loaded (status 200).

- [ ] **Step 3: Commit**

```bash
git add frontend/index.html
git commit -m "feat: add Google Fonts and Material Symbols to index.html"
```

---

## Task 2: Update design tokens with Soothe palette

**Files:**
- Modify: `frontend/src/styles/tokens.ts`

- [ ] **Step 1: Replace tokens.ts content**

```ts
export const tokens = {
  colors: {
    primary: '#6c5b4d',
    primaryHover: '#5f5042',
    secondary: '#625f59',
    background: '#faf9f6',
    surfaceContainer: '#edeeea',
    surfaceContainerLow: '#f4f4f0',
    surfaceContainerHighest: '#e0e4de',
    surfaceWhite: '#ffffff',
    primaryContainer: '#f5decd',
    text: '#2f3430',
    textSecondary: '#5c605c',
    onPrimary: '#fff6f1',
    border: '#afb3ae',
  },
  fonts: {
    primary: "'Plus Jakarta Sans', sans-serif",
    heading: "'Manrope', sans-serif",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 48,
    full: 9999,
  },
} as const;
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd frontend && npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/styles/tokens.ts
git commit -m "feat: update design tokens with Soothe palette"
```

---

## Task 3: Update Ant Design theme and CSS variables

**Files:**
- Modify: `frontend/src/styles/theme.ts`
- Modify: `frontend/src/styles/global.css`

- [ ] **Step 1: Update theme.ts**

```ts
import type { ThemeConfig } from 'antd';
import { tokens } from './tokens';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: tokens.colors.primary,
    colorBgBase: tokens.colors.background,
    colorBgContainer: tokens.colors.surfaceWhite,
    colorText: tokens.colors.text,
    colorTextSecondary: tokens.colors.textSecondary,
    colorBorder: tokens.colors.border,
    borderRadius: tokens.borderRadius.md,
    fontFamily: tokens.fonts.primary,
  },
  components: {
    Button: {
      borderRadius: tokens.borderRadius.full,
      controlHeight: 48,
      paddingInline: 40,
      fontWeight: 600,
    },
    Input: {
      borderRadius: tokens.borderRadius.full,
      controlHeight: 48,
      colorBgContainer: tokens.colors.surfaceContainerLow,
      activeBorderColor: tokens.colors.primary,
    },
  },
};
```

- [ ] **Step 2: Update global.css**

```css
:root {
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

  --font-primary: 'Plus Jakarta Sans', sans-serif;
  --font-heading: 'Manrope', sans-serif;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;

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
  font-family: var(--font-primary);
  color: var(--color-text);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 {
  font-family: var(--font-heading);
}
```

- [ ] **Step 3: Verify dev server runs**

Run: `cd frontend && npm run dev`

Open `http://localhost:5173`. Confirm background is now warm bone (#faf9f6) and font changed to Plus Jakarta Sans.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/styles/theme.ts frontend/src/styles/global.css
git commit -m "feat: update Ant Design theme and CSS variables for Soothe palette"
```

---

## Task 4: Create home.css with custom styles

**Files:**
- Create: `frontend/src/components/home/home.css`

- [ ] **Step 1: Create the CSS file**

```css
/* ===== Material Symbols config ===== */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}

/* ===== Navbar ===== */
.store-navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  background: rgba(250, 249, 246, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.store-navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  max-width: 100%;
  margin: 0 auto;
}

.store-navbar-logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-primary);
}

.store-navbar-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.store-navbar-link {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.3s, opacity 0.3s;
  cursor: pointer;
}

.store-navbar-link:hover {
  color: var(--color-primary);
}

.store-navbar-link.active {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 4px;
}

.store-navbar-icons {
  display: flex;
  align-items: center;
  gap: 24px;
  color: var(--color-primary);
}

/* ===== Hero ===== */
.hero-section {
  padding: 0 32px 96px;
}

.hero-container {
  position: relative;
  width: 100%;
  aspect-ratio: 21 / 9;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease-in-out;
}

.hero-container:hover .hero-image {
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(47, 52, 48, 0.4), transparent);
  display: flex;
  align-items: center;
  padding: 0 64px;
}

.hero-content {
  max-width: 640px;
}

.hero-tag {
  display: inline-block;
  padding: 6px 16px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  color: var(--color-on-primary);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  color: var(--color-on-primary);
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin-bottom: 32px;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: rgba(255, 246, 241, 0.9);
  font-weight: 300;
  margin-bottom: 40px;
  max-width: 480px;
  line-height: 1.7;
}

/* ===== Category Bento ===== */
.bento-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
}

.bento-card-tall {
  height: 500px;
}

.bento-card-wide {
  height: 400px;
}

.bento-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.bento-card:hover img {
  transform: scale(1.05);
}

.bento-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  transition: background 0.3s;
}

.bento-card:hover .bento-card-overlay {
  background: rgba(0, 0, 0, 0.2);
}

.bento-card-text {
  position: absolute;
  bottom: 40px;
  left: 40px;
  color: white;
}

.bento-card-text-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}

.bento-card-text h3 {
  font-family: var(--font-heading);
  font-weight: 700;
  margin-bottom: 8px;
}

.bento-card-text p {
  opacity: 0.9;
}

.bento-divider {
  width: 64px;
  height: 4px;
  background: white;
  margin: 0 auto;
  border-radius: var(--radius-full);
  transition: width 0.3s;
}

.bento-card:hover .bento-divider {
  width: 128px;
}

/* ===== Product Grid ===== */
.product-section {
  padding: 96px 32px;
  background-color: var(--color-surface-container-low);
}

.product-section-inner {
  max-width: 1280px;
  margin: 0 auto;
}

.product-section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 64px;
}

.product-section-label {
  display: block;
  font-family: var(--font-heading);
  color: var(--color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.product-card {
  text-align: center;
}

.product-card-image-wrapper {
  aspect-ratio: 1;
  background: white;
  border-radius: 50%;
  padding: 16px;
  overflow: hidden;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.5s, transform 0.5s;
  position: relative;
}

.product-card:hover .product-card-image-wrapper {
  box-shadow: 0 20px 40px rgba(47, 52, 48, 0.1);
}

.product-card-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.7s;
}

.product-card:hover .product-card-image-wrapper img {
  transform: scale(1.1);
}

.product-card-cart-btn {
  position: absolute;
  bottom: 32px;
  right: 32px;
  background: var(--color-background);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.3s, transform 0.3s;
  border: none;
  cursor: pointer;
  color: var(--color-primary);
}

.product-card:hover .product-card-cart-btn {
  opacity: 1;
  transform: translateY(0);
}

.product-card-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

/* ===== Testimonial ===== */
.testimonial-section {
  padding: 128px 32px;
  text-align: center;
}

.testimonial-quote-icon {
  font-size: 3rem;
  color: var(--color-primary-container);
  margin-bottom: 48px;
  font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}

.testimonial-text {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-style: italic;
  font-weight: 300;
  line-height: 1.4;
  color: var(--color-text);
  margin-bottom: 48px;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

/* ===== Newsletter ===== */
.newsletter-section {
  padding: 0 32px 48px;
}

.newsletter-card {
  background-color: var(--color-surface-container-highest);
  border-radius: var(--radius-lg);
  padding: 64px;
  display: flex;
  align-items: center;
  gap: 64px;
  position: relative;
  overflow: hidden;
}

.newsletter-blur {
  position: absolute;
  right: -96px;
  top: -96px;
  width: 384px;
  height: 384px;
  background: rgba(245, 222, 205, 0.2);
  border-radius: 50%;
  filter: blur(48px);
  pointer-events: none;
}

.newsletter-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

.newsletter-image-wrapper {
  flex: 1;
  max-width: 400px;
  position: relative;
  z-index: 1;
}

.newsletter-image-inner {
  aspect-ratio: 1;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transform: rotate(3deg);
}

.newsletter-image-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ===== Footer ===== */
.store-footer {
  margin-top: 96px;
  background-color: var(--color-surface-container);
  border-radius: 3rem 3rem 0 0;
}

.store-footer-grid {
  padding: 80px 48px;
  max-width: 1280px;
  margin: 0 auto;
}

.store-footer-brand {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 32px;
}

.store-footer-description {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.7;
  margin-bottom: 32px;
}

.store-footer-heading {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.75rem;
  margin-bottom: 24px;
}

.store-footer-link {
  display: block;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  text-decoration: none;
  margin-bottom: 16px;
  transition: color 0.2s, transform 0.2s;
}

.store-footer-link:hover {
  color: var(--color-primary);
  transform: translateX(4px);
}

.store-footer-social {
  display: flex;
  gap: 16px;
}

.store-footer-social-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-surface-container-highest);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
}

.store-footer-social-icon:hover {
  background: var(--color-primary-container);
}

.store-footer-bottom {
  padding: 40px 48px;
  border-top: 1px solid rgba(175, 179, 174, 0.1);
  text-align: center;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .store-navbar-links {
    display: none;
  }

  .hero-section {
    padding: 0 16px 48px;
  }

  .hero-overlay {
    padding: 0 24px;
  }

  .hero-container {
    aspect-ratio: 4 / 3;
  }

  .bento-card-tall {
    height: 300px;
  }

  .bento-card-wide {
    height: 250px;
  }

  .product-section {
    padding: 48px 16px;
  }

  .product-section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .testimonial-section {
    padding: 64px 16px;
  }

  .newsletter-card {
    flex-direction: column;
    padding: 32px;
  }

  .newsletter-image-wrapper {
    max-width: 100%;
  }

  .store-footer-grid {
    padding: 48px 24px;
  }
}
```

- [ ] **Step 2: Verify the file was created**

Run: `ls frontend/src/components/home/home.css`

Expected: File exists.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/home.css
git commit -m "feat: add custom CSS for home page sections"
```

---

## Task 5: Create StoreLayout with Navbar and Footer

**Files:**
- Create: `frontend/src/layouts/StoreLayout.tsx`
- Modify: `frontend/src/routes/index.tsx`

- [ ] **Step 1: Create StoreLayout.tsx**

```tsx
import { Outlet } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';
import '../components/home/home.css';

export default function StoreLayout() {
  return (
    <>
      {/* Navbar */}
      <nav className="store-navbar">
        <div className="store-navbar-inner">
          <div className="store-navbar-logo">Soothe</div>

          <div className="store-navbar-links">
            <a className="store-navbar-link active" href="#">Loja</a>
            <a className="store-navbar-link" href="#">Coleções</a>
            <a className="store-navbar-link" href="#">Mais Vendidos</a>
            <a className="store-navbar-link" href="#">Sobre</a>
          </div>

          <div className="store-navbar-icons">
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
              <span className="material-symbols-outlined">person</span>
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main style={{ paddingTop: 96 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="store-footer">
        <div className="store-footer-grid">
          <Row gutter={[48, 48]}>
            <Col xs={24} md={8}>
              <div className="store-footer-brand">Soothe Sanctuary</div>
              <p className="store-footer-description">
                Criando espaços intencionais através da arte do conforto e texturas selecionadas.
              </p>
              <div className="store-footer-social">
                <div className="store-footer-social-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>public</span>
                </div>
                <div className="store-footer-social-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>share</span>
                </div>
              </div>
            </Col>

            <Col xs={12} md={5}>
              <div className="store-footer-heading">Loja</div>
              <a className="store-footer-link" href="#">Novidades</a>
              <a className="store-footer-link" href="#">Mais Vendidos</a>
              <a className="store-footer-link" href="#">Cartões Presente</a>
            </Col>

            <Col xs={12} md={5}>
              <div className="store-footer-heading">Atendimento</div>
              <a className="store-footer-link" href="#">Política de Envio</a>
              <a className="store-footer-link" href="#">Trocas e Devoluções</a>
              <a className="store-footer-link" href="#">Fale Conosco</a>
            </Col>

            <Col xs={24} md={6}>
              <div className="store-footer-heading">Newsletter</div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', lineHeight: 1.7, marginBottom: 24 }}>
                Cadastre-se e ganhe 10% de desconto na sua primeira compra.
              </p>
              <div style={{ position: 'relative' }}>
                <Input
                  placeholder="Email"
                  style={{ paddingRight: 48 }}
                />
                <Button
                  type="primary"
                  shape="circle"
                  size="small"
                  style={{
                    position: 'absolute',
                    right: 4,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 32,
                    height: 32,
                    minWidth: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="store-footer-bottom">
          © 2026 Soothe Sanctuary. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}
```

- [ ] **Step 2: Update routes to wrap Home in StoreLayout**

Replace `frontend/src/routes/index.tsx` with:

```tsx
import { createBrowserRouter } from 'react-router-dom';
import StoreLayout from '../layouts/StoreLayout';
import Home from '../pages/Home';
import Admin from '../pages/Admin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StoreLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
  },
]);
```

- [ ] **Step 3: Verify navbar and footer render**

Run: `cd frontend && npm run dev`

Open `http://localhost:5173`. Confirm:
- Navbar fixed at top with "Soothe" logo, links, and icons
- Footer visible at bottom with 4 columns and copyright
- Glassmorphism effect on navbar (scroll down to see blur)

- [ ] **Step 4: Commit**

```bash
git add frontend/src/layouts/StoreLayout.tsx frontend/src/routes/index.tsx
git commit -m "feat: create StoreLayout with navbar and footer"
```

---

## Task 6: Create HeroSection component

**Files:**
- Create: `frontend/src/components/home/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection.tsx**

```tsx
import { Button, Typography } from 'antd';

const { Title } = Typography;

const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD04IpRjZnl-tlAdd2gNMpVEmntzZ_PteOA5rsawn7psKjKYrX0HvQ2hnYMUq0CnCTkSPgyHuLf9rrUlkf6Bs5Mb1o1JvJR9W2ZucOhgGzk0JExORPkGYp0ETkmFTESUbnx_MH2NJDW_FQVDXcBvLwFblI-iNHYgQvG9np-oQdfATu7kUUBN4HjZyjAXAUQxCI9iqmGCs3TG5yOpbH84r3_is_793sXpTYq9_mSoL1zMRc_D8jvTHrf_agr9KGUGPIEze9hRljVJ1UV';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <img
          className="hero-image"
          src={HERO_IMAGE}
          alt="Quarto minimalista com almofadas em tons neutros"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-tag">Coleção Premium</span>
            <h1 className="hero-title">
              Seu Conforto,<br />Curado.
            </h1>
            <p className="hero-subtitle">
              Descubra a interseção entre precisão arquitetônica e suavidade tátil
              com nossa coleção exclusiva de almofadas.
            </p>
            <Button
              type="primary"
              size="large"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                height: 56,
                paddingInline: 40,
                fontSize: '1rem',
                boxShadow: '0 10px 30px rgba(108, 91, 77, 0.2)',
              }}
            >
              Explorar Coleções
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd frontend && npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/HeroSection.tsx
git commit -m "feat: create HeroSection component"
```

---

## Task 7: Create CategoryBento component

**Files:**
- Create: `frontend/src/components/home/CategoryBento.tsx`

- [ ] **Step 1: Create CategoryBento.tsx**

```tsx
import { Row, Col } from 'antd';

const IMAGES = {
  silk: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyKNZEu043rsV6RG18ZwZG1rOfvwMSN69OZLS-YQAO_QFaY7vNYmLhzojiW2n9B8_8l1QXMlIgY4CiMwigGjNEgghznqqxJikTF79e2dD5KPRA1_35uZ44a8pxTIIK-UYN3ppRjmnbTtGZs8IxgcBzNUNj0HmKnt0c1yqRutU-sgpUB66V2OZOidaSJYthwzXMscdatl8vGfULFXTFzz2_7aYu12b98KFJS-v6Fc36_LeS3wyF3vlxtyul47cLd_A2xtAcG3GqWOXF',
  velvet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsi3TG6q9N4iv_2SNS39LERO1FB0d0sb1pwecc9uBDxnjg01EyXtAesFhTuIhsDwowkqTOACxN9zTnmnzlTqzGX8fRFDZBT1xlWVdhmmIQqSfQlA1kIAitvXqotCkCOqiMFNEbgCpSWbqIchYa5kKq3v9lOeLb88OHOYPSQf2MfpAWlx-aFGWLbnNqVKrLJhyHWitl9Ffzz4buCooVPBtZZ_u-hE3JPoPFeGPHTXi938YZtQq6fFfMY2adlEOo2CVe3ecqcF1Hv4Gd',
  sleeping: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhgBj4yCk69InpduMOFBt9QgROq7vwjD6GEAVkSpM0Gk2yyIcmVoVr_TlD7sOOVtyy9kahfnapbWZlsusaD5GBL-6HUUsmz7FbLJi5EuZ3kMdekQCxPh9ozIZLqQk9C0YNOM_HBAgeYdsUanE3tUHmS3rm62h-CGQo19EqJ9l_l3WojtNRRa3CeQgPiE8LUByokxDSLo_cN3Z5bdvpaMprQ199NQ-om_mtXOJIOUA5njoYRd8cDJYOEkO60_vRSZ0tgnwLytDqmH6x',
};

export default function CategoryBento() {
  return (
    <section style={{ padding: '48px 32px', maxWidth: 1280, margin: '0 auto' }}>
      <Row gutter={[32, 32]}>
        {/* Silk — 8 columns */}
        <Col xs={24} md={16}>
          <div className="bento-card bento-card-tall">
            <img src={IMAGES.silk} alt="Fronha de seda em tom creme" />
            <div className="bento-card-overlay" />
            <div className="bento-card-text">
              <h3 style={{ fontSize: '2.25rem' }}>Almofadas de Seda</h3>
              <p style={{ fontSize: '1.1rem' }}>Elegância refrescante e hipoalergênica.</p>
            </div>
          </div>
        </Col>

        {/* Velvet — 4 columns */}
        <Col xs={24} md={8}>
          <div className="bento-card bento-card-tall">
            <img src={IMAGES.velvet} alt="Almofadas de veludo em tons terrosos" />
            <div className="bento-card-overlay" />
            <div className="bento-card-text">
              <h3 style={{ fontSize: '1.75rem' }}>Almofadas de Veludo</h3>
              <p style={{ fontSize: '0.875rem' }}>Texturas profundas para espaços acolhedores.</p>
            </div>
          </div>
        </Col>

        {/* Sleeping Essentials — full width */}
        <Col span={24}>
          <div className="bento-card bento-card-wide">
            <img src={IMAGES.sleeping} alt="Quarto moderno com travesseiros brancos" />
            <div className="bento-card-overlay" style={{ background: 'rgba(0,0,0,0.05)' }} />
            <div className="bento-card-text-center">
              <h3 style={{ fontSize: '2.75rem', marginBottom: 16 }}>Essenciais para Dormir</h3>
              <div className="bento-divider" />
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd frontend && npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/CategoryBento.tsx
git commit -m "feat: create CategoryBento component"
```

---

## Task 8: Create ProductGrid component

**Files:**
- Create: `frontend/src/components/home/ProductGrid.tsx`

- [ ] **Step 1: Create ProductGrid.tsx**

```tsx
import { Row, Col, Typography, Button } from 'antd';

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
    variant: 'Cinza Ardósia / Par',
    price: 'R$ 295,00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGcA3-DzpWK2kT8H470fiImdCAEyy0EJmAgQeVpTnx5DJ_0uKkPzdzO-nUnqTvFaCLiBnfD2h7ZkvaR-Oc58Fk0zfL8plIjzEJk21YyrCwkHi18JkCiGhVyH1EoPjukHyzrPVrnJrb_VmoD2yAn0p-aJT_I5VRFNBolFQBhg22XkvEbvYwLFs0CO_J2_b0XKmmS_o65sY_PBHjHMusmC_Hg-Ah2PAiOlbmh3ololgHYFitWMVMK6712wk5JMt9rHiQsNd0d7A4uCtL',
    alt: 'Fronhas de seda cinza ardósia',
  },
  {
    name: 'Almofada Lombar Sculpt',
    variant: 'Tricô Aveia / 60x30cm',
    price: 'R$ 229,00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLYdPgjDgRrgu2sS5N1j6ElbY50A_dA1Fh2C7L6haxrhwpGQNJbwQ51kkkpjkBBgzCPtjcCbimRoR--wcU4ffoaaFjdviC-MdYXsfnZW4fRGbQAE5xFFbgogVw8PreApWBR2GV9C8HCSevd9oOImW6oVtTjQqI6dcs80qJIk41b1TZ4rxHzb1U55dDO2q45uz5-jfuKi-xZwF4PFRtjvYcrbfQgTRDMxzXSFxfcmM4IiVxm-Mu80rQjIQIgqzRQhRHBuPExkcWVtZi',
    alt: 'Almofada lombar em tricô cor aveia',
  },
];

export default function ProductGrid() {
  return (
    <section className="product-section">
      <div className="product-section-inner">
        <div className="product-section-header">
          <div>
            <span className="product-section-label">A Seleção</span>
            <Title level={2} style={{ margin: 0, letterSpacing: '-0.03em', fontWeight: 800 }}>
              Mais Vendidos
            </Title>
          </div>
          <Button
            type="link"
            style={{
              color: 'var(--color-primary)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: 0,
              fontSize: '1rem',
            }}
          >
            Ver Todos os Produtos
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>east</span>
          </Button>
        </div>

        <Row gutter={[48, 48]}>
          {PRODUCTS.map((product) => (
            <Col xs={24} md={8} key={product.name}>
              <div className="product-card">
                <div className="product-card-image-wrapper">
                  <img src={product.image} alt={product.alt} />
                  <button className="product-card-cart-btn">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
                <Title level={4} style={{ marginBottom: 8 }}>{product.name}</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 16, fontWeight: 500 }}>
                  {product.variant}
                </Text>
                <span className="product-card-price">{product.price}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd frontend && npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/ProductGrid.tsx
git commit -m "feat: create ProductGrid component"
```

---

## Task 9: Create Testimonial component

**Files:**
- Create: `frontend/src/components/home/Testimonial.tsx`

- [ ] **Step 1: Create Testimonial.tsx**

```tsx
import { Avatar, Typography } from 'antd';

const { Text } = Typography;

const AVATAR_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcn2ceO7TFg7ptz0HIdGMl9L7vESwtq42qbOdUqEgIPLJwNmTCMb0y5chg_arziKlepLqGC_sCBTer_6h32r4UPlEbImaZJp9hmsDQD5rRadaM_5aJKdKGDFRom_CJSv9iwhQYTUNSc0EsGKy05xu9MTm6WpFtl-bGUjZVDzOfkfThtoeOnpUedkGlRIgoTpMTgAvOr3LR7uKFYeiqU656u9-xAWRVI013w_t_W-hWqPG2XzGcf2S6pzQO4ccEIWvj1lVUHK1zVY5_';

export default function Testimonial() {
  return (
    <section className="testimonial-section">
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <span className="material-symbols-outlined testimonial-quote-icon">format_quote</span>
        <p className="testimonial-text">
          "A Soothe redefiniu completamente minhas noites. As texturas são incomparáveis
          e a estética combina perfeitamente com minha casa minimalista."
        </p>
        <div className="testimonial-author">
          <Avatar size={48} src={AVATAR_IMAGE} alt="Maria Fernanda" />
          <div style={{ textAlign: 'left' }}>
            <Text strong style={{ display: 'block' }}>Maria Fernanda</Text>
            <Text type="secondary" style={{ fontSize: '0.875rem' }}>Designer de Interiores</Text>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd frontend && npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/Testimonial.tsx
git commit -m "feat: create Testimonial component"
```

---

## Task 10: Create Newsletter component

**Files:**
- Create: `frontend/src/components/home/Newsletter.tsx`

- [ ] **Step 1: Create Newsletter.tsx**

```tsx
import { Button, Input, Typography } from 'antd';

const { Title, Text } = Typography;

const TEXTURE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA2sZEUvukXs6lFuhAuAtiRty1XQ9NmfLgBn8k3Golf-aBRXQc9mHxA_xSk520Qf8Xz11bOWgMZ1oK4ovORTR-9-iJ-PEaUO4TZIOkDF73hnhcplvkP0bq4zKudHW4eTNwV32akVgPY_lXLADGT1mBN2nfwspI49UXJD4ds0v75yryMQ0wlPWKS2JPWpC8oWufiJ_eCAU6Qyk4kM7IULvdZ14jXnIYHtsrBSEtD94DBKZmN6QcUttRV1FX6kFwbroJ0dta6Qn7YnCh';

export default function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-card">
        <div className="newsletter-blur" />

        <div className="newsletter-content">
          <Title level={2} style={{ letterSpacing: '-0.02em', fontWeight: 800, marginBottom: 24 }}>
            Fique por Dentro.
          </Title>
          <Text style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 40, maxWidth: 420, lineHeight: 1.7 }}>
            Entre para nosso círculo exclusivo e tenha acesso antecipado a coleções sazonais e dicas de decoração.
          </Text>
          <div style={{ display: 'flex', gap: 16, maxWidth: 480, flexWrap: 'wrap' }}>
            <Input
              placeholder="Endereço de email"
              style={{ flex: 1, minWidth: 200 }}
            />
            <Button type="primary" size="large" style={{ fontWeight: 700 }}>
              Participar
            </Button>
          </div>
        </div>

        <div className="newsletter-image-wrapper">
          <div className="newsletter-image-inner">
            <img src={TEXTURE_IMAGE} alt="Textura de tecido bouclé em tom creme" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd frontend && npx tsc --noEmit`

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/home/Newsletter.tsx
git commit -m "feat: create Newsletter component"
```

---

## Task 11: Compose Home page with all sections

**Files:**
- Modify: `frontend/src/pages/Home.tsx`

- [ ] **Step 1: Replace Home.tsx with composed sections**

```tsx
import HeroSection from '../components/home/HeroSection';
import CategoryBento from '../components/home/CategoryBento';
import ProductGrid from '../components/home/ProductGrid';
import Testimonial from '../components/home/Testimonial';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryBento />
      <ProductGrid />
      <Testimonial />
      <Newsletter />
    </>
  );
}
```

- [ ] **Step 2: Verify full page renders**

Run: `cd frontend && npm run dev`

Open `http://localhost:5173`. Verify all sections render in order:
1. Navbar (fixed, glassmorphism)
2. Hero (full-width image with overlay text and CTA button)
3. Category Bento (3 image cards in asymmetric grid)
4. Product Grid (3 circular product cards on light background)
5. Testimonial (centered quote with avatar)
6. Newsletter (card with email input and texture image)
7. Footer (4 columns with links and copyright)

- [ ] **Step 3: Verify TypeScript and lint pass**

Run: `cd frontend && npx tsc --noEmit && npm run lint`

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/pages/Home.tsx
git commit -m "feat: compose Home page with all sections"
```

---

## Task 12: Final visual review and fixes

**Files:**
- Possibly: any file from tasks above that needs adjustment

- [ ] **Step 1: Full visual comparison**

Open `http://localhost:5173` side-by-side with `stitch/screen.png`. Check:
- Color palette matches (warm bone/taupe tones, not blue)
- Typography uses Manrope for headings, Plus Jakarta Sans for body
- Buttons are pill-shaped (fully rounded)
- No harsh borders between sections
- Hover effects work (hero image scale, bento card scale, product card shadow)
- Responsive: resize browser to mobile width, verify sections stack

- [ ] **Step 2: Fix any visual issues found**

Apply fixes to the relevant files. Common issues to check:
- Ant Design default styles overriding custom colors (check ConfigProvider is wrapping correctly)
- Missing font weights (check Google Fonts URL includes all weights)
- Button styles not applying (check theme.ts component overrides)

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "fix: visual adjustments after review"
```

Note: Only create this commit if changes were made. If everything looks correct, skip this step.
