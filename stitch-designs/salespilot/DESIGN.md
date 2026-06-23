---
name: SalesPilot
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#424754'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#4648d4'
  on-tertiary: '#ffffff'
  tertiary-container: '#6063ee'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  stack-xl: 48px
---

## Brand & Style
The design system is built on the principles of **High-Utility Minimalism**. It aims to evoke a sense of calm intelligence and effortless productivity for small business owners. The aesthetic is inspired by leading developer-centric and productivity tools, focusing on clarity, precision, and a "built-to-last" feel.

The style utilizes a **Corporate / Modern** approach with subtle **Glassmorphism** cues for overlays. It prioritizes high-quality typography and intentional whitespace to reduce cognitive load, making complex AI-driven sales data feel approachable and professional. The emotional response should be one of "quiet confidence"—the tool is powerful, yet it stays out of the way until needed.

## Colors
The palette is rooted in a "Clean SaaS" philosophy, utilizing a high-luminance light mode as the foundation.

- **Primary Blue (#3B82F6):** Used for primary actions, active states, and brand presence. It represents reliability and the "Pilot" aspect of the assistant.
- **Accent Emerald (#10B981):** Reserved for growth metrics, success states, and AI-driven "opportunities" that signify positive momentum.
- **Neutral Grays:** A sophisticated scale of cool grays is used for borders (Slate-200) and secondary text (Slate-500) to maintain a low-contrast, premium feel.
- **Backgrounds:** Pure white (#FFFFFF) for cards and primary containers, with a subtle off-white (#F8FAFC) for the main application background to create soft depth.

## Typography
This design system uses **Inter** exclusively to achieve a systematic and functional look. The type hierarchy relies on tight letter-spacing for headlines to create a "custom-tuned" appearance similar to high-end design tools.

**Usage Rules:**
- **Headlines:** Use Semi-Bold (600) or Bold (700) with negative letter-spacing for a compact, editorial feel.
- **Body:** Standardize on 14px for density-rich dashboards and 16px for prose or focused settings.
- **Labels:** Uppercase is reserved only for the smallest label size (`label-sm`) to denote categories or metadata without drawing excessive attention.

## Layout & Spacing
The layout follows a **Fluid-to-Fixed** hybrid model. For dashboard views, a fluid 12-column grid is used to maximize data visibility. For settings and document views, the content is capped at a `container-max` of 1280px to maintain readability.

**Spacing Philosophy:**
- Use a base-4 scale. 
- **Desktop:** 24px gutters provide a spacious, "breathable" atmosphere. 
- **Mobile:** Margins shrink to 16px. Elements stack vertically, with secondary navigation moving to a bottom-sheet or a condensed "hamburger" top-bar.
- **Density:** High-density grids (8px spacing between related items) are preferred for data lists, while marketing or onboarding pages use more generous (48px+) vertical rhythms.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Ambient Shadows**, avoiding heavy gradients or stark black shadows.

- **Level 0 (Base):** #F8FAFC - The background of the application.
- **Level 1 (Card):** #FFFFFF - Primary white surfaces. Use a subtle 1px border (#E2E8F0) and a very soft, multi-layered shadow (0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)).
- **Level 2 (Dropdowns/Modals):** Pure white with a more pronounced ambient shadow (0 10px 15px -3px rgba(0,0,0,0.08)).
- **AI Surfaces:** Elements powered by AI use a subtle indigo-to-blue blurred background glow or a "glass" effect (backdrop-blur: 12px; background: rgba(255,255,255,0.7)) to distinguish them from standard static data.

## Shapes
The shape language is consistently **Rounded**, reflecting a modern and friendly SaaS aesthetic. 

- **Standard Elements (Buttons, Inputs, Cards):** Use a 0.5rem (8px) radius. This provides a soft but disciplined look.
- **Large Containers (Modals, Feature Sections):** Use 1rem (16px) for a more pronounced, premium feel.
- **Search Bars & Badges:** Use the "Pill" style (full rounding) to differentiate interactive search components from static content containers.

## Components
- **Buttons:** Primary buttons use a solid #3B82F6 background with white text. Secondary buttons use a white background with a Slate-200 border. Transitions should be a subtle 200ms ease.
- **Input Fields:** Use a 1px border (#E2E8F0). On focus, the border shifts to Primary Blue with a 3px soft blue outer glow.
- **Chips/Badges:** Small, Semi-Bold text with high-contrast backgrounds (e.g., Emerald-50 background with Emerald-700 text for success).
- **Cards:** White background, 8px corner radius, and a 1px Slate-100 border. No shadow unless the card is "hovered" or "active."
- **AI Insight Component:** A specialized card with a thin #6366F1 (Indigo) top-border and a subtle "Sparkle" icon to denote AI-generated suggestions.
- **Lists:** Clean rows separated by 1px horizontal lines. High-contrast labels for the primary data point (e.g., Lead Name) and muted Slate-500 for secondary metadata.