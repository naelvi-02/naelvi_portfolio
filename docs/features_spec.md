# Features Specification — Naelvi Portfolio

## F01 — Home Page

### Hero Section
- Display name: **NAELVI** (large, bold, uppercase, Rubik Black)
- Tagline: *Graphic Designer & AI Specialist*
- Subtitle: Short 1-line bio
- CTA buttons: `[View Work →]` `[Contact Me]`
- Background: dark navy + grain texture + animated geometric ornaments
- Text animation: character scramble/glitch reveal on load (GSAP)
- Marquee: scrolling ticker di bagian atas atau bawah hero

### Featured Works
- 3–4 karya terpilih (`is_featured = 1` dari DB)
- Layout: asymmetric grid (bukan equal grid)
- Card: thumbnail + overlay saat hover (judul + kategori)
- CTA: `[All Works →]`

### Stats bar (optional)
- "7+ Clients" | "3+ Years" | "20+ Projects" — minimal, monospace font

---

## F02 — Portfolio Page

### Filter Tabs
- All / Design / Video / App
- Animasi smooth saat switch kategori (fade + reorder)
- URL query param sync: `/portfolio?cat=design`

### Project Grid
- Masonry/uneven grid pada desktop
- 2 kolom pada mobile
- Setiap card: thumbnail, judul, client, tahun, badge kategori
- Hover: scale 1.02, overlay semi-transparent dengan info singkat + ikon interaksi

### Interaction per kategori:
| Kategori | Click behaviour |
|---|---|
| Design / Video / App | Link ke `/portfolio/[slug]` halaman detail dengan project brief dan gallery media |
| Gallery (di dalam detail) | Buka Lightbox (full-screen image viewer) atau VideoModal |

---

## F03 — Project Detail Page `/portfolio/[slug]`

- Hero: project title + client + metadata pills (tahun, tools)
- Gallery: grid foto/media project
- Description: teks panjang proyek
- Navigasi: `← Prev Project` / `Next Project →`
- Khusus App: section "About this App" + link demo / screenshots

---

## F04 — About Page

### Bio section
- Foto (left) + teks bio (right) — reverse pada mobile
- Nama: Naufal Abdullah Almahdi, S.I.Kom
- Persona: Naelvi
- Role: Graphic Designer & AI Specialist

### Skills
- Tag-style chips: Brand Identity, Social Media Design, Video Editing, UI/UX, AI Tools
- Tools: Photoshop, Illustrator, Figma, CapCut, Canva, Adobe Premiere

### Experience Timeline
| Tahun | Perusahaan | Role |
|---|---|---|
| 2022 | iNews TV Surabaya | Graphic Designer |
| 2022–2023 | Idekita Laser | Graphic Designer |
| 2023 | Waffleboss Surabaya | Graphic Designer |
| 2024 | Whittaker ID | Graphic Designer |
| 2024 | Hana Creative Studio | Canva Template Creator (Freelance) |
| 2025–Now | CV. Wahyu Golden Indonesia | Graphic Designer & Photographer |

### Education
- Universitas Negeri Surabaya (UNESA), 2019–2024
- S1 Ilmu Komunikasi

### Download CV
- Button: `[Download CV]` → PDF file di `/public/assets/cv.pdf`

---

## F05 — Contact Page

### Contact Info
- Email: hallo.naufal@naelvi.com
- WhatsApp: +62 852-3695-0672
- Instagram: @nopalnaelvi
- LinkedIn: [URL dari admin panel]

### Contact Form
- Fields: Nama, Email, Pesan
- Submit: `mailto:` action atau Formspree endpoint
- Success state: animasi tick + pesan konfirmasi

---

## F06 — Admin Panel

### Login `/admin/login`
- Username + Password
- JWT cookie di-set setelah berhasil
- Rate limit awareness (gagal 5x → tampilkan pesan tunggu)
- Redirect ke `/admin/dashboard` setelah login

### Dashboard `/admin/dashboard`
- Stats cards: Total Projects, Design count, Video count, App count
- Recent activity: 5 project terakhir diupdate
- Quick actions: `[+ New Project]`

### Project List `/admin/projects`
- Tabel: thumbnail mini, judul, kategori, tahun, status featured
- Actions per row: Edit | Delete
- Filter/search bar
- Drag-to-reorder (order_idx update)

### Create/Edit Project `/admin/projects/new` & `/admin/projects/[id]`

**Form fields:**
- Title *
- Slug * (auto-generate dari title, editable)
- Category * (Design / Video / App)
- Subcategory (text input)
- Client
- Sector
- Year
- Description (textarea)
- Tools (tag input, comma-separated)
- Featured toggle
- Order index (number)

**Media section:**
- Thumbnail upload (drag & drop, preview)
- Additional media: multiple uploads
  - Per item: type (image/video/youtube), URL or file, caption
  - Reorder media items

### Upload
- Max size: images 10MB, videos 500MB
- Accepted: jpg, png, webp, mp4, mov
- Auto-convert image to webp via sharp (optional)
- Preview before save

---

## F07 — Navigation

### Desktop
- Sticky navbar: Logo (left) + Menu links (right): Home, Portfolio, About, Contact
- Active state: cyan underline
- Scroll > 50px: backdrop-blur + slightly darker bg

### Mobile
- Hamburger menu button
- Full-screen overlay menu saat dibuka
- Smooth slide-in animation
- Close on link click atau tap outside

---

## F08 — Footer

- Copyright: `© 2025 Naelvi. All rights reserved.`
- Social icons: Email, WA, Instagram, LinkedIn
- Tagline kecil: `Designed & built by Naelvi`

---

## NFR (Non-Functional Requirements)

| Requirement | Target |
|---|---|
| Mobile Lighthouse Performance | ≥ 85 |
| Accessibility | ≥ 90 |
| First Contentful Paint | < 2s |
| Touch targets | ≥ 44×44px |
| Image format | WebP (auto via Next/Image) |
| Font loading | `display: swap` |
| SEO | Proper title, meta desc, OG tags per page |
| Responsiveness | 320px – 2560px |
