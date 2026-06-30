import { NextRequest, NextResponse } from 'next/server'
import { getProjectBySlug } from '@/lib/projects'

type RouteParams = { params: Promise<{ slug: string }> }

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  return NextResponse.json({ project })
}
