import { db } from './db'
import type { Project, ProjectRow, CreateProjectInput, UpdateProjectInput, MediaItem } from '@/types'

/**
 * Parse a DB row (raw strings) into a typed Project object
 */
function parseProjectRow(row: Record<string, unknown>): Project {
  return {
    id: row.id as number,
    slug: row.slug as string,
    title: row.title as string,
    client: row.client as string | undefined,
    category: row.category as Project['category'],
    subcategory: row.subcategory as string | undefined,
    sector: row.sector as string | undefined,
    year: row.year as number | undefined,
    description: row.description as string | undefined,
    tools: JSON.parse((row.tools as string) || '[]') as string[],
    thumbnail: row.thumbnail as string | undefined,
    media: JSON.parse((row.media as string) || '[]') as MediaItem[],
    order_idx: row.order_idx as number,
    is_featured: Boolean(row.is_featured),
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  }
}

/**
 * Get all projects, optionally filtered by category
 */
export async function getProjects(category?: string): Promise<Project[]> {
  const sql = category && category !== 'all'
    ? 'SELECT * FROM projects WHERE category = ? ORDER BY order_idx ASC, created_at DESC'
    : 'SELECT * FROM projects ORDER BY order_idx ASC, created_at DESC'

  const args = category && category !== 'all' ? [category] : []

  const result = await db.execute({ sql, args })
  return result.rows.map(parseProjectRow)
}

/**
 * Get featured projects for home page
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const result = await db.execute({
    sql: 'SELECT * FROM projects WHERE is_featured = 1 ORDER BY order_idx ASC LIMIT 6',
    args: [],
  })
  return result.rows.map(parseProjectRow)
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const result = await db.execute({
    sql: 'SELECT * FROM projects WHERE slug = ?',
    args: [slug],
  })

  if (result.rows.length === 0) return null
  return parseProjectRow(result.rows[0])
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: number): Promise<Project | null> {
  const result = await db.execute({
    sql: 'SELECT * FROM projects WHERE id = ?',
    args: [id],
  })

  if (result.rows.length === 0) return null
  return parseProjectRow(result.rows[0])
}

/**
 * Get adjacent projects (prev/next) by order_idx within same category
 */
export async function getAdjacentProjects(
  currentOrderIdx: number,
  category: string
): Promise<{ prev: Project | null; next: Project | null }> {
  const [prevResult, nextResult] = await Promise.all([
    db.execute({
      sql: 'SELECT * FROM projects WHERE category = ? AND order_idx < ? ORDER BY order_idx DESC LIMIT 1',
      args: [category, currentOrderIdx],
    }),
    db.execute({
      sql: 'SELECT * FROM projects WHERE category = ? AND order_idx > ? ORDER BY order_idx ASC LIMIT 1',
      args: [category, currentOrderIdx],
    }),
  ])

  return {
    prev: prevResult.rows.length > 0 ? parseProjectRow(prevResult.rows[0]) : null,
    next: nextResult.rows.length > 0 ? parseProjectRow(nextResult.rows[0]) : null,
  }
}

/**
 * Create a new project
 */
export async function createProject(input: CreateProjectInput): Promise<Project> {
  const result = await db.execute({
    sql: `INSERT INTO projects
      (slug, title, client, category, subcategory, sector, year,
       description, tools, thumbnail, media, order_idx, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      input.slug,
      input.title,
      input.client ?? null,
      input.category,
      input.subcategory ?? null,
      input.sector ?? null,
      input.year ?? null,
      input.description ?? null,
      JSON.stringify(input.tools ?? []),
      input.thumbnail ?? null,
      JSON.stringify(input.media ?? []),
      input.order_idx ?? 0,
      input.is_featured ? 1 : 0,
    ],
  })

  const id = Number(result.lastInsertRowid)
  return (await getProjectById(id))!
}

/**
 * Update a project by ID
 */
export async function updateProject(input: UpdateProjectInput): Promise<Project> {
  const existing = await getProjectById(input.id)
  if (!existing) throw new Error(`Project ${input.id} not found`)

  await db.execute({
    sql: `UPDATE projects SET
      slug = ?, title = ?, client = ?, category = ?, subcategory = ?,
      sector = ?, year = ?, description = ?, tools = ?, thumbnail = ?,
      media = ?, order_idx = ?, is_featured = ?
      WHERE id = ?`,
    args: [
      input.slug ?? existing.slug,
      input.title ?? existing.title,
      input.client ?? existing.client ?? null,
      input.category ?? existing.category,
      input.subcategory ?? existing.subcategory ?? null,
      input.sector ?? existing.sector ?? null,
      input.year ?? existing.year ?? null,
      input.description ?? existing.description ?? null,
      JSON.stringify(input.tools ?? existing.tools),
      input.thumbnail ?? existing.thumbnail ?? null,
      JSON.stringify(input.media ?? existing.media),
      input.order_idx ?? existing.order_idx,
      (input.is_featured ?? existing.is_featured) ? 1 : 0,
      input.id,
    ],
  })

  return (await getProjectById(input.id))!
}

/**
 * Delete a project by ID
 */
export async function deleteProject(id: number): Promise<void> {
  await db.execute({
    sql: 'DELETE FROM projects WHERE id = ?',
    args: [id],
  })
}

/**
 * Get all slugs for generateStaticParams
 */
export async function getAllSlugs(): Promise<string[]> {
  const result = await db.execute({
    sql: 'SELECT slug FROM projects',
    args: [],
  })
  return result.rows.map(row => row.slug as string)
}

/**
 * Get project stats for admin dashboard
 */
export async function getProjectStats(): Promise<{
  total: number
  design: number
  video: number
  app: number
  featured: number
}> {
  const result = await db.execute({
    sql: `SELECT
      COUNT(*) as total,
      SUM(CASE WHEN category = 'design' THEN 1 ELSE 0 END) as design,
      SUM(CASE WHEN category = 'video' THEN 1 ELSE 0 END) as video,
      SUM(CASE WHEN category = 'app' THEN 1 ELSE 0 END) as app,
      SUM(CASE WHEN is_featured = 1 THEN 1 ELSE 0 END) as featured
      FROM projects`,
    args: [],
  })

  const row = result.rows[0]
  return {
    total: Number(row.total ?? 0),
    design: Number(row.design ?? 0),
    video: Number(row.video ?? 0),
    app: Number(row.app ?? 0),
    featured: Number(row.featured ?? 0),
  }
}
