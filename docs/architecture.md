# Architecture — Naelvi Portfolio (me.naelvi.com)

## Overview

Full-stack Next.js 14 app dengan App Router. SSG untuk public pages, server actions untuk admin. SQLite sebagai database lokal di VPS. Auth via JWT httpOnly cookie.

```
Browser ──► Cloudflare (CDN + WAF) ──► VPS (PM2 / Docker)
                                          ├── Next.js 14 (port 3000)
                                          │   ├── Public pages (SSG/ISR)
                                          │   └── Admin panel (SSR, protected)
                                          ├── SQLite database (/data/naelvi.db)
                                          └── File storage (/public/uploads/)
```

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Database | SQLite via better-sqlite3 | 9.x |
| Auth | JWT (jose) + bcryptjs | - |
| File upload | Multer (via API route) | 1.x |
| Image optimization | Next.js Image + sharp | built-in |
| Styling | Vanilla CSS (CSS Variables) | - |
| Animation | GSAP + CSS transitions | 3.x |
| Deployment | PM2 on VPS | - |
| CDN/Security | Cloudflare | - |

---

## Directory Structure

```
naelvi-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← Root layout, fonts, metadata
│   │   ├── page.tsx                ← Home page
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── portfolio/
│   │   │   ├── page.tsx            ← Portfolio grid (all)
│   │   │   └── [slug]/
│   │   │       └── page.tsx        ← Project detail
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── admin/
│   │       ├── login/
│   │       │   └── page.tsx
│   │       ├── dashboard/
│   │       │   └── page.tsx
│   │       ├── projects/
│   │       │   ├── page.tsx        ← Project list
│   │       │   ├── new/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       └── page.tsx    ← Edit project
│   │       └── layout.tsx          ← Admin layout (auth guard)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturedWorks.tsx
│   │   │   └── Marquee.tsx
│   │   ├── portfolio/
│   │   │   ├── ProjectGrid.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── FilterTabs.tsx
│   │   │   ├── Lightbox.tsx        ← Design image viewer
│   │   │   └── VideoModal.tsx      ← Video player modal
│   │   ├── about/
│   │   │   ├── Bio.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── Tools.tsx
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx
│   │   │   └── SocialLinks.tsx
│   │   └── admin/
│   │       ├── ProjectForm.tsx
│   │       ├── MediaUploader.tsx
│   │       └── Sidebar.tsx
│   │
│   ├── lib/
│   │   ├── db.ts                   ← SQLite connection singleton
│   │   ├── auth.ts                 ← JWT sign/verify utils
│   │   ├── projects.ts             ← Project CRUD queries
│   │   └── upload.ts               ← File upload helpers
│   │
│   ├── types/
│   │   └── index.ts                ← Shared TypeScript types
│   │
│   └── styles/
│       ├── globals.css             ← CSS Variables, reset, base
│       ├── typography.css
│       ├── components.css
│       └── animations.css
│
├── public/
│   ├── uploads/                    ← User-uploaded media (gitignored)
│   └── assets/
│       ├── naelvi-logo.svg
│       └── noise.png               ← Grain texture overlay
│
├── data/
│   └── naelvi.db                  ← SQLite database (gitignored)
│
├── scripts/
│   ├── init-db.js                  ← Create tables
│   └── create-admin.js             ← Hash password + insert admin user
│
├── .agents/
│   └── AGENTS.md                   ← AI agent rules for this project
│
├── docs/
│   ├── architecture.md             ← This file
│   ├── features_spec.md
│   ├── blueprint.md
│   └── step_by_step_plan.md
│
├── .env.local                      ← Secrets (gitignored)
├── .gitignore
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Database Schema

```sql
-- Table: projects
CREATE TABLE IF NOT EXISTS projects (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  title       TEXT    NOT NULL,
  client      TEXT,
  category    TEXT    NOT NULL CHECK(category IN ('design','video','app')),
  subcategory TEXT,                     -- e.g. 'branding', 'social-media', 'logo'
  sector      TEXT,                     -- e.g. 'Food and Beverage', 'Apparel'
  year        INTEGER,
  description TEXT,
  tools       TEXT    DEFAULT '[]',     -- JSON array: ["Photoshop","Illustrator"]
  thumbnail   TEXT,                     -- path: /uploads/xxx.webp
  media       TEXT    DEFAULT '[]',     -- JSON array of {type,url,caption}
  order_idx   INTEGER DEFAULT 0,
  is_featured INTEGER DEFAULT 0,        -- boolean: show on home page
  created_at  TEXT    DEFAULT (datetime('now')),
  updated_at  TEXT    DEFAULT (datetime('now'))
);

