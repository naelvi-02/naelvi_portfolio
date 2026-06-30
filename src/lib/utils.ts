/**
 * Convert a string to a URL-safe slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove special chars
    .replace(/\s+/g, '-')       // spaces to hyphens
    .replace(/-+/g, '-')        // collapse multiple hyphens
    .replace(/^-+|-+$/g, '')    // trim leading/trailing hyphens
}

/**
 * Format year range or single year
 */
export function formatYear(year?: number): string {
  return year ? String(year) : 'N/A'
}

/**
 * Truncate text to maxLength with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '…'
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(str: string): string {
  return str.replace(/\b\w/g, l => l.toUpperCase())
}

/**
 * Format bytes to human-readable size
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * Get category display label
 */
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    design: 'Design',
    video: 'Video',
    app: 'App',
  }
  return labels[category] ?? titleCase(category)
}

/**
 * Generate OG image URL for a project
 */
export function getOgImageUrl(thumbnail?: string): string {
  if (thumbnail) return thumbnail
  return '/assets/og-default.jpg'
}
