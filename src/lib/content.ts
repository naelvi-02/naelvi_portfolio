import { db } from './db'

export async function getContent(key: string): Promise<string | null> {
  const result = await db.execute({
    sql: 'SELECT value FROM site_content WHERE key = ?',
    args: [key],
  })
  return result.rows.length > 0 ? (result.rows[0].value as string) : null
}

export async function getContentMany(keys: string[]): Promise<Record<string, string>> {
  const placeholders = keys.map(() => '?').join(', ')
  const result = await db.execute({
    sql: `SELECT key, value FROM site_content WHERE key IN (${placeholders})`,
    args: keys,
  })
  const map: Record<string, string> = {}
  result.rows.forEach(row => {
    map[row.key as string] = row.value as string
  })
  return map
}

export async function setContent(key: string, value: string): Promise<void> {
  await db.execute({
    sql: `INSERT INTO site_content (key, value, updated_at)
          VALUES (?, ?, CURRENT_TIMESTAMP)
          ON CONFLICT(key) DO UPDATE SET
            value = excluded.value,
            updated_at = excluded.updated_at`,
    args: [key, value],
  })
}

export async function setContentMany(data: Record<string, string>): Promise<void> {
  for (const [key, value] of Object.entries(data)) {
    await setContent(key, value)
  }
}
