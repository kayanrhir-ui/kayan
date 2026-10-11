# Qabana — Persian RTL Framing Website

## Overview
Static vanilla JS single-page application (SPA) for Qabana (قابانا), a Persian online picture-framing business. No build step, no backend — all data is client-side demo content in `js/data.js`.

## Tech Stack
- Pure HTML/CSS/JS (no framework, no build step)
- Hash-based router (`#/path`) in `js/app.js`
- Cart state via `localStorage`
- Vazirmatn font from Google Fonts
- Served by nginx:alpine via `docker-compose.base44.yml`

## File Structure
- `index.html` — HTML shell
- `css/styles.css` — Complete design system (Atelier Palette, RTL, responsive)
- `js/data.js` — All demo data (products, categories, blog, frame styles, FAQs)
- `js/store.js` — Cart store, toast, modal, Persian number helpers
- `js/app.js` — Router, header, footer, all page renderers

## Running Locally
```bash
docker compose -f docker-compose.base44.yml up -d
# Site at http://localhost:3000
```

## Key Features
- Full Persian RTL (`lang="fa" dir="rtl"`)
- Hash-based SPA routing (20 routes)
- Functional frame builder with live preview, pricing, image upload
- Cart with localStorage persistence
- Checkout flow with validation
- Product catalog with filtering and sorting
- Blog listing and article pages
- Search (client-side, products + blog)
- Mobile drawer navigation
- Responsive (360px → 1440px)

## Notes
- All product/blog data is editable demo content — replace `js/data.js` with real backend data
- Payment gateway not configured — checkout marks it as integration-ready
- Contact form submissions are client-side only (no backend storage)
- Images are Unsplash placeholders — replace with real Qabana assets
- Contact details (phone, email, address) are placeholders in `js/data.js` → `siteSettings`
