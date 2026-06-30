import { createClient, type Client } from '@libsql/client'
import path from 'path'

let client: Client | null = null

export function getDb(): Client {
  if (!client) {
    const dbPath = process.env.DATABASE_PATH ?? './data/naelvi.db'
    const absolutePath = path.resolve(process.cwd(), dbPath)

    client = createClient({
      url: `file:${absolutePath}`,
    })
  }

  return client
}

// Convenience alias
export const db = {
  execute: (...args: Parameters<Client['execute']>) => getDb().execute(...args),
  batch: (...args: Parameters<Client['batch']>) => getDb().batch(...args),
}