-- Table: admin_users
CREATE TABLE IF NOT EXISTS admin_users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT    NOT NULL UNIQUE,
  password_hash TEXT    NOT NULL,
  created_at    TEXT    DEFAULT (datetime('now'))
);

-- Trigger: auto-update updated_at
CREATE TRIGGER IF NOT EXISTS update_projects_timestamp
  AFTER UPDATE ON projects
  BEGIN
    UPDATE projects SET updated_at = datetime('now') WHERE id = NEW.id;
  END;
```

---

## API Routes (Next.js App Router)

```
POST   /api/admin/login           ← Verify credentials, set JWT cookie
POST   /api/admin/logout          ← Clear JWT cookie
GET    /api/admin/verify          ← Verify session (middleware use)

GET    /api/projects              ← Public: list all projects (with filters)
GET    /api/projects/[slug]       ← Public: get single project

POST   /api/admin/projects        ← Create project (protected)
PUT    /api/admin/projects/[id]   ← Update project (protected)
DELETE /api/admin/projects/[id]   ← Delete project (protected)

POST   /api/admin/upload          ← Upload media file (protected)
DELETE /api/admin/upload          ← Delete media file (protected)
```

---

## Auth Flow

```
1. Admin hits /admin/login
2. POST /api/admin/login with {username, password}
3. Server: bcrypt.compare → sign JWT (jose) → set httpOnly cookie "naelvi_admin"
4. All /admin/* routes → middleware checks cookie → verify JWT
5. Invalid/missing JWT → redirect to /admin/login
6. Logout → POST /api/admin/logout → clear cookie
```

**JWT payload:**
```json
{ "sub": "admin_user_id", "iat": 1234567890, "exp": 1234567890 }
```

**Cookie settings:** `httpOnly: true`, `secure: true` (Cloudflare handles TLS), `sameSite: 'lax'`, `maxAge: 86400` (24h)

---

## Data Flow: Public Portfolio

```
Build time (SSG):
  generateStaticParams / page with no dynamic data
  → SQLite query
  → Pre-rendered HTML pages

Runtime (ISR):
  revalidate: 3600 (1 hour)
  → Re-fetch from SQLite on background
  → Serve stale while revalidating
```

---

## Environment Variables

```bash
# .env.local
JWT_SECRET=<random-256-bit-hex>       # openssl rand -hex 32
ADMIN_COOKIE_NAME=naelvi_admin
DATABASE_PATH=./data/naelvi.db
UPLOAD_DIR=./public/uploads
NEXT_PUBLIC_SITE_URL=https://me.naelvi.com
```

---

## Deployment (VPS)

```bash
# Build
npm run build

# Start with PM2
pm2 start npm --name "naelvi-portfolio" -- start
pm2 startup
pm2 save

# Nginx reverse proxy config
server {
  listen 80;
  server_name me.naelvi.com;
  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
  client_max_body_size 500M;  # for video uploads
}
```

---

## Security

- Cloudflare: DDoS protection, WAF rules, bot management
- JWT httpOnly cookie: XSS-safe
- bcrypt password hashing (cost factor 12)
- Rate limiting via Cloudflare (admin login endpoint)
- File upload: whitelist MIME types (image/jpeg, image/png, image/webp, video/mp4)
- Max file size: images 10MB, videos 500MB
- SQL injection: N/A (better-sqlite3 parameterized queries only)
