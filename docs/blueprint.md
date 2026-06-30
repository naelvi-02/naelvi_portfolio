# Blueprint — Naelvi Portfolio

Visual dan design system blueprint untuk `me.naelvi.com`.

---

## Design Language: Dark Brutalist-Minimal

### Filosofi
- **Dark** — background near-black navy, konten tampil sebagai cahaya di atas gelap
- **Brutalist** — raw structure terlihat, grid tidak sempurna, heavy typography, elemen yang sedikit off-center
- **Minimal** — tidak ada dekorasi berlebihan, setiap elemen punya fungsi
- **Personal** — ornamen khas (crosshair ⊕, geometric sphere, scanline) yang konsisten dengan portfolio PDF

---

## Color System

```css
:root {
  /* Backgrounds */
  --color-bg-primary:    #0A0F1C;   /* Main background */
  --color-bg-secondary:  #0E1828;   /* Section alternate */
  --color-bg-card:       #111C2E;   /* Cards, containers */
  --color-bg-elevated:   #162236;   /* Hover state, modals */

  /* Borders */
  --color-border:        rgba(255,255,255,0.07);
  --color-border-accent: rgba(0,227,230,0.3);

  /* Text */
  --color-text-primary:  #FFFFFF;
  --color-text-secondary:#9BA8BB;
  --color-text-muted:    #5A6A7E;

  /* Accent */
  --color-accent:        #00E3E6;   /* Cyan — primary accent */
  --color-accent-dim:    rgba(0,227,230,0.15);
  --color-accent-glow:   0 0 20px rgba(0,227,230,0.4);

  /* Semantic */
  --color-success:       #00C48C;
  --color-error:         #FF4D6D;
  --color-warning:       #FFB547;
}
```

---

## Typography

```css
/* Font imports */
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;900&family=Montserrat:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

:root {
  --font-display:  'Rubik', sans-serif;        /* Headings */
  --font-body:     'Montserrat', sans-serif;    /* Body text */
  --font-mono:     'JetBrains Mono', monospace; /* Code, labels, stats */

  /* Scale */
  --text-xs:   clamp(0.7rem,  1.5vw, 0.75rem);
  --text-sm:   clamp(0.8rem,  1.8vw, 0.875rem);
  --text-base: clamp(0.9rem,  2vw,   1rem);
  --text-lg:   clamp(1rem,    2.2vw, 1.125rem);
  --text-xl:   clamp(1.1rem,  2.5vw, 1.25rem);
  --text-2xl:  clamp(1.3rem,  3vw,   1.5rem);
  --text-3xl:  clamp(1.6rem,  4vw,   2rem);
  --text-4xl:  clamp(2rem,    5vw,   3rem);
  --text-5xl:  clamp(2.5rem,  7vw,   4.5rem);
  --text-hero: clamp(3.5rem, 10vw,   8rem);    /* Hero display */
}
```

---

## Spacing & Layout

```css
:root {
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;
  --space-3xl: 96px;
  --space-4xl: 128px;

  --container-max: 1400px;
  --container-pad: clamp(16px, 5vw, 80px);

  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-pill: 999px;

  --border-width: 1px;
}
```

---

## Grid System

```
Desktop (1200px+):  12-column, 24px gap
Tablet  (768–1199): 8-column,  20px gap
Mobile  (< 768):    4-column,  16px gap

Portfolio grid:
  Desktop: 3–4 col masonry
  Tablet:  2–3 col
  Mobile:  2 col (1 col for tall items)
```

---

## Component Specs

### Navbar
```
Height: 64px (desktop), 56px (mobile)
Position: sticky top-0
Background: transparent → blur(12px) + bg-secondary at scroll > 50px
Logo: "NAELVI" — Rubik 900, 1.2rem, letter-spacing: 0.3em
Links: Montserrat 500, text-sm, uppercase, color-text-secondary
Active: color-accent + border-bottom 1px color-accent
Transition: 200ms ease
```

