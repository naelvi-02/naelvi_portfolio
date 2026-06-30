/**
 * Seed script — populates DB with placeholder projects
 * Run: node scripts/seed-projects.js
 */
const { createClient } = require('@libsql/client')
const path = require('path')

const DB_PATH = path.resolve(process.cwd(), 'data/naelvi.db')
const db = createClient({ url: `file:${DB_PATH}` })

const projects = [
  // === DESIGN — Waffleboss ===
  { slug: 'waffleboss-brand-identity', title: 'Brand Identity', client: 'Waffleboss Surabaya', category: 'design', subcategory: 'branding', year: 2023, description: 'Complete brand identity system for Waffleboss Surabaya including logo, color palette, typography, and brand guidelines.', tools: ['Illustrator', 'Photoshop', 'Figma'], is_featured: 1, order_idx: 1 },
  { slug: 'waffleboss-socmed-kit', title: 'Social Media Kit', client: 'Waffleboss Surabaya', category: 'design', subcategory: 'social media', year: 2023, description: 'Comprehensive social media template kit for Instagram and Facebook campaigns.', tools: ['Photoshop', 'Canva'], is_featured: 0, order_idx: 2 },
  { slug: 'waffleboss-packaging', title: 'Packaging Design', client: 'Waffleboss Surabaya', category: 'design', subcategory: 'packaging', year: 2023, description: 'Product packaging design for Waffleboss signature waffle boxes and bags.', tools: ['Illustrator', 'Photoshop'], is_featured: 0, order_idx: 3 },

  // === DESIGN — Whittaker ===
  { slug: 'whittaker-brand-refresh', title: 'Brand Refresh', client: 'Whittaker ID', category: 'design', subcategory: 'branding', year: 2024, description: 'Brand refresh and visual identity update for Whittaker ID.', tools: ['Illustrator', 'Figma'], is_featured: 1, order_idx: 4 },
  { slug: 'whittaker-socmed-content', title: 'Social Media Content', client: 'Whittaker ID', category: 'design', subcategory: 'social media', year: 2024, description: 'Monthly social media content creation and management for Instagram.', tools: ['Photoshop', 'Canva', 'Lightroom'], is_featured: 0, order_idx: 5 },
  { slug: 'whittaker-campaign-visual', title: 'Campaign Visuals', client: 'Whittaker ID', category: 'design', subcategory: 'campaign', year: 2024, description: 'Promotional campaign visuals for seasonal sales and product launches.', tools: ['Photoshop', 'Illustrator'], is_featured: 0, order_idx: 6 },

  // === DESIGN — Wahyu Redjo / WR ===
  { slug: 'wr-corporate-branding', title: 'Corporate Branding', client: 'CV. Wahyu Golden Indonesia', category: 'design', subcategory: 'branding', year: 2025, description: 'Full corporate branding package including logo system, stationery, and brand guide.', tools: ['Illustrator', 'Photoshop', 'Figma'], is_featured: 1, order_idx: 7 },
  { slug: 'wr-product-photography', title: 'Product Photography', client: 'CV. Wahyu Golden Indonesia', category: 'design', subcategory: 'photography', year: 2025, description: 'Product photography and post-processing for catalog and e-commerce use.', tools: ['Lightroom', 'Photoshop'], is_featured: 0, order_idx: 8 },
  { slug: 'wr-socmed-template', title: 'Social Media Templates', client: 'CV. Wahyu Golden Indonesia', category: 'design', subcategory: 'social media', year: 2025, description: 'Reusable social media templates for consistent brand communication.', tools: ['Canva', 'Photoshop'], is_featured: 0, order_idx: 9 },

  // === DESIGN — Personal ===
  { slug: 'personal-creative-exploration', title: 'Creative Exploration', client: null, category: 'design', subcategory: 'personal', year: 2024, description: 'Personal creative explorations in generative art and AI-assisted design.', tools: ['Midjourney', 'Photoshop', 'Illustrator'], is_featured: 0, order_idx: 10 },

  // === VIDEO — Waffleboss ===
  { slug: 'waffleboss-video-promo', title: 'Promo Video', client: 'Waffleboss Surabaya', category: 'video', subcategory: 'promo', year: 2023, description: 'Short promotional video for new menu launches and seasonal offers.', tools: ['Premiere Pro', 'After Effects'], is_featured: 0, order_idx: 11 },
  { slug: 'waffleboss-reels-content', title: 'Instagram Reels', client: 'Waffleboss Surabaya', category: 'video', subcategory: 'social', year: 2023, description: 'Series of short-form vertical videos for Instagram Reels.', tools: ['CapCut', 'Premiere Pro'], is_featured: 0, order_idx: 12 },
  { slug: 'waffleboss-testimonial-video', title: 'Testimonial Video', client: 'Waffleboss Surabaya', category: 'video', subcategory: 'corporate', year: 2023, description: 'Customer testimonial compilation video for social media and website.', tools: ['Premiere Pro'], is_featured: 0, order_idx: 13 },
  { slug: 'waffleboss-product-video', title: 'Product Showcase', client: 'Waffleboss Surabaya', category: 'video', subcategory: 'product', year: 2023, description: 'Cinematic product showcase video highlighting signature waffles.', tools: ['Premiere Pro', 'After Effects', 'Lightroom'], is_featured: 0, order_idx: 14 },
  { slug: 'waffleboss-event-coverage', title: 'Event Coverage', client: 'Waffleboss Surabaya', category: 'video', subcategory: 'event', year: 2023, description: 'Event documentation and highlight reel for store opening event.', tools: ['Premiere Pro', 'Lightroom'], is_featured: 0, order_idx: 15 },

  // === VIDEO — Whittaker ===
  { slug: 'whittaker-brand-video', title: 'Brand Film', client: 'Whittaker ID', category: 'video', subcategory: 'brand', year: 2024, description: 'Brand story film for company profile and digital campaigns.', tools: ['Premiere Pro', 'After Effects'], is_featured: 1, order_idx: 16 },
  { slug: 'whittaker-product-reels', title: 'Product Reels', client: 'Whittaker ID', category: 'video', subcategory: 'social', year: 2024, description: 'Short product showcase reels for Instagram and TikTok.', tools: ['CapCut', 'Premiere Pro'], is_featured: 0, order_idx: 17 },
  { slug: 'whittaker-event-video', title: 'Event Highlight', client: 'Whittaker ID', category: 'video', subcategory: 'event', year: 2024, description: 'Event highlight reel for annual company gathering.', tools: ['Premiere Pro', 'Lightroom'], is_featured: 0, order_idx: 18 },
  { slug: 'whittaker-tutorial-series', title: 'Tutorial Series', client: 'Whittaker ID', category: 'video', subcategory: 'educational', year: 2024, description: 'Series of educational tutorial videos for social media channels.', tools: ['Premiere Pro', 'After Effects', 'CapCut'], is_featured: 0, order_idx: 19 },
  { slug: 'whittaker-campaign-video', title: 'Campaign Video', client: 'Whittaker ID', category: 'video', subcategory: 'campaign', year: 2024, description: 'Full campaign video for seasonal marketing push.', tools: ['Premiere Pro', 'After Effects'], is_featured: 0, order_idx: 20 },

  // === VIDEO — Wahyu Redjo / WR ===
  { slug: 'wr-company-profile', title: 'Company Profile', client: 'CV. Wahyu Golden Indonesia', category: 'video', subcategory: 'corporate', year: 2025, description: 'Full company profile video for corporate presentation and website.', tools: ['Premiere Pro', 'After Effects'], is_featured: 1, order_idx: 21 },
  { slug: 'wr-product-video', title: 'Product Video', client: 'CV. Wahyu Golden Indonesia', category: 'video', subcategory: 'product', year: 2025, description: 'Product showcase video for distribution and retail channels.', tools: ['Premiere Pro', 'Lightroom'], is_featured: 0, order_idx: 22 },
  { slug: 'wr-event-documentation', title: 'Event Documentation', client: 'CV. Wahyu Golden Indonesia', category: 'video', subcategory: 'event', year: 2025, description: 'Documentation video for company events and team activities.', tools: ['Premiere Pro'], is_featured: 0, order_idx: 23 },
  { slug: 'wr-reels-series', title: 'Reels Series', client: 'CV. Wahyu Golden Indonesia', category: 'video', subcategory: 'social', year: 2025, description: 'Monthly short-form video series for Instagram Reels.', tools: ['CapCut', 'Premiere Pro'], is_featured: 0, order_idx: 24 },
  { slug: 'wr-testimonial', title: 'Testimonial Video', client: 'CV. Wahyu Golden Indonesia', category: 'video', subcategory: 'corporate', year: 2025, description: 'Client testimonial and endorsement video compilation.', tools: ['Premiere Pro', 'After Effects'], is_featured: 0, order_idx: 25 },

  // === VIDEO — Personal ===
  { slug: 'personal-short-film', title: 'Personal Short Film', client: null, category: 'video', subcategory: 'personal', year: 2024, description: 'Personal creative short film project exploring urban Surabaya through motion.', tools: ['Premiere Pro', 'After Effects', 'Lightroom'], is_featured: 0, order_idx: 26 },
  { slug: 'personal-timelapse', title: 'City Timelapse', client: null, category: 'video', subcategory: 'personal', year: 2023, description: 'Timelapse collection of Surabaya city landmarks and daily life.', tools: ['Premiere Pro', 'Lightroom'], is_featured: 0, order_idx: 27 },
  { slug: 'personal-ai-motion', title: 'AI Motion Experiment', client: null, category: 'video', subcategory: 'personal', year: 2024, description: 'Experimental video combining AI-generated visuals with motion design.', tools: ['After Effects', 'Midjourney', 'CapCut'], is_featured: 0, order_idx: 28 },
  { slug: 'personal-reel-highlight', title: 'Reel Highlight 2024', client: null, category: 'video', subcategory: 'personal', year: 2024, description: 'Personal reel compilation showcasing best works of 2024.', tools: ['Premiere Pro', 'After Effects'], is_featured: 0, order_idx: 29 },
  { slug: 'personal-music-video', title: 'Music Video', client: null, category: 'video', subcategory: 'personal', year: 2023, description: 'Indie music video project for a local Surabaya artist.', tools: ['Premiere Pro', 'After Effects', 'Lightroom'], is_featured: 0, order_idx: 30 },

  // === APP — WR ===
  { slug: 'wr-inventory-app', title: 'Inventory Management App', client: 'CV. Wahyu Golden Indonesia', category: 'app', subcategory: 'internal tool', year: 2025, description: 'Internal inventory and stock management application for warehouse operations.', tools: ['Figma', 'React', 'Node.js'], is_featured: 1, order_idx: 31 },
  { slug: 'wr-sales-app', title: 'Sales Tracking App', client: 'CV. Wahyu Golden Indonesia', category: 'app', subcategory: 'internal tool', year: 2025, description: 'Sales tracking and reporting dashboard for field sales team.', tools: ['Figma', 'React Native', 'Firebase'], is_featured: 0, order_idx: 32 },
  { slug: 'wr-hr-app', title: 'HR Portal App', client: 'CV. Wahyu Golden Indonesia', category: 'app', subcategory: 'internal tool', year: 2025, description: 'HR management portal for employee attendance, leave requests, and payroll summary.', tools: ['Figma', 'Next.js', 'PostgreSQL'], is_featured: 0, order_idx: 33 },
]

async function seed() {
  console.log('Seeding projects...')

  for (const p of projects) {
    // Check if slug already exists
    const check = await db.execute({
      sql: 'SELECT id FROM projects WHERE slug = ?',
      args: [p.slug],
    })

    if (check.rows.length > 0) {
      console.log(`  SKIP  ${p.slug} (already exists)`)
      continue
    }

    await db.execute({
      sql: `INSERT INTO projects
        (slug, title, client, category, subcategory, sector, year,
         description, tools, thumbnail, media, order_idx, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.slug,
        p.title,
        p.client ?? null,
        p.category,
        p.subcategory ?? null,
        null,
        p.year ?? null,
        p.description ?? null,
        JSON.stringify(p.tools ?? []),
        null,   // no thumbnail yet
        '[]',   // no media yet
        p.order_idx ?? 0,
        p.is_featured ? 1 : 0,
      ],
    })

    console.log(`  OK    ${p.slug}`)
  }

  const count = await db.execute({ sql: 'SELECT COUNT(*) as n FROM projects', args: [] })
  console.log(`\nDone. Total projects in DB: ${count.rows[0].n}`)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
