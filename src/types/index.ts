export interface MediaItem {
  type: 'image' | 'video' | 'youtube'
  url: string
  caption?: string
}

export interface Project {
  id: number
  slug: string
  title: string
  client?: string
  category: 'design' | 'video' | 'app'
  subcategory?: string
  sector?: string
  year?: number
  description?: string
  tools: string[]       // parsed from JSON
  thumbnail?: string
  media: MediaItem[]    // parsed from JSON
  order_idx: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface ProjectRow {
  id: number
  slug: string
  title: string
  client: string | null
  category: string
  subcategory: string | null
  sector: string | null
  year: number | null
  description: string | null
  tools: string          // JSON string
  thumbnail: string | null
  media: string          // JSON string
  order_idx: number
  is_featured: number    // SQLite stores boolean as 0/1
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: number
  username: string
  password_hash: string
  created_at: string
}

export type ProjectCategory = 'design' | 'video' | 'app' | 'all'

export interface CreateProjectInput {
  slug: string
  title: string
  client?: string
  category: 'design' | 'video' | 'app'
  subcategory?: string
  sector?: string
  year?: number
  description?: string
  tools?: string[]
  thumbnail?: string
  media?: MediaItem[]
  order_idx?: number
  is_featured?: boolean
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: number
}
