// scripts/init-db.js
// Run: node scripts/init-db.js
// Creates all required database tables and triggers

const path = require('path')
const fs = require('fs')

// Resolve DB path from env or default
const dbPath = process.env.DATABASE_PATH ?? './data/naelvi.db'
const absoluteDbPath = path.resolve(process.cwd(), dbPath)

// Ensure data directory exists
const dataDir = path.dirname(absoluteDbPath)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
  console.log(`Created directory: ${dataDir}`)
}

// Dynamic import for ESM compatibility
async function main() {
  const { createClient } = await import('@libsql/client')

  const db = createClient({ url: `file:${absoluteDbPath}` })

  console.log(`Initializing database at: ${absoluteDbPath}`)

  await db.batch([
    // Projects table
    {
      sql: `CREATE TABLE IF NOT EXISTS projects (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        slug        TEXT    NOT NULL UNIQUE,
        title       TEXT    NOT NULL,
        client      TEXT,
        category    TEXT    NOT NULL CHECK(category IN ('design','video','app')),
        subcategory TEXT,
        sector      TEXT,
        year        INTEGER,
        description TEXT,
        tools       TEXT    DEFAULT '[]',
        thumbnail   TEXT,
        media       TEXT    DEFAULT '[]',
        order_idx   INTEGER DEFAULT 0,
        is_featured INTEGER DEFAULT 0,
        created_at  TEXT    DEFAULT (datetime('now')),
        updated_at  TEXT    DEFAULT (datetime('now'))
      )`,
      args: [],
    },

    // Admin users table
    {
      sql: `CREATE TABLE IF NOT EXISTS admin_users (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        username      TEXT    NOT NULL UNIQUE,
        password_hash TEXT    NOT NULL,
        created_at    TEXT    DEFAULT (datetime('now'))
      )`,
      args: [],
    },

    // Trigger: auto-update updated_at on projects update
    {
      sql: `CREATE TRIGGER IF NOT EXISTS update_projects_timestamp
        AFTER UPDATE ON projects
        BEGIN
          UPDATE projects SET updated_at = datetime('now') WHERE id = NEW.id;
        END`,
      args: [],
    },
  ], 'write')

  console.log('✓ Tables created: projects, admin_users')
  console.log('✓ Trigger created: update_projects_timestamp')
  console.log('\nDatabase initialized successfully!')
  console.log('Next step: node scripts/create-admin.js')

  await db.close()
}

main().catch(err => {
  console.error('Database initialization failed:', err)
  process.exit(1)
})
