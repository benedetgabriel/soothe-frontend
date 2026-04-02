# Design System Specification: High-End Editorial Organic Minimalism

## 1. Overview & Creative North Star: "The Weightless Sanctuary"
This design system is not a template; it is an atmosphere. For a pillow marketplace, the interface must physically manifest the qualities of the product: softness, breathability, and restorative rest. 

**The Creative North Star: The Weightless Sanctuary.**
We reject the rigid, boxed-in constraints of traditional e-commerce. Instead, we embrace **intentional asymmetry** and **tonal layering**. Elements should appear to float or rest gently on one another, like linen sheets layered on a bed. By utilizing extreme corner radii (`32px+`) and a "No-Line" philosophy, we create a digital environment that feels tactile, premium, and profoundly "Zen."

---

## 2. Colors: The Palette of Calm
Our palette avoids high-contrast harshness. We use a "Tone-on-Tone" approach to create depth without visual noise.

### Surface Hierarchy & Nesting
To move beyond a "flat" web look, we treat the UI as a series of physical layers.
*   **The Base Layer (`surface` / `#FAF9F6`):** The canvas. Used for the widest expanses of the page.
*   **The Foundation (`surface-container-low` / `#F4F4F0`):** Use this for large background sections to subtly differentiate content areas (e.g., a "Materials" section below a Hero).
*   **The Floating Element (`surface-container-lowest` / `#FFFFFF`):** Reserved for high-priority interactive cards or modals to give them a "lifted," pure appearance.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections or cards. Boundaries must be defined solely through background color shifts. For example, a `surface-container-highest` card should sit on a `surface` background. If the two colors feel too close, increase the spacing—do not add a line.

### Signature Textures & Glassmorphism
*   **The Soft Glow:** Use a subtle gradient for primary CTAs transitioning from `primary` (#625E55) to `primary-dim` (#565249). This adds a "soul" to the button that flat charcoal cannot achieve.
*   **The Frosted Overlay:** For navigation bars or floating filters, use `surface` at 80% opacity with a `backdrop-blur: 20px`. This allows the "Organic Minimalism" of the content to bleed through the UI, softening the user journey.

---

## 3. Typography: Editorial Authority
We use a high-contrast typography scale to create a sense of luxury and breathing room.

*   **Display & Headlines (Playfair Display):** These are our "Artistic Anchors." Use `display-lg` (3.5rem) with generous tracking and `on-surface` (#2F3430). The serif adds a human, crafted touch to the marketplace.
*   **Body & Titles (Inter):** These are our "Functional Guides." Inter provides a clean, neutral counterpoint to the serif. Use `body-lg` (1rem) for product descriptions to ensure maximum legibility against the off-white backgrounds.
*   **Visual Hierarchy:** Headlines should never feel crowded. Use at least `8 (2.75rem)` or `10 (3.5rem)` from the spacing scale between a headline and its subsequent body text.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to represent "elevation" in the traditional sense; we use them to represent "softness."

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-highest` (#E0E4DE) element placed on a `surface` (#FAF9F6) background creates a natural, soft-edge lift.
*   **Ambient Shadows:** If a floating effect is required (e.g., a "Quick Add" cart button), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(47, 52, 48, 0.05)`. The color is a 5% opacity tint of `on-surface`, never pure black.
*   **The "Ghost Border" Fallback:** For accessibility in input fields, use the `outline-variant` token at **20% opacity**. It should be felt, not seen.

---

## 5. Components: Softness in Function

### Buttons
*   **Primary:** High-pill shape (`9999px`). Background: `primary` (#625E55). Text: `on-primary` (#FEF7EA). No border.
*   **Secondary:** Background: `primary-container` (#E9E2D6). Text: `on-primary-container` (#555148). This creates a sophisticated, tonal look.
*   **Interactions:** On hover, the button should subtly "settle"—reduce the ambient shadow or shift the background to `primary-dim`.

### Cards (The Pillow Tile)
*   **Shape:** `xl` (3rem / 48px) corner radius. This is our signature.
*   **Layout:** Forbid the use of divider lines. Separate the product image from the text using vertical white space (`6` / 2rem).
*   **Asymmetry:** In product grids, use alternating heights or slight offsets (using the `3` or `4` spacing tokens) to break the "standard grid" feel and create a zen-like flow.

### Input Fields
*   **Style:** `surface-container-high` (#E6E9E4) background with no border. 
*   **Shape:** `md` (1.5rem) corner radius.
*   **Focus State:** Shift the background to `surface-container-highest` and apply a 1px "Ghost Border" at 20% opacity.

### Navigation / Chips
*   **Selection Chips:** Use `secondary-container` (#E3E2E0) for unselected and `primary` (#625E55) for selected. The high contrast indicates the "active" state without needing an icon.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** embrace white space. If you think there is enough space, add one more level from the spacing scale (`10` or `12`).
*   **Do** use asymmetrical layouts for hero sections (e.g., text left-aligned, image slightly offset to the right and overlapping a background container).
*   **Do** use high-quality, "tactile" photography (macro shots of fabric, soft natural lighting).

### Don't:
*   **Don't** use 1px dividers or borders. This shatters the "Zen" illusion and makes the UI feel "digital" and "cheap."
*   **Don't** use pure black (#000000). Always use `on-surface` (#2F3430) for text to maintain the organic, muted feel.
*   **Don't** use sharp corners. Even the smallest component (like a checkbox) must have a minimum radius of `sm` (0.5rem).
*   **Don't** clutter the screen. If a feature isn't essential for the current task, hide it behind a "Glassmorphism" overlay or move it further down the scroll.