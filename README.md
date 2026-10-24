# ISHA — Intelligent Living

Website for **ISHA**, a premium home automation brand for Coastal Karnataka (Kundapura · Udupi · Manipal · Mangaluru), supported by SoVir Technologies LLP.

> A home that understands you. Technology you barely notice. Comfort you experience every day.

## Stack

- **React 19 + TypeScript** on **Vite**
- **GSAP** (ScrollTrigger, SplitText, `@gsap/react`) for scroll choreography
- **Lenis** for inertial smooth scrolling
- 4K responsive photography (640 → 3840px `srcset`) via the Unsplash CDN

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
```

## Contact form

Set `VITE_CONTACT_ENDPOINT` (see `.env.example`) to a URL that accepts JSON POSTs — e.g. Formspree, Getform, or your own API. Without it, the form validates and shows a success state but **does not deliver enquiries**.

## Structure

```
src/
  components/   one file per section (Hero, Story, Experience, Capabilities, Collections, Contact…)
  data/         brochure copy (content.ts) and the curated 4K photo set (photos.ts)
  lib/          GSAP setup, Lenis smooth scroll, data-attribute scroll reveals
  styles.css    brand tokens and all styles
public/brand/   ISHA logo (original + transparent PNGs) and favicon
```

## Brand

| Colour | Hex | Meaning |
| --- | --- | --- |
| Midnight Navy | `#0B1B34` | Trust, engineering excellence |
| Electric Blue | `#168DDF` | Innovation, connectivity |
| Metallic Silver | `#C4CCD6` | Precision, modern engineering |
| Pure White | `#FFFFFF` | Simplicity, clarity |

## Accessibility

Respects `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast`; keyboard-navigable with visible focus states and a skip link.

_Products and capabilities shown are planned offerings, subject to development and validation._
