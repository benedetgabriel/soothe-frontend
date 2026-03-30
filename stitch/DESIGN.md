# Design System Strategy: The Tactile Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Curated Sanctuary."** 

Unlike generic e-marketplaces that rely on rigid grids and aggressive containment, this system treats the digital interface as a high-end interior design magazine. We move beyond "minimalism" into "intentionality." The goal is to evoke the physical sensation of a premium pillow: soft, supportive, and breathable. 

We break the "template" look by utilizing **intentional asymmetry**—offsetting product imagery against oversized typography—and **tonal layering**. By eliminating harsh dividers and embracing fluid, high-border-radius containers, we create a UI that feels organic rather than mechanical.

---

2. Colors & Surface Architecture
The palette is a sophisticated blend of bone, oatmeal, and soft taupe, designed to recede and let product textures shine.

### The "No-Line" Rule
**Strict Mandate:** 1px solid borders are prohibited for sectioning. 
Structure is defined through background shifts. A product gallery sitting on `surface` (#faf9f6) should transition into a "Featured Collection" using `surface-container-low` (#f4f4f0). The eye perceives the change in depth through value, not lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked premium papers.
*   **Base Layer:** `surface` (#faf9f6) or `background` (#faf9f6).
*   **Secondary Content:** `surface-container` (#edeeea).
*   **Elevated Components (Cards/Modals):** `surface-container-lowest` (#ffffff) to provide a "bright" lift.

### Glass & Gradient Soul
To avoid a flat "flat-design" trap, use **Glassmorphism** for floating headers or navigation. 
*   **Token:** `surface` at 80% opacity with a `20px` backdrop-blur.
*   **Signature Gradient:** For primary CTAs, use a subtle linear gradient from `primary` (#6c5b4d) to `primary-dim` (#5f5042) at a 135-degree angle. This adds a "weighted" feel to the button, mimicking the density of high-quality fabric.

---

## 3. Typography: The Editorial Voice
We utilize two distinct sans-serifs to balance modern utility with high-end grace.

*   **Display & Headlines (Manrope):** Chosen for its geometric purity and wide apertures. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero moments to create an authoritative, "Vogue-esque" impact.
*   **Body & Titles (Plus Jakarta Sans):** A high-legibility face with a touch of personality. `body-lg` (1rem) should be the standard for product descriptions, ensuring a cozy, readable experience.
*   **The Hierarchy Play:** Always pair a `display-sm` headline with a `label-md` uppercase tag (spaced at 0.1rem) in `secondary` (#625f59) to establish a clear, premium information scent.

---

## 4. Elevation & Depth
In a world without lines, depth is our only tool for organization.

*   **The Layering Principle:** Avoid shadows for static elements. Instead, place a `surface-container-lowest` card on top of a `surface-container-high` section. The subtle contrast creates a "soft lift."
*   **Ambient Shadows:** For interactive floating elements (e.g., a "Cart Preview"), use a custom shadow: 
    *   `0px 20px 40px rgba(47, 52, 48, 0.06)`. 
    *   The color is derived from `on-surface`, ensuring the shadow looks like natural light hitting a physical object, not a digital drop-shadow.
*   **The "Ghost Border" Fallback:** If a boundary is required for accessibility (e.g., input fields), use `outline-variant` (#afb3ae) at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Layout Patterns

### Buttons (The "Pillow" Interaction)
*   **Shape:** Always use `rounded-full` (9999px) or `rounded-xl` (3rem).
*   **Primary:** `primary` background with `on-primary` text. No border.
*   **Secondary:** `primary-container` background. This provides a soft, tonal alternative to the high-contrast primary.
*   **Interaction:** On hover, shift background to `primary-dim`.

### Input Fields
*   **Style:** Background set to `surface-container-low`. High border-radius (`md`: 1.5rem).
*   **State:** On focus, the "Ghost Border" increases to 40% opacity of `primary`, creating a soft glow rather than a harsh ring.

### Cards & Product Grids
*   **Strict Rule:** No dividers. Use **Spacing Scale 8** (2.75rem) to separate card metadata from the image.
*   **Layout:** Embrace the "Fluid Grid." Occasionally break the 4-column layout with a 2-column "Editorial Feature" card to keep the user engaged.

### Suggested Signature Component: "The Texture Carousel"
A full-width, low-height slider using `surface-container-highest` where users can see macro-shots of fabric weaves. Typography should overlap the images using `surface-bright` text with a subtle backdrop-blur.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use extreme whitespace. If you think there is enough room, add **Spacing Scale 4** (1.4rem) more.
*   **Do** use asymmetrical imagery. Align text to the left and product images slightly off-center to the right to create a "boutique" feel.
*   **Do** use `on-surface-variant` (#5c605c) for secondary text to maintain a soft, low-contrast aesthetic.

### Don’t:
*   **Don’t** use pure black (#000000). Use `inverse-surface` (#0d0f0d) for maximum depth.
*   **Don’t** use the `none` or `sm` roundedness tokens for containers. They break the "Soft" brand promise.
*   **Don’t** stack more than three levels of surface containers. It leads to visual "muddiness."
*   **Don’t** use standard "heavy" icons. Use 1.5px or 1px stroke weight icons to match the elegant typography.

---

## 7. Spacing & Grid Scale
The rhythm of this system is slow and intentional.
*   **Gutter Standard:** `spacing-6` (2rem).
*   **Section Vertical Padding:** `spacing-24` (8.5rem). 
*   **Component Internal Padding:** `spacing-4` (1.4rem) for mobile, `spacing-6` (2rem) for desktop.

*Note: High-end retail is about the "breath" between the items. Never crowd the canvas.*