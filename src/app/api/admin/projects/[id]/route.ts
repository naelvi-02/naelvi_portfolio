import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getProjectById, updateProject, deleteProject } from '@/lib/projects'

type RouteParams = { params: Promise<{ id: string }> }

// PUT /api/admin/projects/[id] — update project
export async function PUT(request: NextRequest, { params }: RouteParams) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const numId = parseInt(id, 10)

  if (isNaN(numId)) {
    return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const project = await updateProject({ ...body, id: numId })
    return NextResponse.json({ project })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE /api/admin/projects/[id] — delete project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const numId = parseInt(id, 10)

  if (isNaN(numId)) {
    return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
  }

  const existing = await getProjectById(numId)
  if (!existing) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  await deleteProject(numId)
  return NextResponse.json({ success: true })
}

// GET /api/admin/projects/[id] — get single project
export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const numId = parseInt(id, 10)

  if (isNaN(numId)) {
    return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
  }

  const project = await getProjectById(numId)

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  return NextResponse.json({ project })
}
