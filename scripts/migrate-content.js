const { createClient } = require('@libsql/client')
const path = require('path')

const db = createClient({ url: 'file:' + path.resolve(process.cwd(), 'data/naelvi.db') })

async function run() {
  await db.execute(`CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  const defaults = [
    ['about_bio', 'Graphic Designer & AI Specialist berdedikasi dengan 2+ tahun pengalaman dalam mengkolaborasikan perancangan identitas visual dengan otomatisasi Artificial Intelligence. Memiliki keahlian teknis menggunakan Adobe Illustrator, Photoshop, dan Figma, yang dioptimalkan dengan pemanfaatan AI generatif (Gemini, ChatGPT) serta tools visual mutakhir (Google Flow, Higgsfield) untuk mempercepat produksi fotografi, video, dan aset media sosial. Berpengalaman dalam vibe coding untuk pengembangan aplikasi produksi serta konfigurasi AI agents guna menciptakan solusi operasional dan visual yang efisien, inovatif, dan berorientasi pada target audiens di industri F&B, retail, maupun e-commerce.'],
    ['about_tagline', 'Graphic Designer & AI Specialist'],
    ['about_location', 'Surabaya, Indonesia'],
    ['contact_email', 'hallo.naufal@naelvi.com'],
    ['contact_whatsapp', '+62 852-3695-0672'],
    ['contact_instagram', '@nopalnaelvi'],
    ['contact_linkedin', 'linkedin.com/in/naelvi'],
    ['contact_availability', 'Available for freelance & full-time'],
  ]

  for (const [key, value] of defaults) {
    await db.execute({
      sql: 'INSERT OR IGNORE INTO site_content (key, value) VALUES (?, ?)',
      args: [key, value],
    })
    console.log('  OK', key)
  }

  console.log('site_content table + defaults created')
}

run().catch(e => { console.error(e); process.exit(1) })
