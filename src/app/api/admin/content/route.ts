import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { setContentMany } from '@/lib/content'

export async function PUT(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    await setContentMany(data)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Update content error:', error)
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
