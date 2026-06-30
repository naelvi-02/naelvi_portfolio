# Step-by-Step Build Plan — Naelvi Portfolio

## Phase 1 — Foundation (Database + Auth + Structure)

- [ ] 1.1 Create directory structure (`src/`, `scripts/`, `data/`, `.agents/`)
- [ ] 1.2 Write `scripts/init-db.js` — create SQLite tables
- [ ] 1.3 Write `scripts/create-admin.js` — bcrypt hash + insert admin
- [ ] 1.4 Write `src/lib/db.ts` — libsql client singleton
- [ ] 1.5 Write `src/lib/auth.ts` — JWT sign/verify (jose)
- [ ] 1.6 Write `src/lib/projects.ts` — CRUD query functions
- [ ] 1.7 Write `src/types/index.ts` — shared TS types (Project, MediaItem, etc.)
- [ ] 1.8 Write `src/middleware.ts` — protect `/admin/*` routes
- [ ] 1.9 Create `.env.local` template

## Phase 2 — API Routes

- [ ] 2.1 `POST /api/admin/login` — verify + set JWT cookie
- [ ] 2.2 `POST /api/admin/logout` — clear cookie
- [ ] 2.3 `GET /api/projects` — list with optional ?cat= filter
- [ ] 2.4 `GET /api/projects/[slug]` — single project
- [ ] 2.5 `POST /api/admin/projects` — create (protected)
- [ ] 2.6 `PUT /api/admin/projects/[id]` — update (protected)
- [ ] 2.7 `DELETE /api/admin/projects/[id]` — delete (protected)
- [ ] 2.8 `POST /api/admin/upload` — file upload handler

## Phase 3 — Design System (CSS)

- [ ] 3.1 `globals.css` — CSS variables, reset, base styles
- [ ] 3.2 `typography.css` — Google Fonts, type scale, heading styles
- [ ] 3.3 `components.css` — button, badge, card, input, form styles
- [ ] 3.4 `animations.css` — keyframes, marquee, transitions, noise overlay
- [ ] 3.5 Generate `noise.png` SVG filter or use pre-built grain

## Phase 4 — Layout Components

- [ ] 4.1 `Navbar.tsx` — sticky, scroll blur, mobile hamburger
- [ ] 4.2 `MobileMenu.tsx` — overlay menu
- [ ] 4.3 `Footer.tsx` — copyright + social icons

## Phase 5 — Home Page

- [ ] 5.1 `Hero.tsx` — GSAP text scramble, CTAs, ornaments
- [ ] 5.2 `Marquee.tsx` — CSS infinite scroll text
- [ ] 5.3 `FeaturedWorks.tsx` — 3-card grid from `is_featured=1`
- [ ] 5.4 Stats bar component
- [ ] 5.5 `app/page.tsx` — assemble home page

## Phase 6 — Portfolio Page

- [ ] 6.1 `FilterTabs.tsx` — category filter with animation
- [ ] 6.2 `ProjectCard.tsx` — card with hover overlay
- [ ] 6.3 `ProjectGrid.tsx` — grid + filter logic
- [ ] 6.4 `Lightbox.tsx` — full-screen image viewer (keyboard + touch)
- [ ] 6.5 `VideoModal.tsx` — video player modal
- [ ] 6.6 `app/portfolio/page.tsx` — assemble portfolio page
- [ ] 6.7 `app/portfolio/[slug]/page.tsx` — project detail

## Phase 7 — About Page

- [ ] 7.1 `Bio.tsx` — photo + text
- [ ] 7.2 `Skills.tsx` — tag chips
- [ ] 7.3 `Experience.tsx` — timeline component
- [ ] 7.4 `Tools.tsx` — tools grid/icons
- [ ] 7.5 `app/about/page.tsx` — assemble

## Phase 8 — Contact Page

- [ ] 8.1 `SocialLinks.tsx` — icon links
- [ ] 8.2 `ContactForm.tsx` — form with validation
- [ ] 8.3 `app/contact/page.tsx` — assemble

## Phase 9 — Admin Panel

- [ ] 9.1 `app/admin/login/page.tsx` — login form
- [ ] 9.2 `app/admin/layout.tsx` — auth guard + sidebar layout
- [ ] 9.3 `Sidebar.tsx` — admin navigation
- [ ] 9.4 `app/admin/dashboard/page.tsx` — stats
- [ ] 9.5 `app/admin/projects/page.tsx` — project table list
- [ ] 9.6 `ProjectForm.tsx` — create/edit form
- [ ] 9.7 `MediaUploader.tsx` — file upload with preview
- [ ] 9.8 `app/admin/projects/new/page.tsx`
- [ ] 9.9 `app/admin/projects/[id]/page.tsx`

## Phase 10 — Polish & Seed Data

- [ ] 10.1 Seed initial project data (7 design projects from portfolio PDF)
- [ ] 10.2 Seed video placeholder data (3 corp + 1 personal)
- [ ] 10.3 Seed app placeholder data (3 apps from WR)
- [ ] 10.4 Add OG tags, meta description per page
- [ ] 10.5 Test mobile (375px, 414px, 768px)
- [ ] 10.6 Test admin full CRUD flow
- [ ] 10.7 Run `next build` — no errors

## Phase 11 — VPS Deployment Setup

- [ ] 11.1 Create Dockerfile (optional)
- [ ] 11.2 Create PM2 ecosystem.config.js
- [ ] 11.3 Create Nginx config snippet
- [ ] 11.4 Write deployment README

---

## Priority Order

Critical path: Phase 1 → 2 → 3 → 4 → 5 → 6

Admin panel (Phase 9) bisa paralel setelah Phase 2 selesai.
