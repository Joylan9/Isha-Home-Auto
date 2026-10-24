# ISHA — Intelligent Living

Website for **ISHA**, a premium home automation brand for Coastal Karnataka (Kundapura · Udupi · Manipal · Mangaluru), supported by SoVir Technologies LLP.

> A home that understands you. Technology you barely notice. Comfort you experience every day.

## Stack

- **React 19 + TypeScript** on **Vite**
- **GSAP** (ScrollTrigger, SplitText, `@gsap/react`) for scroll choreography
- **Three.js + React Three Fiber + drei** for the interactive 3D flat (lazy-loaded)
- **Lenis** for inertial smooth scrolling
- 4K responsive photography (640 → 3840px `srcset`) via the Unsplash CDN

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
```

## Contact form → your inbox (Formspree)

Enquiries are delivered by email through [Formspree](https://formspree.io) (free tier: 50 submissions/month).

1. Sign up at formspree.io with the inbox that should receive enquiries.
2. Create a new form and copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. Paste it into `FORMSPREE_ENDPOINT` in [`src/config.ts`](src/config.ts) and redeploy.
4. Submit one test enquiry from the live site and confirm the form in the email Formspree sends you.

Each email arrives with the subject `New ISHA enquiry — <Name> (<City>)`, and Reply-To set to the visitor's email (when given), so you can reply directly. A hidden honeypot field plus Formspree's own filtering block spam.

Alternatively, set `VITE_CONTACT_ENDPOINT` at build time (see `.env.example`) to override the endpoint — any service accepting JSON POSTs works. If no endpoint is configured, development builds simulate success (with a console warning) and production builds tell visitors that online enquiries are being set up — they never silently drop an enquiry.

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
| Midnight Royal | `#011756` | Depth, trust (logo background) |
| Royal Blue | `#0F85F8` | Innovation, connectivity |
| Logo Gold | `#E2A54E` | Premium, warmth (logo emblem) |
| Smart Cyan | `#5DFCFD` | Smart-home signals (logo windows) |
| Pure White | `#FFFFFF` | Simplicity, clarity |

## Accessibility

Respects `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast`; keyboard-navigable with visible focus states and a skip link.

_Products and capabilities shown are planned offerings, subject to development and validation._
