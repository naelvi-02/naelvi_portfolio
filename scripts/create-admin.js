// scripts/create-admin.js
// Run: node scripts/create-admin.js
// Creates or updates the admin user with a bcrypt-hashed password

const readline = require('readline')
const path = require('path')

const dbPath = process.env.DATABASE_PATH ?? './data/naelvi.db'
const absoluteDbPath = path.resolve(process.cwd(), dbPath)

async function main() {
  const { createClient } = await import('@libsql/client')
  const bcrypt = await import('bcryptjs')

  const db = createClient({ url: `file:${absoluteDbPath}` })

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const question = (q) => new Promise(resolve => rl.question(q, resolve))

  console.log('\n=== Naelvi Admin Setup ===\n')

  const username = await question('Admin username: ')
  const password = await question('Admin password (min 8 chars): ')

  if (!username || username.length < 3) {
    console.error('Username must be at least 3 characters.')
    rl.close()
    process.exit(1)
  }

  if (!password || password.length < 8) {
    console.error('Password must be at least 8 characters.')
    rl.close()
    process.exit(1)
  }

  rl.close()

  console.log('\nHashing password...')
  const hash = await bcrypt.default.hash(password, 12)

  // Upsert: insert or replace existing
  await db.execute({
    sql: `INSERT INTO admin_users (username, password_hash)
          VALUES (?, ?)
          ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash`,
    args: [username, hash],
  })

  console.log(`✓ Admin user "${username}" created/updated successfully!`)
  console.log('\nYou can now log in at /admin/login')

  await db.close()
}

main().catch(err => {
  console.error('Admin creation failed:', err)
  process.exit(1)
})
