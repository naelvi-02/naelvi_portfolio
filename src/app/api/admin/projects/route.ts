import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import {
  getProjects,
  createProject,
} from '@/lib/projects'
import { slugify } from '@/lib/utils'

// GET /api/admin/projects — list all projects (admin, no public filter)
export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') ?? undefined

  const projects = await getProjects(category)
  return NextResponse.json({ projects })
}

// POST /api/admin/projects — create project
export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()

    if (!body.title || !body.category) {
      return NextResponse.json(
        { error: 'title and category are required' },
        { status: 400 }
      )
    }

    const slug = body.slug || slugify(body.title)

    const project = await createProject({
      ...body,
      slug,
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    if (message.includes('UNIQUE constraint failed')) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
