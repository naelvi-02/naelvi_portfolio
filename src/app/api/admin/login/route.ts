import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { signToken, getCookieName, getCookieMaxAge } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      )
    }

    // Fetch admin user
    const result = await db.execute({
      sql: 'SELECT * FROM admin_users WHERE username = ?',
      args: [username],
    })

    if (result.rows.length === 0) {
      // Constant-time comparison to prevent timing attacks
      await bcrypt.compare(password, '$2b$12$invalidhashtopreventtimingattac')
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const user = result.rows[0]
    const isValid = await bcrypt.compare(password, user.password_hash as string)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Sign JWT
    const token = await signToken({
      sub: String(user.id),
      username: user.username as string,
    })

    const response = NextResponse.json({ success: true })

    response.cookies.set(getCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: getCookieMaxAge(),
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
