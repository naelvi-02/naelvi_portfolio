const { createClient } = require('@libsql/client');
const path = require('path');
const db = createClient({ url: 'file:' + path.resolve(process.cwd(), 'data/naelvi.db') });

async function run() {
  await db.execute(`
    INSERT INTO projects (slug, title, category, year, client, description, thumbnail, tools)
    VALUES 
    ('marketplace-automator', 'Marketplace Asset Automator', 'app', 2026, 'Internal (Naelvi WR)', 'Aplikasi web internal untuk mengotomatisasi pengeditan massal foto produk ke dalam berbagai template khusus marketplace. Menggantikan alur kerja manual di Photoshop. Menggunakan parameter AI untuk editing dan enhancement, memungkinkan tim memproses hingga 200 foto produk sehari secara efektif dan efisien.', '/projects/automator.svg', '["Next.js","React","AI"]'),
    
    ('barcode-renamer', 'Smart Barcode Renamer', 'app', 2026, 'Internal (Naelvi WR)', 'Utilitas rename file massal berbasis database untuk aset foto perhiasan. User mengunggah foto, melakukan scan barcode perhiasan fisik, dan aplikasi secara otomatis menarik data dari database untuk menghasilkan format rename yang tepat. Secara drastis mengeliminasi ketik manual untuk pencarian data dan penamaan 100+ foto per hari.', '/projects/renamer.svg', '["Vite","React","Database"]'),
    
    ('lumina-studio', 'Lumina Studio AI', 'app', 2026, 'Internal (Naelvi WR)', 'Aplikasi AI yang mentransformasi foto perhiasan kasual/biasa menjadi foto berkualitas studio high-end. Dirancang secara spesifik untuk material perhiasan agar siap dan layak tayang di media sosial.', '/projects/lumina.svg', '["AI","Gemini","Image Processing"]')
  `);
  console.log('Inserted');
}
run();
