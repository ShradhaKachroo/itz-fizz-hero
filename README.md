# ITZ FIZZ — Kinetic Supercar Scroll Experience

A take-home engineering implementation of a high-performance, scroll-driven interactive hero section animation built with Next.js (App Router), GSAP ScrollTrigger, Lenis smooth scrolling, and Tailwind CSS. Fully optimized for static export and deployment on GitHub Pages.

---

## 🔗 Links & Submissions

- **Live URL**: `https://<username>.github.io/<repo-name>/`
- **GitHub Repository**: `https://github.com/<username>/<repo-name>`

*(Replace `<username>` and `<repo-name>` with your GitHub username and repository name).*

---

## 🏎️ Reference & Inspiration

- **Reference Demo**: [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)
- **Key Enhancements Built Here**:
  1. **Strict GPU Acceleration**: Animacy restricted to hardware-accelerated properties (`transform`, `opacity`) with `will-change: transform` and `force3D: true` to avoid layout reflows and repaints.
  2. **Orchestrated Multi-Phase Motion**: Separated cleanly into a master intro load timeline and a synchronized scrubbed ScrollTrigger pinned sequence.
  3. **Fluid Inertia with Lenis**: Lenis smooth scroll ticker directly driving and synchronized with GSAP's internal render loop.
  4. **Responsive Layout & MatchMedia**: Tailored translation distances, scales, and letter layouts across 360px mobile viewports to ultra-wide displays.
  5. **Accessibility First**: Respects `prefers-reduced-motion` media queries with automatic fallback to static layouts.
  6. **Production-Ready Static Export**: Automated GitHub Actions CI/CD workflow deploying to GitHub Pages with `.nojekyll` and dynamic repository `basePath` resolution.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Static HTML Export)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS 3.4 (Vanilla CSS variables, custom typography, dark cyber aesthetic)
- **Animation Engine**: GSAP 3.12 (Core + ScrollTrigger plugin)
- **Smooth Scrolling**: Lenis 1.1 (Synchronized via `gsap.ticker`)
- **Icons**: Lucide React
- **Typography**: Google Fonts via `next/font/google` (`Outfit` & `Space Grotesk`)

---

## 🎬 How Animations Work

The animation architecture is isolated in [`hooks/useHeroAnimation.ts`](./hooks/useHeroAnimation.ts) and follows a two-tier choreography:

### 1. Initial Load Master Timeline (`introTl`)
On component mount, a single master GSAP timeline coordinates an entrance sequence with `power3.out` and `back.out(1.2)` easing:
- **Category Badge**: Slips downward with a gentle fade.
- **Headline Stagger**: The headline `"W E L C O M E   I T Z   F I Z Z"` is rendered with each letter inside an isolated `<span className="headline-letter">`. GSAP animates these characters upward (`y: 35 -> 0`, `opacity: 0 -> 1`) with an aggressive 35ms stagger.
- **Car Ingress**: The supercar slides into its starting lane (`x: -80 -> 0`, `scale: 0.94 -> 1`).
- **Stats Grid**: The 4 impact metrics reveal sequentially with an 80ms stagger delay.
- **Scroll Prompt**: A pulsing `"Scroll to Accelerate"` hint fades in at the bottom.

### 2. Scroll-Driven Scrub Animation (`scrollTl`)
When the user scrolls, GSAP's `ScrollTrigger` locks the hero section for a virtual distance of roughly **240vh** (`pin: true`, `scrub: 1.2`):
- **Immediate Scroll Hint Dismissal**: Fades out within the first 10% of scroll progress.
- **Dynamic Speed Translation**: The car translates across the track (`x: calculateDistance`), where the distance is dynamically calculated based on viewport dimensions (`window.innerWidth - carWidth`).
- **Kinetic Suspension Dynamics**: Keyframed rotation (`1.2deg -> -0.6deg -> 0deg`) and subtle scale expansion simulate aerodynamic downforce and acceleration.
- **Glowing Speed Trail**: An animated cyan speed trail unrolls continuously behind the vehicle, marking its trajectory.
- **Reactive Headline Wave**: As the vehicle travels across, the headline characters illuminate with neon cyan glow and parallax upwards, yielding priority to the vehicle.
- **Stats Parallax**: Metric cards subtly elevate and shift with parallax depth.
- **Bidirectional Scrubbing**: Scrolling back up reverses the entire state sequence smoothly with zero frame stutter or layout shift.
- **Natural Pin Release**: At 100% scroll progress, the hero section unpins seamlessly into the subsequent feature showcase section ([`components/NextSection.tsx`](./components/NextSection.tsx)).

---

## 📂 Project Structure

```
itz-fizz-hero/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── app/
│   ├── globals.css             # Tailwind directives, theme variables, glassmorphism
│   ├── layout.tsx              # Root layout with Outfit & Space Grotesk fonts
│   └── page.tsx                # Page assembling Hero, NextSection, and Footer
├── components/
│   ├── CarVisual.tsx           # Supercar asset, glowing speed trail & road track
│   ├── Hero.tsx                # Pinned hero section orchestration
│   ├── HeroHeadline.tsx        # Letter-spaced split spans headline
│   ├── NextSection.tsx         # Natural content unpin release section
│   ├── SmoothScroll.tsx        # Lenis smooth scroll provider + GSAP ticker
│   └── StatsGrid.tsx           # 4 key performance metric cards
├── hooks/
│   └── useHeroAnimation.ts     # Isolated GSAP master timeline & ScrollTrigger scrub
├── lib/
│   ├── gsap.ts                 # GSAP & ScrollTrigger single-instance registration
│   └── utils.ts                # Class merging & GitHub Pages basePath resolver
├── public/
│   ├── .nojekyll               # Prevents GitHub Pages underscore file filtering
│   └── images/
│       └── car.svg             # High-detail scalable vector supercar asset
├── next.config.mjs             # Static export and basePath configuration
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind theme tokens and tracking
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.x or 20+
- npm or yarn / pnpm

### Installation
```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Static Build
```bash
npm run build
```
This exports the static website to the `./out` directory.

---

## 🌐 Deploying to GitHub Pages

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "feat: complete scroll-driven hero section animation"
git branch -M main
git remote add origin https://github.com/<username>/<repo-name>.git
git push -u origin main
```

### 2. Enable GitHub Pages in Repository Settings
1. Navigate to **Settings > Pages** on your GitHub repository.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. The included workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) will trigger automatically on push to `main` and deploy the static `./out` bundle with the correct `basePath`.

---

## ⚡ Performance & Accessibility Highlights
- **Strict Transform Animating**: Zero layout recalculation or margin/width animations.
- **Strict Mode Safe**: Handled cleanly with `gsap.context()` and complete unmount teardown via `ctx.revert()`.
- **Responsive matchMedia**: Tailored parameters for screens `< 768px` and `>= 768px`.
- **Reduced Motion Support**: Bypasses pinning and scrub automatically when `prefers-reduced-motion` is active.
- **Font & Asset Sync**: Calls `ScrollTrigger.refresh()` after fonts and assets settle.
