# AGENTS.md — Naelvi Portfolio

## Project Identity
- **Project:** Naelvi Portfolio Website
- **Domain:** me.naelvi.com
- **Owner:** Naufal Abdullah Almahdi (persona: Naelvi)
- **Stack:** Next.js 16 (App Router) + TypeScript + @libsql/client (SQLite) + JWT
- **Style:** Dark Brutalist-Minimal

---

## Source of Truth
Before any work, read in order:
1. This file (`AGENTS.md`)
2. `docs/architecture.md` — system design, DB schema, API routes, auth flow
3. `docs/features_spec.md` — all feature requirements per page
4. `docs/blueprint.md` — design system, CSS variables, component specs
5. `docs/step_by_step_plan.md` — current task tracking

If docs contradict code, **ask the user** before proceeding. Never assume.

---

## Design System Rules (NEVER VIOLATE)

### Colors
```
--color-bg-primary:    #0A0F1C   ← Main background ONLY
--color-accent:        #00E3E6   ← Cyan, ONLY accent color
--color-text-primary:  #FFFFFF
--color-text-secondary:#9BA8BB
```
- **Never** use Tailwind utility classes directly — use CSS Variables via `var(--color-*)`.
- Never add a second accent color. Cyan `#00E3E6` is the only accent.
- Never use pure black (`#000000`) as background.

### Typography
- Headings: Rubik (700, 900 weight)
- Body: Montserrat (400, 500, 600)
- Labels/Mono: JetBrains Mono
- Sizes via `clamp()` — never fixed `px` font sizes on responsive elements.

### CSS Architecture
- All CSS lives in `src/styles/` — `globals.css`, `typography.css`, `components.css`, `animations.css`
- **Never** use inline styles for visual design (only for dynamic values like GSAP transforms)
- **Never** use Tailwind unless explicitly told by user

---

## Code Patterns

### Database (libsql)
```typescript
// Always use the singleton from src/lib/db.ts
import { db } from '@/lib/db'

// Use parameterized queries ALWAYS
const result = await db.execute({
  sql: 'SELECT * FROM projects WHERE id = ?',
  args: [id]
})
```

### Auth (JWT)
```typescript
// Always verify via middleware or server-side
// Cookie name: process.env.ADMIN_COOKIE_NAME
// Use src/lib/auth.ts for sign/verify — never raw jose in routes
```

### File Upload
- Accepted MIME: `image/jpeg`, `image/png`, `image/webp`, `video/mp4`, `video/mov`
- Max size: images 10MB, videos 500MB
- Save to: `./public/uploads/[category]/[timestamp]-[filename]`
- Return path: `/uploads/[category]/[filename]` (relative for Next/Image)

### Next.js Conventions
- **App Router only** — no `pages/` directory usage
- Use Server Components by default; add `'use client'` only when needed (state, events, GSAP)
- Images: use `<Image>` from `next/image` always (not `<img>`)
- Data fetching in Server Components, pass to Client via props
- ISR: `revalidate = 3600` for portfolio pages

---

## Admin Panel Rules

- All `/admin/*` routes are protected by middleware (`src/middleware.ts`)
- Admin cookie name: `naelvi_admin` (from `process.env.ADMIN_COOKIE_NAME`)
- Admin UI uses same dark color system, NOT a "light admin" design
- Form validation: required fields marked with `*`, show inline errors
- Successful operations: show toast notification (custom, not library)

---

## Animation Rules

- GSAP for: text scramble, scroll triggers, complex sequences
- CSS transitions for: hover states, simple show/hide, card lift
- IntersectionObserver for: scroll-based reveals (use `data-animate` attribute)
- Marquee: pure CSS `@keyframes` — no JS
- Always set `will-change: transform` on animated elements, remove after animation

---

## Mobile Rules

- Touch targets: minimum 44×44px
- Test viewport: 375px (iPhone SE), 390px (iPhone 14), 768px (iPad)
- No hover-only interactions — all hover effects must have a tap equivalent on mobile
- Swipe gestures in lightbox and mobile menu
- Hamburger menu: full-screen overlay, not sidebar drawer on mobile

---

## Git Conventions

- Branch: `main` (production), `develop` (work branch)
- Commits: conventional commits — `feat:`, `fix:`, `style:`, `docs:`, `chore:`
- Never commit: `.env.local`, `data/naelvi.db`, `public/uploads/*`

---

## What NOT to Do

- Do NOT use Tailwind CSS
- Do NOT use `better-sqlite3` (native compile fails on Windows dev, use `@libsql/client`)
- Do NOT hardcode credentials anywhere in source code
- Do NOT use `<img>` directly — use Next.js `<Image>`
- Do NOT add animation libraries other than GSAP without user approval
- Do NOT make the admin panel use a different color theme (light mode)
- Do NOT add `console.log` in production code — use proper error handling
- Do NOT call external APIs for content — all data comes from local SQLite
