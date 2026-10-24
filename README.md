<div align="center">

<!-- ─── Brand Banner ─── -->
<img src="frontend/public/brand/isha-logo-512.png" alt="ISHA Logo" width="120" />

# ✦ ISHA — Intelligent Living

**A home that understands you. Technology you barely notice. Comfort you experience every day.**

Premium home-automation brand for Coastal Karnataka, powered by [SoVir Technologies LLP](https://github.com/Joylan9).

[![Hostinger](https://img.shields.io/badge/Hosted%20on-Hostinger-673DE6?style=for-the-badge&logo=hostinger&logoColor=white)](https://www.hostinger.com)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com)
[![License](https://img.shields.io/badge/License-Proprietary-0B1B34?style=for-the-badge)](#license)

<br/>

<!-- ─── Color Palette ─── -->
<table>
<tr>
<td align="center"><img src="https://img.shields.io/badge/%20%20%20%20%20%20%20%20%20%20-0B1B34?style=for-the-badge" /><br/><sub><b>Midnight Navy</b><br/><code>#0B1B34</code></sub></td>
<td align="center"><img src="https://img.shields.io/badge/%20%20%20%20%20%20%20%20%20%20-168DDF?style=for-the-badge" /><br/><sub><b>Electric Blue</b><br/><code>#168DDF</code></sub></td>
<td align="center"><img src="https://img.shields.io/badge/%20%20%20%20%20%20%20%20%20%20-C4CCD6?style=for-the-badge" /><br/><sub><b>Metallic Silver</b><br/><code>#C4CCD6</code></sub></td>
<td align="center"><img src="https://img.shields.io/badge/%20%20%20%20%20%20%20%20%20%20-FFFFFF?style=for-the-badge" /><br/><sub><b>Pure White</b><br/><code>#FFFFFF</code></sub></td>
</tr>
</table>

</div>

---

<br/>

## 🏠 About

**ISHA** (Intelligent Living) is a premium home-automation brand engineered for Coastal Karnataka — serving **Kundapura · Udupi · Manipal · Mangaluru**. The website is a cinematic, scroll-driven experience designed to communicate luxury, precision, and trust.

> *"Precision you can trust."*

The site features immersive scene transitions, parallax photography, scroll-choreographed animations, and a polished consultation workflow — all built for performance and accessibility.

<br/>

---

## ⚡ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---|:---|
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="24" /> | **React 19** | Component architecture with latest concurrent features |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="24" /> | **TypeScript 7** | Full type safety across the entire codebase |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="24" /> | **Vite 8** | Lightning-fast HMR and optimised production builds |
| <img src="https://img.shields.io/badge/GS-88CE02?style=flat-square&logo=greensock&logoColor=black" height="24" /> | **GSAP 3.15** | ScrollTrigger, SplitText, timeline-driven animations |
| 🎞️ | **Lenis** | Buttery-smooth inertial scroll |
| 📷 | **Unsplash CDN** | 4K responsive photography (640px → 3840px `srcset`) |
| 📬 | **Formspree** | Zero-backend contact form with spam filtering |
| 🌐 | **Hostinger** | Static hosting from the `production` branch build |

</div>

<br/>

---

## 🎨 Design Philosophy

<table>
<tr>
<td width="50%">

### Cinematic Scroll Experience
Every section is choreographed with GSAP ScrollTrigger — text reveals, parallax layers, and scene transitions create a narrative flow that feels like browsing a luxury brochure.

### Scene-Driven Storytelling
The **Experience** section simulates a full day in an ISHA home — Morning, Daylight, Evening, Cinema — with real-time UI controls showing light, curtain, and temperature states.

</td>
<td width="50%">

### Invisible Technology
Follows the core ISHA principle: *"Intelligence works quietly in the background. You notice the comfort, not the technology."*

### Accessibility First
- Respects `prefers-reduced-motion`
- Respects `prefers-reduced-transparency`
- Respects `prefers-contrast`
- Full keyboard navigation with visible focus states
- Skip-to-content link

</td>
</tr>
</table>

<br/>

---

## 🧩 Architecture

```
isha-home-auto/
│
├── frontend/                    # React application root
│   ├── public/
│   │   └── brand/               # Logo assets (PNG, WebP, favicon)
│   │       ├── isha-logo-512.png
│   │       ├── isha-logo.png
│   │       ├── isha-logo-original.webp
│   │       └── favicon.png
│   │
│   ├── src/
│   │   ├── components/          # One file per section
│   │   │   ├── Hero.tsx         # Full-viewport cinematic hero
│   │   │   ├── Nav.tsx          # Sticky navigation with blur
│   │   │   ├── Marquee.tsx      # Infinite scrolling text banner
│   │   │   ├── Story.tsx        # Brand narrative section
│   │   │   ├── Experience.tsx   # Interactive day-scene simulator
│   │   │   ├── Capabilities.tsx # Smart home pillars (4 cards)
│   │   │   ├── Principles.tsx   # Core design principles
│   │   │   ├── Collections.tsx  # Product tier showcase
│   │   │   ├── Sovir.tsx        # Engineering partner section
│   │   │   ├── Contact.tsx      # Consultation form
│   │   │   ├── Footer.tsx       # Site footer with region links
│   │   │   ├── Loader.tsx       # Premium loading animation
│   │   │   ├── Icon.tsx         # SVG icon components
│   │   │   ├── Img.tsx          # Responsive image wrapper
│   │   │   └── Marquee.tsx      # Scrolling text animation
│   │   │
│   │   ├── data/
│   │   │   ├── content.ts       # All brochure copy, scenes, tiers
│   │   │   └── photos.ts       # Curated 4K Unsplash photo IDs
│   │   │
│   │   ├── lib/
│   │   │   ├── gsap.ts          # GSAP + plugin registration
│   │   │   ├── smoothScroll.ts  # Lenis smooth scroll setup
│   │   │   ├── useScrollReveals.ts  # data-reveal animation hook
│   │   │   ├── unsplash.ts      # Responsive image URL builder
│   │   │   └── enquiry.ts       # Form submission handler
│   │   │
│   │   ├── App.tsx              # Root layout + scroll orchestration
│   │   ├── config.ts            # Formspree endpoint config
│   │   ├── main.tsx             # Entry point
│   │   └── styles.css           # All styles + brand design tokens
│   │
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── .gitignore
└── README.md                    # ← You are here
```

<br/>

---

## 📦 Product Collections

ISHA offers four curated tiers, each building on the last:

<div align="center">

| | Collection | Tagline | Highlights |
|:---:|:---|:---|:---|
| `01` | **ISHA Lite** | Essential automation for everyday convenience | Smart lighting & fans · Mobile control · Simple schedules |
| `02` | **ISHA Nova** | Connected routines and intelligent room control | + Room-wise routines · Voice control |
| `03` | **ISHA Aura** ✦ | Refined ambience and personalised comfort | + Lighting scenes & dimming · Curtains & climate |
| `04` | **ISHA Elite** | Whole-home integration for signature spaces | + Safety, access & alerts · Full integration |

</div>

<br/>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Joylan9/Isha-Home-Auto.git
cd Isha-Home-Auto/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Available Scripts

| Script | Command | Description |
|:---|:---|:---|
| **Dev** | `npm run dev` | Start Vite dev server with HMR |
| **Build** | `npm run build` | TypeScript check + production build → `dist/` |
| **Preview** | `npm run preview` | Serve the production build locally |
| **Typecheck** | `npm run typecheck` | Run TypeScript compiler checks |

<br/>

---

## 📬 Contact Form Setup (Formspree)

Enquiries are delivered by email through [Formspree](https://formspree.io) (free tier: 50 submissions/month).

```
1. Sign up at formspree.io
2. Create a new form → copy endpoint (e.g. https://formspree.io/f/abcdwxyz)
3. Paste into FORMSPREE_ENDPOINT in src/config.ts
4. Redeploy → submit a test enquiry → confirm via email
```

Each email arrives with subject: **`New ISHA enquiry — <Name> (<City>)`**

> **Alternative:** Set `VITE_CONTACT_ENDPOINT` as an environment variable at build time to override the endpoint. Any JSON-accepting POST endpoint works.

<br/>

---

## 🌐 Deployment (Hostinger)

**ishaliving.co.in** is deployed automatically: every push to the **`production`** branch runs [`.github/workflows/deploy-hostinger.yml`](.github/workflows/deploy-hostinger.yml), which builds `frontend/` and uploads `frontend/dist/` to Hostinger over FTP.

**One-time setup** — GitHub repo → Settings → Secrets and variables → Actions:

| Secret | Where to find it (hPanel → Websites → Manage → Files → FTP Accounts) |
|:---|:---|
| `FTP_SERVER` | FTP IP / hostname |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |

Optional variable `FTP_SERVER_DIR` (default `public_html/`) if your FTP root differs.

**Releasing changes:**

```bash
git checkout production
git merge main
git push origin production   # → builds and goes live in ~1–2 minutes
git checkout main
```

You can also re-run a deploy from GitHub → Actions → *Deploy to Hostinger* → Run workflow.

<br/>

---

## 🎭 Key Features

<table>
<tr>
<td align="center" width="25%">
<h3>🌅</h3>
<b>Scene Simulator</b>
<br/><sub>Interactive day-to-night experience with live controls for light, curtains, and climate</sub>
</td>
<td align="center" width="25%">
<h3>🎬</h3>
<b>Scroll Choreography</b>
<br/><sub>GSAP-powered reveal animations, parallax, SplitText headlines, and scrub-linked progress</sub>
</td>
<td align="center" width="25%">
<h3>📱</h3>
<b>Fully Responsive</b>
<br/><sub>4K srcset images, fluid typography, and adaptive layouts from mobile to ultrawide</sub>
</td>
<td align="center" width="25%">
<h3>♿</h3>
<b>Accessible</b>
<br/><sub>Reduced motion support, keyboard nav, focus states, skip links, semantic HTML</sub>
</td>
</tr>
<tr>
<td align="center" width="25%">
<h3>🎨</h3>
<b>Premium Loader</b>
<br/><sub>Cinematic brand reveal with animated logo and progress indicator</sub>
</td>
<td align="center" width="25%">
<h3>🖼️</h3>
<b>4K Photography</b>
<br/><sub>Curated Unsplash photos with responsive srcset (640–3840px)</sub>
</td>
<td align="center" width="25%">
<h3>✉️</h3>
<b>Smart Contact</b>
<br/><sub>Formspree-powered form with honeypot spam protection and graceful fallbacks</sub>
</td>
<td align="center" width="25%">
<h3>🧈</h3>
<b>Smooth Scroll</b>
<br/><sub>Lenis inertial scrolling for a native-feeling, buttery experience</sub>
</td>
</tr>
</table>

<br/>

---

## 🌊 Regions Served

<div align="center">

```
    Kundapura  ·  Udupi  ·  Manipal  ·  Mangaluru
           ━━━━━ Coastal Karnataka ━━━━━
```

</div>

<br/>

---

## 📄 License

This project is proprietary software. All rights reserved.  
© 2026 ISHA · Intelligent Living — powered by SoVir Technologies LLP.

---

<div align="center">

<sub>

**Engineered with precision** · **Designed with care** · **Built for Coastal Karnataka**

Made with ❤️ by [SoVir Technologies LLP](https://github.com/Joylan9)

</sub>

</div>
