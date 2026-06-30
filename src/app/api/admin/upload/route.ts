import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import path from 'path'
import fs from 'fs'

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? './public/uploads'
const MAX_IMAGE_SIZE = 10 * 1024 * 1024   // 10MB
const MAX_VIDEO_SIZE = 500 * 1024 * 1024  // 500MB

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const category = (formData.get('category') as string) ?? 'misc'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const mimeType = file.type
    const ext = ALLOWED_TYPES[mimeType]

    if (!ext) {
      return NextResponse.json(
        { error: `File type not allowed: ${mimeType}` },
        { status: 415 }
      )
    }

    const isVideo = mimeType.startsWith('video/')
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE

    if (file.size > maxSize) {
      const limitMB = maxSize / (1024 * 1024)
      return NextResponse.json(
        { error: `File too large. Max ${limitMB}MB` },
        { status: 413 }
      )
    }

    // Build target path
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filename = `${timestamp}-${safeName}`
    const subDir = path.join(UPLOAD_DIR, category)
    const absoluteDir = path.resolve(process.cwd(), subDir)
    const absolutePath = path.join(absoluteDir, filename)

    // Ensure directory exists
    if (!fs.existsSync(absoluteDir)) {
      fs.mkdirSync(absoluteDir, { recursive: true })
    }

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(absolutePath, buffer)

    // Return public path (relative to /public)
    const publicPath = `/uploads/${category}/${filename}`

    return NextResponse.json({ url: publicPath, filename, size: file.size })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { url } = await request.json()

    if (!url || !url.startsWith('/uploads/')) {
      return NextResponse.json({ error: 'Invalid file URL' }, { status: 400 })
    }

    // Security: only allow deletion inside /public/uploads/
    const relativePath = url.replace('/uploads/', '')
    const absolutePath = path.resolve(process.cwd(), 'public', 'uploads', relativePath)
    const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads')

    if (!absolutePath.startsWith(uploadsRoot)) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath)
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Delete failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
