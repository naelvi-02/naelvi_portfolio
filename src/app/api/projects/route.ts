import { NextRequest, NextResponse } from 'next/server'
import { getProjects, getFeaturedProjects } from '@/lib/projects'

// GET /api/projects?cat=design&featured=true
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('cat') ?? undefined
  const featured = searchParams.get('featured') === 'true'

  if (featured) {
    const projects = await getFeaturedProjects()
    return NextResponse.json({ projects })
  }

  const projects = await getProjects(category)
  return NextResponse.json({ projects })
}
