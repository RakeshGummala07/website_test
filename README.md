# Jayanth Technologies — Website

A premium, dark-first marketing website for **Jayanth Technologies Pvt. Ltd.**, a Hyderabad-based IT
services company. Built with React, Vite, Tailwind CSS and Framer Motion, with a working contact form
backed by a serverless email function.

---

## 1. Features

- 6 pages — Home, About, Services, Products, Careers, Contact — with React Router
- Glassmorphism navbar that transforms on scroll, plus an animated full-screen mobile menu
- Interactive hero visual, architecture diagram, spotlight service cards, magnetic buttons, cursor glow
- Scroll-reveal animations built on a small shared Framer Motion variant system
- Working contact form (client-side validation + honeypot spam field) that emails a configurable
  inbox via a serverless function and [Resend](https://resend.com)
- Interactive office-location map (OpenStreetMap embed, no API key required)
- `prefers-reduced-motion` respected throughout; keyboard-navigable with visible focus states
- SEO: per-page titles/meta descriptions, Open Graph & Twitter tags, canonical URLs, `robots.txt`, `sitemap.xml`
- Code-split routes and a curated icon import (not a full-library import) to keep bundles small

## 2. Tech stack

| Layer      | Choice                                   |
|------------|-------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Framer Motion |
| Icons      | lucide-react                              |
| Routing    | React Router 6                            |
| Contact API| Vercel serverless function + Resend       |

## 3. Project structure

```
src/
├── assets/            # (add real logo/image assets here)
├── components/        # Navbar, Footer, cards, Map, hero visual, etc.
├── pages/              # Home, About, Services, Products, Careers, Contact, NotFound
├── animations/
│   └── variants.js     # shared Framer Motion variants (fadeUp, staggerContainer, ...)
├── data/                # services.js, products.js, careers.js, technologies.js
├── config/
│   └── company.js       # single source of truth for company info + office location
├── lib/
│   └── icons.js          # curated lucide-react icon registry
├── App.jsx
├── main.jsx
└── index.css
api/
└── contact.js           # serverless function that sends the contact form email
```

## 4. Installation

Requires Node.js 18+.

```bash
npm install
```

## 5. Environment variables

Copy the example file and fill in real values:

```bash
cp .env.example .env
```

| Variable          | Purpose                                                        |
|-------------------|------------------------------------------------------------------|
| `CONTACT_EMAIL`   | Inbox that receives contact form submissions                     |
| `RESEND_API_KEY`  | Secret API key from [resend.com](https://resend.com) — server only |
| `RESEND_FROM`     | A verified "from" address/display name in your Resend account   |

`RESEND_API_KEY` is only ever read inside `api/contact.js`, which runs on the server. It is never
bundled into the frontend, so it's safe from exposure in the browser.

## 6. Running locally

```bash
npm run dev       # start the Vite dev server
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

To test the contact form locally end-to-end, run the project with the [Vercel CLI](https://vercel.com/docs/cli)
so that `/api/contact` is served alongside the frontend:

```bash
npm i -g vercel
vercel dev
```

## 7. Deployment

**Frontend:** deploy to [Vercel](https://vercel.com) — it will detect the Vite app and the `api/`
folder automatically and deploy `api/contact.js` as a serverless function alongside the static site.

```text
Frontend         → Vercel (static build + serverless function)
Contact API      → api/contact.js (Vercel serverless function)
Email provider   → Resend, sending to CONTACT_EMAIL
```

Set `CONTACT_EMAIL`, `RESEND_API_KEY` and `RESEND_FROM` as environment variables in your Vercel
project settings (Project → Settings → Environment Variables) — do not commit a real `.env` file.

If you deploy the frontend somewhere that doesn't run serverless functions (e.g. static hosting only),
deploy `api/contact.js` separately (Vercel Functions, a small Express server, AWS Lambda, etc.) and
update the `fetch("/api/contact", ...)` call in `src/pages/Contact.jsx` to point at that URL.

## 8. Customization guide

### Replace the logo
Edit `src/components/Logo.jsx` — swap the inline `<svg>` mark for the real logo, or replace the whole
component with `<img src="/logo.svg" />`. Every other component only ever imports `<Logo />`, so nothing
else needs to change.

### Replace company information
Edit `src/config/company.js`. This single file drives the name, tagline, location, contact email/phone
(display only — the working inbox is the `CONTACT_EMAIL` env var), and social links used across the
navbar, footer and contact page. Leaving a social URL blank hides that icon in the footer automatically.

### Replace the office map location
Edit `OFFICE_LOCATION` in `src/config/company.js` with the confirmed latitude/longitude (and
city/state/country if they change). `src/components/Map.jsx` reads from this config — no other changes
needed.

### Add or edit services
Edit `src/data/services.js`. Each entry needs a `slug`, `icon` (a name registered in
`src/lib/icons.js` — add new ones there if needed), `name`, `description`, `points` array, and a `span`
(`small`, `tall`, `wide`, or `large`) that controls its size in the asymmetric grid on the Services page
and homepage.

### Add or edit products/solutions
Edit `src/data/products.js` — `slug`, `icon`, `name`, `description`, and a `features` array.

### Add or edit careers listings
Edit `src/data/careers.js` — `slug`, `title`, `location`, `type`, `stack` (array of strings). Leaving the
array empty automatically shows the "no open positions" empty state on the Careers page instead of a
blank screen.

## 9. Design notes

- Color system, gradients and spacing tokens live in `tailwind.config.js`
- Reusable animation variants live in `src/animations/variants.js` — reuse these instead of writing new
  Framer Motion transitions in individual components
- Icons are looked up by name through `src/lib/icons.js` rather than `import * as Icons from
  "lucide-react"`, which keeps the icon set out of the production bundle except for the icons actually used

## 10. Before going live

- [ ] Replace all `[Company Email]`, `[Phone Number]`, `[Office Address]` placeholders in
      `src/config/company.js`
- [ ] Set real `CONTACT_EMAIL`, `RESEND_API_KEY`, `RESEND_FROM` in your hosting provider
- [ ] Verify your sending domain in Resend so `RESEND_FROM` delivers reliably
- [ ] Replace the placeholder logo in `src/components/Logo.jsx`
- [ ] Update `OFFICE_LOCATION` with the real office coordinates
- [ ] Fill in real social URLs in `src/config/company.js`
- [ ] Replace placeholder statistics in `src/data/technologies.js` (`stats`) with real figures
- [ ] Update `careers.js` with real open roles (or leave empty for the built-in empty state)
- [ ] Add a real Open Graph image at `public/og-image.png` (1200×630px recommended)