### Project Card
```
Background: var(--color-bg-card)
Border: 1px solid var(--color-border)
Border-radius: var(--radius-md)
Overflow: hidden
Aspect ratio: thumbnail 4:3 (design/app) atau 16:9 (video)
Hover:
  - transform: translateY(-4px)
  - border-color: var(--color-border-accent)
  - overlay: rgba(10,15,28,0.85) fade in
  - overlay shows: title, client, category badge
Transition: 200ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Button
```
Primary:
  bg: var(--color-accent)
  color: #0A0F1C
  padding: 12px 28px
  font: Montserrat 600, uppercase, letter-spacing: 0.1em
  border-radius: var(--radius-pill)
  hover: brightness(1.1) + slight scale(1.03)

Ghost:
  bg: transparent
  border: 1px solid var(--color-border)
  color: var(--color-text-primary)
  hover: border-color: var(--color-border-accent), color: var(--color-accent)
```

### Badge/Pill
```
bg: var(--color-accent-dim)
color: var(--color-accent)
border: 1px solid var(--color-border-accent)
padding: 4px 12px
font: JetBrains Mono 600, text-xs, uppercase
border-radius: var(--radius-pill)
```

---

## Animation Specs

### Page Load (Hero)
```
1. Background: fade in 0.3s
2. Noise texture: fade in 0.5s
3. NAELVI text: character scramble → resolve 0.8s (GSAP TextPlugin)
4. Tagline: slide up + fade 1.0s
5. CTA buttons: fade in 1.2s
6. Ornaments: draw in (stroke-dashoffset) 1.5s
```

### Scroll-triggered
```
Section headers: slide up 40px + fade (IntersectionObserver)
Cards: stagger 50ms delay per card, fade + translateY(20px)
```

### Marquee
```
CSS animation: translateX(-50%) 25s linear infinite
Content duplicated for seamless loop
Pause on hover
Speed: ~40vw/s
```

### Lightbox
```
Open: scale(0.9) + opacity(0) → scale(1) + opacity(1), 200ms
Close: reverse, 150ms
Image pan: CSS transform on drag
Arrow navigation: slide left/right 150ms
```

---

## Decorative Elements

### Noise/Grain Texture
```css
.noise-overlay {
  background-image: url('/assets/noise.png');
  opacity: 0.04;
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
}
```

### Crosshair Ornament (SVG)
```
Size: 24px × 24px
Color: color-text-muted (rgba(90,106,126,0.6))
Position: corner markers pada card atau section
```

### Geometric Sphere (SVG wireframe)
```
From portfolio PDF: wireframe sphere outline
Used: hero background, about page
Opacity: 0.06
Animation: slow rotate (60s)
```

---

## Page-specific Layout

### Home
```
└── Navbar
└── Hero (100vh)
    ├── [LEFT] "NAELVI" giant text + tagline + CTAs
    └── [RIGHT] abstract geometric shape / animated ornament
└── Marquee strip
└── Featured Works (grid 3 card)
└── Stats bar
└── Footer
```

### Portfolio
```
└── Navbar
└── Page header ("PORTFOLIO" + filter tabs)
└── Project grid (masonry)
└── Footer
```

### About
```
└── Navbar
└── Hero strip (name + role)
└── Bio (photo + text)
└── Skills chips
└── Experience timeline
└── Tools grid
└── Download CV CTA
└── Footer
```

### Contact
```
└── Navbar
└── Header ("LET'S TALK")
└── [LEFT] Contact info + social icons
└── [RIGHT] Contact form
└── Footer
```

### Admin
```
└── Admin Sidebar (fixed, 240px)
└── Main content (scroll)
    ├── Dashboard → stats + recent
    ├── Projects → table list
    └── Project form → fields + media
```

---

## Mobile Adaptations

| Element | Desktop | Mobile |
|---|---|---|
| Hero text | 8rem | 3.5rem |
| Grid | 3-4 col | 2 col |
| Navbar | horizontal links | hamburger |
| About bio | 2 col | 1 col stack |
| Contact | 2 col | 1 col stack |
| Admin | sidebar | bottom nav / drawer |
| Lightbox | arrow nav | swipe |
| Card hover | CSS hover | tap to show overlay |
